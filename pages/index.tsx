import Hero from '../components/Hero';
import Navbar from '@/components/Navbar';
import Calendar from '../components/Calendar';
import LogoSlider from '@/components/LogoSlider';
import Programs from '../components/Programs';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main id="top" style={{ paddingTop: '120px' }}>
      <Navbar />
      <Hero />
      <div id="events">
        <Calendar />
      </div>
      <LogoSlider />
      <Programs />
      <Footer />

    </main>
  );
}
