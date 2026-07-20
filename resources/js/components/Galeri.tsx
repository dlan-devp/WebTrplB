import { motion } from 'motion/react';
import { fotoGaleri } from '../../../database/dummyData';
import SectionHeading from './SectionHeading';
import './Galeri.css';

export default function Galeri() {
  return (
    <section id="galeri" className="section section--tint">
      <SectionHeading
        eyebrow="Dokumentasi"
        title="Galeri Kegiatan"
        subtitle="Kumpulan momen kelas kita, dari kelas praktikum sampai jalan-jalan."
      />

      <div className="galeri-grid">
        {fotoGaleri.map((foto, i) => (
          <motion.figure
            key={foto.id}
            className="galeri-item"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <figcaption>{foto.caption}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
