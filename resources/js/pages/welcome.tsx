import '../../css/app.css';

import { Head } from '@inertiajs/react';

import AnggotaKelas from '@/components/ui/HomePage-AnggotaKelas';
import ForumDiskusi from '@/components/ui/HomePage-ForumDiskusi';
import Galeri from '@/components/ui/HomePage-Galeri';
import Hero from '@/components/ui/HomePage-Hero';
import JadwalKelas from '@/components/ui/HomePage-JadwalKelas';
import LinkGrup from '@/components/ui/HomePage-LinkGrup';
import Pengumuman from '@/components/ui/HomePage-Pengumuman';
import TestimoniKelas from '@/components/ui/HomePage-TestimoniKelas';

import useMomentumScroll from '@/animation/MomentumScroll';

import type { Jadwal } from '@/types/JadwalKelas-Comp.types';
import type { Mahasiswa } from '@/types/Mahasiswa-Comp.types';
import type { Pengumumans } from '@/types/Pengumuman-Comp.props';
import type { Testimoni } from '@/types/Testimoni-Page.props';

interface WelcomeProps {
  jadwal: Jadwal[];
  mahasiswa: Mahasiswa[];
  testimoni: Testimoni[];
  pengumuman: Pengumumans[];
}

export default function Welcome({ mahasiswa, testimoni, jadwal, pengumuman }: WelcomeProps) {
  useMomentumScroll();

  return (
    <>
      <Head title="Website TRPL-B" />

      <main className="relative w-full lg:w-350 m-auto">
        <Hero mahasiswa={mahasiswa} />
        <AnggotaKelas mahasiswa={mahasiswa} />
        <JadwalKelas jadwal={jadwal} />
        <Pengumuman  pengumuman={pengumuman} />
        <ForumDiskusi />
        <Galeri />
        <TestimoniKelas testimoni={testimoni} />
        <LinkGrup />
      </main>
    </>
  );
}