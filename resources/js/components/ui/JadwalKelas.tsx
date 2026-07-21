import { motion } from 'motion/react';
import { jadwalKelas } from '../../../../database/dummyData';
import type { Jadwal } from '../../types/JadwalKelas.props';
import SectionHeading from './SectionHeading';
import '../../../css/components/JadwalKelas.css';

const HARI_URUTAN: Jadwal['hari'][] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

export default function JadwalKelas() {
  return (
    <section id="jadwal" className="section">
      <SectionHeading
        eyebrow="Senin — Jumat"
        title="Jadwal Kelas Minggu Ini"
        subtitle="Warna ungu untuk kelas teori, biru untuk praktikum. Klik hari untuk lihat detail ruangan."
      />

      <div className="jadwal-grid">
        {HARI_URUTAN.map((hari, i) => {
          const items = jadwalKelas.filter((j) => j.hari === hari);
          return (
            <motion.div
              key={hari}
              className="jadwal-col"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
            >
              <div className="jadwal-col__day">{hari}</div>
              {items.length === 0 && <div className="jadwal-col__empty">Tidak ada kelas</div>}
              {items.map((item) => (
                <div key={item.id} className={`jadwal-card jadwal-card--${item.tipe}`}>
                  <span className="mono jadwal-card__time">{item.waktu}</span>
                  <div className="jadwal-card__matkul">{item.matkul}</div>
                  <div className="jadwal-card__meta">{item.dosen} &middot; {item.ruang}</div>
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

