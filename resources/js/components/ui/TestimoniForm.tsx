import { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
// import type { Testimoni } from '../../types/TestimoniKelas.props';
import '../../../css/components/TestimoniForm.css';
import type { Testimoni } from '@/types/Testimoni.props';

interface TestimoniFormProps {
    mode: 'tambah' | 'edit';
    initialData?: Testimoni;
    onClose: () => void;
    onSubmit: (data: {
        nama: string;
        type: Testimoni['type'];
        deskripsi: string;
    }) => void;
}

export default function TestimoniForm({ mode, initialData, onClose, onSubmit }: TestimoniFormProps) {
  const [nama, setNama] = useState(initialData?.nama ?? '');
  const [type, setType] = useState<Testimoni['type']>(initialData?.type ?? 'Pendapat');
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim() || !deskripsi.trim()) return;

    onSubmit({
        nama: nama.trim(),
        type,
        deskripsi: deskripsi.trim(),
    });
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
            <select
                value={type}
                onChange={(e) =>
                    setType(e.target.value as Testimoni['type'])
                    }>
                <option value="Pendapat">Pendapat</option>
                <option value="Saran">Saran</option>
                <option value="Kritik">Kritik</option>
            </select>
          </label>

          <label className="testimoni-form__field">
            <span>Pesan</span>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
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
