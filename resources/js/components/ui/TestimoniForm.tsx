import { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import type { Testimoni } from '../../types/TestimoniKelas.props';
import '../../../css/components/TestimoniForm.css';

interface TestimoniFormProps {
  mode: 'tambah' | 'edit';
  initialData?: Testimoni;
  onClose: () => void;
  onSubmit: (data: { nama: string; peran?: string; tipe: Testimoni['tipe']; pesan: string }) => void;
}

export default function TestimoniForm({ mode, initialData, onClose, onSubmit }: TestimoniFormProps) {
  const [nama, setNama] = useState(initialData?.nama ?? '');
  const [tipe, setTipe] = useState<Testimoni['tipe']>(initialData?.tipe ?? 'pendapat');
  const [pesan, setPesan] = useState(initialData?.pesan ?? '');

  const handleSubmit = (e: React.FormEvent) => {
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
          <h3 className="display">{mode === 'edit' ? 'Edit Testimoni' : 'Tambah Testimoni'}</h3>
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
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              placeholder="Tulis pendapat, saran, atau kritik kamu untuk kelas..."
              rows={4}
              required
            />
          </label>

          <button type="submit" className="testimoni-form__submit">
            {mode === 'edit' ? 'Simpan Perubahan' : 'Kirim Testimoni'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
