import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, Quote, ArrowRight } from 'lucide-react';
// import { testimoniKelas as testimoniAwal } from '../../../../database/dummyData';
// import type { Testimoni } from '../../types/TestimoniKelas.props';
import SectionHeading from './SectionHeading';
import '../../../css/components/TestimoniKelas.css';
import TestimoniForm from './InputComp-TestimoniForm';
import HomePageAuthPromptModal from './HomePage-AuthPromptModal';
import type { Testimoni } from '@/types/Testimoni-Page.props';

const TIPE_LABEL: Record<Testimoni['type'], string> = {
  Pendapat: 'Pendapat',
  Saran: 'Saran',
  Kritik: 'Kritik',
};

interface NavbarProps{
  testimoni: Testimoni[];
}

const AUTOPLAY_DELAY = 5000;

export default function TestimoniKelas({testimoni}: NavbarProps) {
  const { auth } = usePage<{ auth: { user?: { id?: string | null; name?: string | null } } }>().props;
  const [items, setItems] = useState<Testimoni[]>(testimoni);
  useEffect(() => {
    setItems(testimoni);
  }, [testimoni]);
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
    router.post('/testimoni', baru, {
        onSuccess: () => {
            setShowForm(false);
        },
    });
};

  const openAuthPrompt = (mode: 'tambah' | 'nav') => {
    setAuthPromptMode(mode);
    setShowAuthPrompt(true);
  };

  const closeAuthPrompt = () => {
    setShowAuthPrompt(false);
    setAuthPromptMode(null);
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
    router.visit('/user-auth');
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
            <span className={`testimoni-card__badge testimoni-card__badge--${t.type.toLowerCase()}`}>
              {TIPE_LABEL[t.type]}
            </span>
            <p className="testimoni-card__pesan">&ldquo;{t.deskripsi}&rdquo;</p>
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

        <HomePageAuthPromptModal
          open={showAuthPrompt}
          description={authPromptMessage}
          onClose={closeAuthPrompt}
          onContinue={handleContinueToAuth}
        />
      </AnimatePresence>
      <Link href="/testimoni" className="testimoni-page-nav" onClick={handleGoToTestimoniPage}>
        Buat testimonimu <ArrowRight size={18} />
      </Link>
    </section>
  );
}