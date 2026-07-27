import { motion } from 'motion/react';
import SectionHeading from './HomePage-SectionHeading';
import '../../../css/components/Galeri.css';
import type { FotoGaleri } from '@/types/Galeri-Comp.types';

interface galeriProps {
  galeri: FotoGaleri[];
}

export default function Galeri({galeri}: galeriProps) {
  return (
    <section id="galeri" className="section section--tint">
      <SectionHeading
        eyebrow="Dokumentasi"
        title="Galeri Kegiatan"
        subtitle="Kumpulan momen kelas kita, dari kelas praktikum sampai jalan-jalan."
      />

      <div className="galeri-grid">
        {galeri.map((foto, i) => (
          <motion.figure
            key={foto.id}
            className="galeri-item"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <img
              src={`/storage/${foto.gambar}`}
              alt={foto.deskripsi}
            />
            <figcaption>{foto.deskripsi}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
