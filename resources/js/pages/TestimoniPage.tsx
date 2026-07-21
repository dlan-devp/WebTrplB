import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from '@inertiajs/react';
import { Search, Plus, Pencil, Trash2, Quote, ArrowLeft, LogOut } from 'lucide-react';

import TestimoniForm from '../components/ui/TestimoniForm';
import AuthModal from '../components/ui/AuthModal';
import Navbar from '../components/ui/Navbar';
import type { Testimoni } from '../types/TestimoniKelas.props';
import '../../css/pages/TestimoniPage.css';

const TIPE_LABEL = { pendapat: 'Pendapat', saran: 'Saran', kritik: 'Kritik' } as const;
const FILTERS: Array<{ value: 'semua' | Testimoni['tipe']; label: string }> = [
  { value: 'semua', label: 'Semua' },
  { value: 'pendapat', label: 'Pendapat' },
  { value: 'saran', label: 'Saran' },
  { value: 'kritik', label: 'Kritik' },
];

export default function TestimoniPage() {
  const [items, setItems] = useState<Testimoni[]>(() => {

    const stored = localStorage.getItem('testimoni');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      } catch (err) {
        console.error('Gagal memuat testimoni dari localStorage:', err);
      }
    }

    return [];
  });

  const [currentUser, setCurrentUser] = useState<{ id: string; nama: string } | null>(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.id === 'string' && typeof parsed.nama === 'string') {
          return parsed;
        }
      } catch (err) {
        console.error('Gagal memuat currentUser dari localStorage:', err);
      }
    }
    return null;
  });


  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'semua' | Testimoni['tipe']>('semua');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimoni | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((t) => {
      const matchFilter = filter === 'semua' || t.tipe === filter;
      const matchSearch =
        !q || t.nama.toLowerCase().includes(q) || t.pesan.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [items, search, filter]);


  return (
    <div className="testimoni-page">
      <Navbar />

      <header className="tpage-header">
        <div className="tpage-header__inner">
          <Link href="/" className="tpage-back">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <div className="tpage-content">
        <div className="tpage-intro">
          <span className="section-heading__eyebrow mono">Suara Anak Kelas</span>
          <h1 className="tpage-title display">Semua Testimoni Kelas</h1>
          <p className="tpage-subtitle">
            Cari, saring berdasarkan kategori, atau tambahkan testimoni kamu sendiri. Testimoni
            hanya bisa diedit atau dihapus oleh akun yang menuliskannya — jadi masuk dulu ya
            kalau mau testimoni kamu bisa dikelola nanti.
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
              const isOwner = !!currentUser && t.authorId === currentUser.id;
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
                    <span className={`testimoni-card__badge testimoni-card__badge--${t.tipe}`}>
                      {TIPE_LABEL[t.tipe]}
                    </span>
                    {isOwner && (
                      <div className="tpage-card__actions">
                        <button title="Edit testimoni">
                          <Pencil size={14} />
                        </button>
                        <button title="Hapus testimoni">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <Quote size={18} className="tpage-card__quote-icon" />
                  <p className="tpage-card__pesan">&ldquo;{t.pesan}&rdquo;</p>
                  <div className="tpage-card__footer">
                    <span className="tpage-card__avatar">{t.nama.charAt(0)}</span>
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
              // Handle form submission for adding new testimoni
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

        {showAuth && (
          <AuthModal />
        )}
      </AnimatePresence>
    </div>
  );
}
