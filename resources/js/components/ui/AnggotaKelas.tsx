import { motion } from 'motion/react';
// import { anggotaKelas } from '../../../../database/dummyData';
import SectionHeading from './SectionHeading';
import '../../../css/components/AnggotaKelas.css';
// import type { Mahasiswa } from '../../types/AnggotaKelas.props';
import type { Mahasiswa } from '@/types/AnggotaKelas.props';

interface MahasiswaProps{
  mahasiswa: Mahasiswa[];
}

export default function AnggotaKelas({mahasiswa}: MahasiswaProps) {
  return (
    <section id="anggota" className="section">
      <SectionHeading
        eyebrow={`${mahasiswa.length} Orang`}
        title="Anggota Kelas"
        subtitle="Struktur pengurus dan teman-teman satu kelas."
      />

      <div className="anggota-grid">
        {mahasiswa.map((a: Mahasiswa, i: number) => (
          <motion.div
            key={a.id}
            className="anggota-card"
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
