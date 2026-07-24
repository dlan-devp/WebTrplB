import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import SectionHeading from './HomePage-SectionHeading';
import '../../../css/components/AnggotaKelas.css';
import GridGradientBackground from './Background-GridGradient';
import type { Mahasiswa } from '@/types/Mahasiswa-Comp.types';

interface MahasiswaProps {
  mahasiswa: Mahasiswa[];
}

function buildAvatarImage(name: string): string {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  // GAMBAR DUMMY
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="640" viewBox="0 0 360 640">
      <rect width="360" height="640" fill="#11243b" />
      <circle cx="180" cy="240" r="92" fill="#8b5cf6" />
      <rect x="84" y="372" width="192" height="84" fill="#8b5cf6" />
      <text x="50%" y="520" text-anchor="middle" font-size="64" font-family="Arial, sans-serif" font-weight="700" fill="#ffffff">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export default function AnggotaKelas({ mahasiswa }: MahasiswaProps) {
  const [selectedStudent, setSelectedStudent] = useState<Mahasiswa | null>(null);

  useEffect(() => {
    if (!selectedStudent) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlScrollBehavior = document.documentElement.style.scrollBehavior;
    const previousScrollY = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${previousScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    const options = { passive: false } as AddEventListenerOptions;
    window.addEventListener('wheel', preventDefault, options);
    window.addEventListener('touchmove', preventDefault, options);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedStudent(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', preventDefault, options);
      window.removeEventListener('touchmove', preventDefault, options);
      window.removeEventListener('keydown', onKeyDown);

      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.scrollBehavior = previousHtmlScrollBehavior;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;
      window.scrollTo({ top: previousScrollY, behavior: 'auto' });
    };
  }, [selectedStudent]);

  return (
    <section id="anggota" className="section relative">
      <SectionHeading
        eyebrow={`${mahasiswa.length} Orang`}
        title="Anggota Kelas"
        subtitle="Struktur pengurus dan teman-teman satu kelas."
        className="z-10"
      />

      <GridGradientBackground />

      <div className="anggota-grid z-20">
        {mahasiswa.map((student: Mahasiswa, index: number) => (
          <motion.button
            key={student.id}
            type="button"
            className="anggota-card z-20"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedStudent(student)}
          >
            <div className="anggota-card__avatar">
              {student.nama.charAt(0).toUpperCase()}
              {student.online && <span className="anggota-card__status" />}
            </div>
            <div className="anggota-card__nama">{student.nama}</div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            className="anggota-modal__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="anggota-modal-title"
              className="anggota-modal"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="anggota-modal__close"
                onClick={() => setSelectedStudent(null)}
                aria-label="Tutup detail siswa"
              >
                x
              </button>

              <div className="anggota-modal__content">
                <div className='anggota-modal__visual'>
                  <img
                  src={selectedStudent.foto ?? buildAvatarImage(selectedStudent.nama)}
                  alt={selectedStudent.nama}
                  className="anggota-modal__photo"
                  />
                </div>

                <div className="anggota-modal__details">
                  <h1>Detail Mahasiswa</h1>
                  <h2 id="anggota-modal-title" className="anggota-modal__name">
                    {selectedStudent.nama}
                  </h2>
                  <dl className="anggota-modal__list">
                    <div className="anggota-modal__item">
                      <dt>Umur</dt>
                      <dd>{selectedStudent.umur ? `${selectedStudent.umur} tahun` : 'Belum diisi'}</dd>
                    </div>
                    <div className="anggota-modal__item">
                      <dt>Fakultas</dt>
                      <dd>{selectedStudent.fakultas ?? 'Belum diisi'}</dd>
                    </div>
                    <div className="anggota-modal__item">
                      <dt>Jurusan</dt>
                      <dd>{selectedStudent.jurusan ?? 'Belum diisi'}</dd>
                    </div>
                    <div className="anggota-modal__item">
                      <dt>Prodi</dt>
                      <dd>{selectedStudent.prodi ?? 'Belum diisi'}</dd>
                    </div>
                    <div className="anggota-modal__item">
                      <dt>Hobi</dt>
                      <dd>{selectedStudent.hobi ?? 'Belum diisi'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
