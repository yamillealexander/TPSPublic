import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import About from '../components/About';
import LearnTopics from '../components/LearnTopics';
import NetMetering from '../components/NetMetering';
import Educators from '../components/Educators';
import HowItWorks from '../components/HowItWorks';
import Videos from '../components/Videos';
import BlogPreview from '../components/BlogPreview';
import ConsultationForm from '../components/ConsultationForm';
import AltContact from '../components/AltContact';
import FAQ from '../components/FAQ';

export default function HomePage() {
  const location = useLocation();

  // Scroll to hash when navigating to home with #section
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        // small delay so layout settles
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <TrustStrip />
      <About />
      <LearnTopics />
      <NetMetering />
      <Educators />
      <HowItWorks />
      <Videos />
      <BlogPreview />
      <ConsultationForm />
      <AltContact />
      <FAQ />
    </>
  );
}
