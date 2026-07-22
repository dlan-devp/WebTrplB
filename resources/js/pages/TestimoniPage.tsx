import { Search, Plus, Pencil, Trash2, Quote } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
// import AuthModal from '../components/ui/AuthModal';
import { router } from '@inertiajs/react';
import Navbar from '../components/ui/Navbar';
import TestimoniForm from '../components/ui/TestimoniForm';
import '../../css/pages/TestimoniPage.css';
import type { Testimoni } from '@/types/Testimoni.props';
// import { testimoniKelas as testimoniAwal } from '../../../database/dummyData';

const TIPE_LABEL = { Pendapat: 'Pendapat', Saran: 'Saran', Kritik: 'Kritik' } as const;
const FILTERS: Array<{ value: 'semua' | Testimoni['type']; label: string }> = [
  { value: 'semua', label: 'Semua' },
  { value: 'Pendapat', label: 'Pendapat' },
  { value: 'Saran', label: 'Saran' },
  { value: 'Kritik', label: 'Kritik' },
];

interface PageProps {
    testimoni: Testimoni[];
}

export default function TestimoniPage({testimoni}: PageProps) {

  const [search, setSearch] = useState('');
    const [filter, setFilter] =
        useState<'semua' | Testimoni['type']>('semua');

    const [showAddForm, setShowAddForm] = useState(false);
    const [editingItem, setEditingItem] =
        useState<Testimoni | null>(null);

    const filteredItems = useMemo(() => {
        const q = search.trim().toLowerCase();

        return testimoni.filter((t) => {
            const matchFilter =
                filter === 'semua' || t.type === filter;

            const matchSearch =
                !q ||
                t.nama.toLowerCase().includes(q) ||
                t.deskripsi.toLowerCase().includes(q);

            return matchFilter && matchSearch;
        });
    }, [testimoni, search, filter]);


  return (
    <div className="testimoni-page">
      <Navbar />

      <div className="tpage-content">
        <div className="tpage-intro">
          <span className="section-heading__eyebrow mono">Suara Anak Kelas</span>
          <h1 className="tpage-title display">Semua Testimoni Kelas</h1>
          <p className="tpage-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="tpage-toolbar">
          <div className="tpage-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau isi testimoni..."
            />
          </div>

          <div className="tpage-filters">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`tpage-filter-pill ${filter === f.value ? 'is-active' : ''}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button className="testimoni-add-btn" onClick={() => setShowAddForm(true)}>
            <Plus size={16} /> Tambah Testimoni
          </button>
        </div>

        {filteredItems.length === 0 ? (
          <p className="tpage-empty">Tidak ada testimoni yang cocok dengan pencarian/filter kamu.</p>
        ) : (
          <div className="tpage-grid">
            {filteredItems.map((t: Testimoni) => {
              return (
                <motion.article
                  key={t.id}
                  className="tpage-card"
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="tpage-card__top">
                    <span className={`testimoni-card__badge testimoni-card__badge--${t.type.toLowerCase()}`}>
                      {TIPE_LABEL[t.type]}
                    </span>
                    {/* {isOwner && (
                      <div className="tpage-card__actions">
                        <button title="Edit testimoni">
                          <Pencil size={14} />
                        </button>
                        <button title="Hapus testimoni">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )} */}
                  </div>
                  <Quote size={18} className="tpage-card__quote-icon" />
                  <p className="tpage-card__pesan">&ldquo;{t.deskripsi}&rdquo;</p>
                  <div className="tpage-card__footer">
                    <span className="tpage-card__avatar">{t.nama.charAt(0)}</span>
                    <div className="testimoni-card__nama">{t.nama}</div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAddForm && (
          <TestimoniForm
            mode="tambah"
            onClose={() => setShowAddForm(false)}
            onSubmit={(data) => {
              router.post('/testimoniPage', data, {
                onSuccess: () => {
                  setShowAddForm(false);
                },
              });
            }}
          />
        )}

        {editingItem && (
          <TestimoniForm
            mode="edit"
            initialData={editingItem}
            onClose={() => setEditingItem(null)}
            onSubmit={(data) => {
              // Handle form submission for editing
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
