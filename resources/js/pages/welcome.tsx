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
import { useEffect } from 'react';

interface WelcomeProps {
  mahasiswa: Mahasiswa[];
}

export default function Welcome({ mahasiswa }: WelcomeProps) {
  useEffect(() => {
    let current = window.scrollY;
    let target = current;
    let rafId = 0;
    let isAnimating = false;

    const ease = 0.05;

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(update);
      }
    };

    const update = () => {
      current += (target - current) * ease;

      if (Math.abs(target - current) > 0.3) {
        window.scrollTo({
            top: current,
            behavior: "instant",
        });

        rafId = requestAnimationFrame(update);
      } else {
          current = target;
          window.scrollTo({
              top: current,
              behavior: "instant",
          });

          isAnimating = false;
      }
    };

    const onWheel = (e: WheelEvent) => {
      const targetElement = e.target as HTMLElement;

      if (targetElement.closest("[data-native-scroll]")) {
        return;
      }
      if (!isAnimating) {
        current = window.scrollY;
        target = window.scrollY;
      }

      e.preventDefault();

      const wheelMultiplier = 0.4;
      
      target += e.deltaY * wheelMultiplier;
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      target = Math.max(
          0,
          Math.min(target, maxScroll)
      );

      startAnimation();
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

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

      <main
        className="relative z-10"
      >
        <Navbar />
        <Hero />
        <JadwalKelas />
        <Pengumuman />
        <AnggotaKelas />
        <Galeri />
        <LinkGrup />
        <ForumDiskusi />
        <TestimoniKelas/>
        <Footer />
      </main>
    </>
  );
}