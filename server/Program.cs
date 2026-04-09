using System.ComponentModel.DataAnnotations;
using System.Net.Http.Json;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Bind Web3Forms options from configuration. Override at runtime via env var:
//   Web3Forms__AccessKey=<your-key>
builder.Services.Configure<Web3FormsOptions>(
    builder.Configuration.GetSection("Web3Forms"));

// Named HttpClient for the Web3Forms downstream call.
builder.Services.AddHttpClient("web3forms", client =>
{
    client.BaseAddress = new Uri("https://api.web3forms.com/");
    client.DefaultRequestHeaders.Accept.Add(
        new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
});

var app = builder.Build();

// ---------------------------------------------------------------------------
// Static files: serve the React SPA out of wwwroot.
// ---------------------------------------------------------------------------
app.UseDefaultFiles();
app.UseStaticFiles();

// ---------------------------------------------------------------------------
// API endpoints
// ---------------------------------------------------------------------------

// Lightweight liveness probe — does not depend on static asset serving.
app.MapGet("/healthz", () => Results.Ok(new { status = "ok" }));

// Contact form. The React form posts here same-origin; the server holds the
// Web3Forms key and forwards the message. If no key is configured we log a
// warning and return a simulated success so the form is testable end-to-end.
app.MapPost("/api/contact", async (
    ContactRequest req,
    IHttpClientFactory httpFactory,
    IOptions<Web3FormsOptions> options,
    ILogger<Program> logger) =>
{
    var errors = req.Validate();
    if (errors.Count > 0)
    {
        return Results.ValidationProblem(errors);
    }

    var key = options.Value.AccessKey;
    if (string.IsNullOrWhiteSpace(key))
    {
        logger.LogWarning(
            "Web3Forms__AccessKey not configured — simulating contact form success.");
        return Results.Ok(new { ok = true, simulated = true });
    }

    var payload = new
    {
        access_key = key,
        subject = $"Nueva consulta solar — {req.Name}",
        from_name = "Tus Placas Seguras (Sitio Web)",
        nombre = req.Name,
        telefono = req.Phone,
        email = req.Email,
        pueblo = req.Town,
        tipo_consulta = req.Type == "home" ? "Visita a mi hogar" : "Por teléfono",
        mejor_horario = string.IsNullOrWhiteSpace(req.Time) ? "" : req.Time,
        mensaje = string.IsNullOrWhiteSpace(req.Message) ? "(sin mensaje)" : req.Message,
    };

    var http = httpFactory.CreateClient("web3forms");
    using var resp = await http.PostAsJsonAsync("submit", payload);

    if (!resp.IsSuccessStatusCode)
    {
        logger.LogError(
            "Web3Forms HTTP error: {Status}", (int)resp.StatusCode);
        return Results.Problem(
            "No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.",
            statusCode: StatusCodes.Status502BadGateway);
    }

    var body = await resp.Content.ReadFromJsonAsync<Web3FormsResponse>();
    if (body is null || !body.Success)
    {
        logger.LogError(
            "Web3Forms returned failure: {Message}", body?.Message);
        return Results.Problem(
            "No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.",
            statusCode: StatusCodes.Status502BadGateway);
    }

    return Results.Ok(new { ok = true });
});

// ---------------------------------------------------------------------------
// SPA fallback — anything that didn't match a static file or API route gets
// index.html so React Router can take over client-side routing.
// ---------------------------------------------------------------------------
app.MapFallbackToFile("index.html");

app.Run();


// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

public sealed class ContactRequest
{
    public string Name { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Email { get; set; } = "";
    public string Town { get; set; } = "";
    public string Type { get; set; } = "phone";
    public string? Time { get; set; }
    public string? Message { get; set; }

    public Dictionary<string, string[]> Validate()
    {
        var errors = new Dictionary<string, string[]>();

        if (string.IsNullOrWhiteSpace(Name))  errors["name"]  = ["Requerido"];
        if (string.IsNullOrWhiteSpace(Phone)) errors["phone"] = ["Requerido"];

        if (string.IsNullOrWhiteSpace(Email))
        {
            errors["email"] = ["Requerido"];
        }
        else if (!new EmailAddressAttribute().IsValid(Email))
        {
            errors["email"] = ["Email inválido"];
        }

        if (string.IsNullOrWhiteSpace(Town)) errors["town"] = ["Requerido"];
        if (Type is not ("phone" or "home")) errors["type"] = ["Tipo inválido"];

        return errors;
    }
}

public sealed class Web3FormsOptions
{
    public string? AccessKey { get; set; }
}

internal sealed class Web3FormsResponse
{
    public bool Success { get; set; }
    public string? Message { get; set; }
}
