import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Kategori } from '@/types/Forum-Page.types';

interface CreateThreadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { judul: string; isi: string; kategori: Kategori; tags: string[] }) => void;
}

export default function CreateThreadModal({ open, onClose, onSubmit }: CreateThreadModalProps) {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [kategori, setKategori] = useState<Kategori>('tugas');
  const [tagsInput, setTagsInput] = useState('');

  const resetAndClose = () => {
    setJudul('');
    setIsi('');
    setKategori('tugas');
    setTagsInput('');
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !isi.trim()) return;
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    onSubmit({ judul: judul.trim(), isi: isi.trim(), kategori, tags });
    resetAndClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 pt-16 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Buat Diskusi Baru</h2>
              <button
                onClick={resetAndClose}
                className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                {(['tugas', 'proyek'] as Kategori[]).map((k) => (
                  <button
                    type="button"
                    key={k}
                    onClick={() => setKategori(k)}
                    className={`px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                      kategori === k
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Judul</label>
                <input
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: Cara pakai useEffect buat fetch data?"
                  className="w-full border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                  autoFocus
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Detail</label>
                <textarea
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  rows={4}
                  placeholder="Jelaskan konteks tugas/proyek dan pertanyaan kamu selengkap mungkin..."
                  className="w-full resize-none border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Tags <span className="font-normal text-slate-400">(pisahkan dengan koma)</span>
                </label>
                <input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="react, basis-data, debugging"
                  className="w-full border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                >
                  Posting Diskusi
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
