import { Head } from '@inertiajs/react';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import '../../css/components/AuthPage.css';

type Mode = 'login' | 'register';

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasi, setKonfirmasi] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO, sambungin ke API/auth provider sini.
    setTimeout(() => setIsSubmitting(false), 1200);
  };

  return (
    <div className="auth">
      <Head title="Masuk / Daftar" />

      <motion.div
        className="auth__brand"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="auth__brand-decor" aria-hidden="true">
          <span className="auth__blob auth__blob--purple" />
          <span className="auth__blob auth__blob--blue" />
        </div>
        <div className="auth__brand-content">
          <a href="#top" className="auth__brand-logo">
            <span className="auth__brand-dot" />
            Kelas TRPL-B
          </a>
          <h1 className="auth__brand-title display">
            Satu akun,
            <br />
            untuk satu kelas.
          </h1>
          <p className="auth__brand-subtitle">
            Masuk untuk lihat jadwal, pengumuman, dan diskusi kelas kapan saja.
          </p>
          <div className="auth__brand-card">
            <span className="mono auth__brand-card-tag">TRPL-B &middot; 2026/2027</span>
            <div className="auth__brand-card-title display">Kelas TRPL-B</div>
            <div className="auth__brand-card-sub">Teknik Rekayasa Perangkat Lunak &middot; Semester 3</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="auth__panel"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="auth__form-wrap">
          <div className="auth__tabs">
            <button
              type="button"
              className={`auth__tab ${mode === 'login' ? 'is-active' : ''}`}
              onClick={() => setMode('login')}
            >
              {mode === 'login' && (
                <motion.span
                  layoutId="auth-tab-pill"
                  className="auth__tab-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="auth__tab-label">Masuk</span>
            </button>
            <button
              type="button"
              className={`auth__tab ${mode === 'register' ? 'is-active' : ''}`}
              onClick={() => setMode('register')}
            >
              {mode === 'register' && (
                <motion.span
                  layoutId="auth-tab-pill"
                  className="auth__tab-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="auth__tab-label">Daftar</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              onSubmit={handleSubmit}
              className="auth__form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <h2 className="auth__form-title display">
                {mode === 'login' ? 'Selamat datang kembali' : 'Buat akun kelas'}
              </h2>
              <p className="auth__form-subtitle">
                {mode === 'login'
                  ? 'Masuk pakai email yang kamu daftarkan ke admin kelas.'
                  : 'Cuma buat teman-teman kelas TRPL-B, isi data di bawah ini.'}
              </p>

              {mode === 'register' && (
                <FloatingField
                  id="nama"
                  label="Nama Lengkap"
                  type="text"
                  value={nama}
                  onChange={setNama}
                  autoComplete="name"
                />
              )}

              <FloatingField
                id="email"
                label="Email Kampus"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
              />

              <FloatingField
                id="password"
                label="Kata Sandi"
                type="password"
                value={password}
                onChange={setPassword}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />

              {mode === 'register' && (
                <FloatingField
                  id="konfirmasi"
                  label="Konfirmasi Kata Sandi"
                  type="password"
                  value={konfirmasi}
                  onChange={setKonfirmasi}
                  autoComplete="new-password"
                />
              )}

              {mode === 'login' && (
                <a href="#lupa-sandi" className="auth__forgot">Lupa kata sandi?</a>
              )}

              <motion.button
                type="submit"
                className="auth__submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.span
                    className="auth__spinner"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                  />
                ) : mode === 'login' ? (
                  'Masuk'
                ) : (
                  'Buat Akun'
                )}
              </motion.button>

              <p className="auth__switch">
                {mode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                <button
                  type="button"
                  className="auth__switch-link"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                >
                  {mode === 'login' ? 'Daftar di sini' : 'Masuk di sini'}
                </button>
              </p>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

interface FloatingFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}

function FloatingField({ id, label, type, value, onChange, autoComplete }: FloatingFieldProps) {
  return (
    <div className="field">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder=" "
        className="field__input"
        required
      />
      <label htmlFor={id} className="field__label">{label}</label>
    </div>
  );
}
