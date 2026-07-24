import { motion } from 'motion/react';
import SectionHeading from './HomePage-SectionHeading';
import '../../../css/components/AnggotaKelas.css';
import GridGradientBackground from './Background-GridGradient';
import type { Mahasiswa } from '@/types/Mahasiswa-Comp.types';

interface MahasiswaProps{
  mahasiswa: Mahasiswa[];
}

export default function AnggotaKelas({mahasiswa}: MahasiswaProps) {
  return (
    <section id="anggota" className="section relative">
      <SectionHeading
        eyebrow={`${mahasiswa.length} Orang`}
        title="Anggota Kelas"
        subtitle="Struktur pengurus dan teman-teman satu kelas."
        className="z-10"
      />
      
      <GridGradientBackground />

      <div className="anggota-grid z-20">
        {mahasiswa.map((a: Mahasiswa, i: number) => (
          <motion.div
            key={a.nim}
            className="anggota-card z-20"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
            whileHover={{ y: -4 }}
          >
            <div className="anggota-card__avatar">
              {a.nama.charAt(0).toUpperCase()}
              {a.online && <span className="anggota-card__status" />}
            </div>
            <div className="anggota-card__nama">{a.nama}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
