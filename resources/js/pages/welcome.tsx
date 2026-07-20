import '../../css/app.css';
import { Head } from '@inertiajs/react';
import AnggotaKelas from '@/components/AnggotaKelas';
import Footer from '@/components/Footer';
import ForumDiskusi from '@/components/ForumDiskusi';
import Galeri from '@/components/Galeri';
import Hero from '@/components/Hero';
import JadwalKelas from '@/components/JadwalKelas';
import LinkGrup from '@/components/LinkGrup';
import Navbar from '@/components/Navbar';
import Pengumuman from '@/components/Pengumuman';
import TestimoniKelas from '@/components/TestimoniKelas';

interface Mahasiswa {
    kodeMahasiswa: number;
    nama: string;
    umur: number;
    fakultas: string;
    jurusan: string;
    prodi: string;
    hobi: string;
}

interface Props {
    mahasiswa: Mahasiswa[];
}

export default function Welcome({ mahasiswa }: Props) {
  return (
    <>
      <Head title="Website Trpl-B" />

      {/* testing ambil data db */}
      <div className="flex">
        {mahasiswa.map((mhs) => (
            <div key={mhs.kodeMahasiswa}>
              <h1>{mhs.nama}</h1>
              <p>{mhs.umur}</p>
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
