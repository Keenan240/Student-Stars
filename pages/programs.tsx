import Programs from '@/components/Programs';
import Navbar from '@/components/Navbar';


export default function ProgramsPage() {
  return (
    <main id="top" style={{ paddingTop: '120px' }}>
      <Navbar />
      <img
      src="/Logo.png"
      alt="Logo"
      style={{ position: 'absolute', top: '49px', left: '38px', height: '28px' }}
    />
      <Programs />
    </main>
  );
}
