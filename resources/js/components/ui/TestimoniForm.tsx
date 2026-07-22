import { useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
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
        is_anonymous: boolean;
    }) => void;
}

export default function TestimoniForm({ mode, initialData, onClose, onSubmit }: TestimoniFormProps) {
  const page = usePage<{ auth: { user?: { name?: string | null } } }>();
  const defaultName = useMemo(() => page.props.auth.user?.name?.trim() ?? '', [page.props.auth.user?.name]);
  const [nama, setNama] = useState(initialData?.nama ?? defaultName);
  const [type, setType] = useState<Testimoni['type']>(initialData?.type ?? 'Pendapat');
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi ?? '');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    if (!initialData) {
      setNama(defaultName);
    }
  }, [defaultName, initialData]);

  const handleAnonymousToggle = (checked: boolean) => {
    setIsAnonymous(checked);

    if (!checked) {
      setNama(defaultName || initialData?.nama || '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim() || !deskripsi.trim()) return;

    onSubmit({
        nama: nama.trim(),
        type,
        deskripsi: deskripsi.trim(),
        is_anonymous: isAnonymous,
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
          <motion.label
            className={`testimoni-form__field ${!isAnonymous ? 'is-disabled' : ''}`}
            initial={{ opacity: 0.96 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span>Nama</span>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama kamu"
              required
              disabled={!isAnonymous}
              title={!isAnonymous ? 'Nama asli tidak bisa diubah' : ''}
            />
          </motion.label>

          <motion.label
            className={`testimoni-form__toggle ${isAnonymous ? 'is-active' : ''}`}
            initial={{ opacity: 0.92, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => handleAnonymousToggle(e.target.checked)}
            />
            <span>Kirim sebagai anonim</span>
          </motion.label>

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
