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

import useMomentumScroll from '@/animation/MomentumScroll';

import type { Mahasiswa } from '@/types/AnggotaKelas.props';
import type { Testimoni } from '@/types/Testimoni.props';

interface WelcomeProps {
  mahasiswa: Mahasiswa[];
  testimoni: Testimoni[];
}

export default function Welcome({ mahasiswa, testimoni }: WelcomeProps) {
  useMomentumScroll();

  return (
    <>
      <Head title="Website TRPL-B" />

      <main className="relative z-10">
        <Navbar />
        <Hero mahasiswa={mahasiswa} />
        <JadwalKelas />
        <Pengumuman />
        <AnggotaKelas mahasiswa={mahasiswa} />
        <Galeri />
        <LinkGrup />
        <ForumDiskusi />
        <TestimoniKelas testimoni={testimoni} />
        <Footer />
      </main>
    </>
  );
}