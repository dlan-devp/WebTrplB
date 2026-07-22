import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, X, Quote, LogIn, ArrowRight } from 'lucide-react';
import { testimoniKelas as testimoniAwal } from '../../../../database/dummyData';
import type { Testimoni } from '../../types/TestimoniKelas.props';
import SectionHeading from './SectionHeading';
import '../../../css/components/TestimoniKelas.css';
import TestimoniForm from './TestimoniForm';

const TIPE_LABEL: Record<Testimoni['tipe'], string> = {
  pendapat: 'Pendapat',
  saran: 'Saran',
  kritik: 'Kritik',
};

const AUTOPLAY_DELAY = 5000;

export default function TestimoniKelas() {
  const { auth } = usePage<{ auth: { user?: { id?: string | null; name?: string | null } } }>().props;
  const [items, setItems] = useState<Testimoni[]>(testimoniAwal);
  const [showForm, setShowForm] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [authPromptMode, setAuthPromptMode] = useState<'tambah' | 'nav' | null>(null);
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

  const openAuthPrompt = (mode: 'tambah' | 'nav') => {
    setAuthPromptMode(mode);
    setShowAuthPrompt(true);
  };

  const closeAuthPrompt = () => {
    setShowAuthPrompt(false);
    setAuthPromptMode(null);
  };

  const handleAddButtonClick = () => {
    if (auth.user) {
      setShowForm(true);
      return;
    }

    openAuthPrompt('tambah');
  };

  const handleGoToTestimoniPage = (e: MouseEvent<Element>) => {
    if (auth.user) {
      return;
    }

    e.preventDefault();
    openAuthPrompt('nav');
  };

  const handleContinueToAuth = () => {
    closeAuthPrompt();
    router.visit('/public-auth');
  };

  const authPromptMessage = authPromptMode === 'nav'
    ? 'Kamu perlu masuk terlebih dahulu sebelum melihat halaman testimoni.'
    : 'Kamu perlu masuk terlebih dahulu sebelum menambahkan testimoni.';

  return (
    <section id="testimoni" className="section">
      <div className="testimoni-heading-row">
        <SectionHeading
          eyebrow="Suara Anak Kelas"
          title="Testimoni Kelas"
          subtitle="Lorem ipsum dolor sit amet — consectetur adipiscing elit."
        />
        <div>
          <button className="testimoni-add-btn" onClick={handleAddButtonClick} type="button">
            <Plus size={16} /> Tambah Testimoni
          </button>
          <Link href="/testimoni" className="testimoni-page-nav" onClick={handleGoToTestimoniPage}>
            Atau ke halamannya <ArrowRight size={18} />
          </Link>
        </div>
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
            mode="tambah"
            onClose={() => setShowForm(false)}
            onSubmit={handleAddTestimoni}
          />
        )}

        {showAuthPrompt && (
          <motion.div
            className="testimoni-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthPrompt}
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
                <h3 className="display">Login dulu</h3>
                <button
                  className="testimoni-modal__close"
                  onClick={closeAuthPrompt}
                  aria-label="Tutup"
                  type="button"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="testimoni-form">
                <p className="testimoni-card__pesan" style={{ marginBottom: '1rem' }}>
                  {authPromptMessage}
                </p>
                <button
                  className="testimoni-form__submit"
                  type="button"
                  onClick={handleContinueToAuth}
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <LogIn size={16} style={{ marginRight: '0.5rem' }} />
                  Masuk / Daftar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}