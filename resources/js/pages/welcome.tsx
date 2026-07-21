import '../../css/app.css';
import { Head } from '@inertiajs/react';
import AnggotaKelas from '@/components/ui/AnggotaKelas';
import Footer from '@/components/ui/Footer';
import ForumDiskusi from '@/components/ui/ForumDiskusi';
import Galeri from '@/components/ui/Galeri';
import Hero from '@/components/ui/Hero';
import JadwalKelas from '@/components/ui/JadwalKelas';
import LinkGrup from '@/components/ui/LinkGrup';
import Navbar from '@/components/ui/Navbar';
import Pengumuman from '@/components/ui/Pengumuman';
import TestimoniKelas from '@/components/ui/TestimoniKelas';
import type { Mahasiswa } from '@/types/AnggotaKelas.props';

interface WelcomeProps {
  mahasiswa: Mahasiswa[];
}

export default function Welcome({ mahasiswa }: WelcomeProps) {
  return (
    <>
      <Head title="Website TRPL-B" />

      {/* testing ambil data db */}
      <div className="flex">
        {mahasiswa.map((mhs) => (
            <div key={mhs.kodeMahasiswa}>
              <h1>{mhs.nama}</h1>
              <p>{mhs.umur}</p>
              tess
            </div>
        ))}
      </div>

      <main className="relative z-10">
        <Navbar />
        <Hero />
        <JadwalKelas />
        <Pengumuman />
        <AnggotaKelas />
        <Galeri />
        <LinkGrup />
        <ForumDiskusi />
        <TestimoniKelas />
        <Footer />
      </main>
    </>
  );
}
