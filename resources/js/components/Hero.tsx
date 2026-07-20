import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { anggotaKelas } from '../../../database/dummyData';
import './Hero.css';

/**
 * Signature element of the page: the hero is styled like a physical
 * class ID card. It tilts toward the cursor and catches a light "glare"
 * sweep, so the first thing you see is literally "this is our class's card".
 */
export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 150, damping: 15 });
  const glareX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const onlineCount = anggotaKelas.filter((a) => a.online).length;

  return (
    <section id="top" className="hero">
      <motion.div
        className="hero__copy"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="hero__eyebrow">Ruang kelas kita, versi digital</span>
        <h1 className="hero__title display">
          Anjay,
          <br />
          Adili Jokow.
        </h1>
        <p className="hero__subtitle">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        </p>
        <div className="hero__actions">
          <a href="#jadwal" className="hero__btn hero__btn--primary">Lihat Jadwal</a>
          <a href="#pengumuman" className="hero__btn hero__btn--ghost">Pengumuman Terbaru</a>
        </div>
      </motion.div>

      <motion.div
        ref={cardRef}
        className="hero__card"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
      >
        <motion.div
          className="hero__glare"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]: string[]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`
            ),
          }}
        />
        <div className="hero__card-top">
          <span className="mono hero__card-tag">TRPLB · 2025/2026</span>
          <span className="hero__card-live">
            <span className="hero__card-live-dot" /> {onlineCount} online
          </span>
        </div>
        <div className="hero__card-title display">Kelas TRPLB</div>
        <div className="hero__card-sub">Teknik Rekayasa Perangkat Lunak &middot; Semester 3</div>
        <div className="hero__card-avatars">
          {anggotaKelas.slice(0, 6).map((a) => (
            <span key={a.id} className="hero__avatar" title={a.nama}>
              {a.inisial}
            </span>
          ))}
          <span className="hero__avatar hero__avatar--more">+{anggotaKelas.length - 6}</span>
        </div>
      </motion.div>
    </section>
  );
}
