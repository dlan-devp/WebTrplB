import { motion } from 'motion/react';
import { anggotaKelas } from '../../../database/dummyData';
import SectionHeading from './SectionHeading';
import './AnggotaKelas.css';

export default function AnggotaKelas() {
  return (
    <section id="anggota" className="section">
      <SectionHeading
        eyebrow={`${anggotaKelas.length} Orang`}
        title="Anggota Kelas"
        subtitle="Struktur pengurus dan teman-teman satu kelas."
      />

      <div className="anggota-grid">
        {anggotaKelas.map((a, i) => (
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
              {a.inisial}
              {a.online && <span className="anggota-card__status" />}
            </div>
            <div className="anggota-card__nama">{a.nama}</div>
            <div className="anggota-card__peran">{a.peran}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
