import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, X, Quote } from 'lucide-react';
import { testimoniKelas as testimoniAwal } from '../../../../database/dummyData';
import type { Testimoni } from '../../types/TestimoniKelas.props';
import SectionHeading from './SectionHeading';
import '../../../css/components/TestimoniKelas.css';

const TIPE_LABEL: Record<Testimoni['tipe'], string> = {
  pendapat: 'Pendapat',
  saran: 'Saran',
  kritik: 'Kritik',
};

const AUTOPLAY_DELAY = 5000;

export default function TestimoniKelas() {
  const [items, setItems] = useState<Testimoni[]>(testimoniAwal);
  const [showForm, setShowForm] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  // Autoplay, tiap 5 detik geser dari kiri ke kanan, terus snap balik ke awal
  // berhenti otomatis pas terdeteksi digeser dari user.
  useEffect(() => {
    const interval = setInterval(() => {
      const track = trackRef.current;
      if (!track || isPaused.current) return;

      const card = track.querySelector<HTMLElement>('.testimoni-card');
      if (!card) return;
      const step = card.offsetWidth + 16; // lebar kartu + gap

      const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      track.scrollTo({
        left: isAtEnd ? 0 : track.scrollLeft + step,
        behavior: 'smooth',
      });
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [items.length]);

  const pauseAutoplay = () => { isPaused.current = true; };
  const resumeAutoplay = () => { isPaused.current = false; };

  // Drag-to-scroll pake mouse, biar bisa digeser-geser langsung di dsktop.
  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    pauseAutoplay();
    dragStart.current = { x: e.clientX, scrollLeft: track.scrollLeft };
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !isDragging.current) return;
    const delta = e.clientX - dragStart.current.x;
    track.scrollLeft = dragStart.current.scrollLeft - delta;
  };

  const onPointerUp = () => {
    isDragging.current = false;
    resumeAutoplay();
  };

  const handleAddTestimoni = (baru: Omit<Testimoni, 'id'>) => {
    setItems((prev) => [...prev, { ...baru, id: `ts-${Date.now()}` }]);
    setShowForm(false);
  };

  return (
    <section id="testimoni" className="section">
      <div className="testimoni-heading-row">
        <SectionHeading
          eyebrow="Suara Anak Kelas"
          title="Testimoni Kelas"
          subtitle="Lorem ipsum dolor sit amet — consectetur adipiscing elit."
        />
        <button className="testimoni-add-btn" onClick={() => setShowForm(true)}>
          <Plus size={16} /> Tambah Testimoni
        </button>
      </div>

      <div
        ref={trackRef}
        className="testimoni-track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        data-native-scroll
      >
        {items.map((t) => (
          <article key={t.id} className="testimoni-card">
            <Quote size={20} className="testimoni-card__quote-icon" />
            <span className={`testimoni-card__badge testimoni-card__badge--${t.tipe}`}>
              {TIPE_LABEL[t.tipe]}
            </span>
            <p className="testimoni-card__pesan">&ldquo;{t.pesan}&rdquo;</p>
            <div className="testimoni-card__footer">
              <span className="testimoni-card__avatar">{t.nama.charAt(0)}</span>
              <div className="testimoni-card__nama">{t.nama}</div>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <TestimoniForm
            onClose={() => setShowForm(false)}
            onSubmit={handleAddTestimoni}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function TestimoniForm({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: Omit<Testimoni, 'id'>) => void;
}) {
  const [nama, setNama] = useState('');
  const [tipe, setTipe] = useState<Testimoni['tipe']>('pendapat');
  const [pesan, setPesan] = useState('');

  type NewType = React.FormEvent<HTMLFormElement>;

  const handleSubmit = (e: NewType) => {
    e.preventDefault();
    if (!nama.trim() || !pesan.trim()) return;
    onSubmit({ nama: nama.trim(), tipe, pesan: pesan.trim() });
  };

  return (
    <motion.div
      className="testimoni-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="testimoni-modal"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="testimoni-modal__head">
          <h3 className="display">Tambah Testimoni</h3>
          <button className="testimoni-modal__close" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="testimoni-form">
          <label className="testimoni-form__field">
            <span>Nama</span>
            <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama kamu" required />
          </label>

          <label className="testimoni-form__field">
            <span>Jenis</span>
            <select value={tipe} onChange={(e) => setTipe(e.target.value as Testimoni['tipe'])}>
              <option value="pendapat">Pendapat</option>
              <option value="saran">Saran</option>
              <option value="kritik">Kritik</option>
            </select>
          </label>

          <label className="testimoni-form__field">
            <span>Pesan</span>
            <textarea
              data-native-scroll
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              placeholder="Tulis pendapat, saran, atau kritik kamu untuk kelas..."
              rows={4}
              required
            />
          </label>

          <button type="submit" className="testimoni-form__submit">Kirim Testimoni</button>
        </form>
      </motion.div>
    </motion.div>
  );
}
