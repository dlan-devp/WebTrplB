import { motion } from 'motion/react';
import { Link } from '@inertiajs/react';
import SectionHeading from './HomePage-SectionHeading';
import '../../../css/components/Galeri.css';
import type { FotoGaleri } from '@/types/Galeri-Comp.types';

interface galeriProps {
  galeri: FotoGaleri[];
}

const BATAS_TAMPIL = 5;

export default function Galeri({galeri}: galeriProps) {
  const ditampilkan = galeri.slice(0, BATAS_TAMPIL);

  return (
    <section id="galeri" className="section section--tint">
      <SectionHeading
        eyebrow="Dokumentasi"
        title="Galeri Kegiatan"
        subtitle="Kumpulan momen kelas kita, dari kelas praktikum sampai jalan-jalan."
      />

      <div className="galeri-grid">
        {ditampilkan.map((foto, i) => (
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

        <div className="galeri-lihat-semua">
          <Link href="/galeri">Lihat semua foto →</Link>
        </div>

    </section>
  );
}