import '../../css/app.css';

import { Head } from '@inertiajs/react';

import AnggotaKelas from '@/components/ui/HomePage-AnggotaKelas';
import Footer from '@/components/ui/Footer';
import ForumDiskusi from '@/components/ui/HomePage-ForumDiskusi';
import Galeri from '@/components/ui/HomePage-Galeri';
import Hero from '@/components/ui/HomePage-Hero';
import JadwalKelas from '@/components/ui/HomePage-JadwalKelas';
import LinkGrup from '@/components/ui/HomePage-LinkGrup';
import Navbar from '@/components/ui/Navbar';
import Pengumuman from '@/components/ui/HomePage-Pengumuman';
import TestimoniKelas from '@/components/ui/HomePage-TestimoniKelas';

import useMomentumScroll from '@/animation/MomentumScroll';

import type { Mahasiswa } from '@/types/Mahasiswa-Comp.types';
import type { Testimoni } from '@/types/Testimoni-Page.props';

interface WelcomeProps {
  mahasiswa: Mahasiswa[];
  testimoni: Testimoni[];
}

export default function Welcome({ mahasiswa, testimoni }: WelcomeProps) {
  useMomentumScroll();

  return (
    <>
      <Head title="Website TRPL-B" />

      <main className="relative w-full lg:w-350 m-auto">
        <Navbar />
        <Hero mahasiswa={mahasiswa} />
        <AnggotaKelas mahasiswa={mahasiswa} />
        <JadwalKelas />
        <Pengumuman />
        <ForumDiskusi />
        <Galeri />
        <TestimoniKelas testimoni={testimoni} />
        <LinkGrup />
        <Footer />
      </main>
    </>
  );
}