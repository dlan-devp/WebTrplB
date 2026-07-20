import '../../css/app.css';
import Navbar from '../../js/components/Navbar';
import Hero from '../../js/components/Hero';
import JadwalKelas from '../../js/components/JadwalKelas';
import Pengumuman from '../../js/components/Pengumuman';
import AnggotaKelas from '../../js/components/AnggotaKelas';
import Galeri from '../../js/components/Galeri';
import LinkGrup from '../../js/components/LinkGrup';
import ForumDiskusi from '../../js/components/ForumDiskusi';
import Footer from '../../js/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <JadwalKelas />
        <Pengumuman />
        <AnggotaKelas />
        <Galeri />
        <LinkGrup />
        <ForumDiskusi />
      </main>
      <Footer />
    </>
  );
}
