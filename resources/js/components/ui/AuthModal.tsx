import { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import '../../../css/components/AuthModal.css';


export default function AuthModal() {
  const [tab, setTab] = useState<'masuk' | 'daftar'>('masuk');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      className="auth-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="auth-modal"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="auth-modal__head">
          <h3 className="display">{tab === 'masuk' ? 'Masuk' : 'Daftar Akun'}</h3>
          <button className="auth-modal__close" aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        <div className="auth-modal__tabs">
          <button
            className={`auth-modal__tab ${tab === 'masuk' ? 'is-active' : ''}`}
            onClick={() => { setTab('masuk'); setError(null); }}
            type="button"
          >
            Masuk
          </button>
          <button
            className={`auth-modal__tab ${tab === 'daftar' ? 'is-active' : ''}`}
            onClick={() => { setTab('daftar'); setError(null); }}
            type="button"
          >
            Daftar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {tab === 'daftar' && (
            <label className="auth-form__field">
              <span>Nama</span>
              <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama kamu" required />
            </label>
          )}
          <label className="auth-form__field">
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@kelas.ac.id" required />
          </label>
          <label className="auth-form__field">
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={4} />
          </label>

          {error && <p className="auth-form__error">{error}</p>}

          <button type="submit" className="auth-form__submit">
            {tab === 'masuk' ? 'Masuk' : 'Daftar & Masuk'}
          </button>

          {tab === 'masuk' && (
            <p className="auth-form__hint">
              Coba akun demo: <span className="mono">citra@kelas.ac.id</span> / <span className="mono">demo123</span>
            </p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}
