import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'motion/react';
import '../../css/components/AuthPage.css';
// import Navbar from '@/components/ui/Navbar';

type Mode = 'login' | 'register';
type FieldId = 'name' | 'email' | 'password' | 'password_confirmation';

const FIELDS_BY_MODE: Record<Mode, FieldId[]> = {
  login: ['email', 'password'],
  register: ['name', 'email', 'password', 'password_confirmation'],
};

function validateField(
  id: FieldId,
  value: string,
  mode: Mode,
  allValues: Record<FieldId, string>
): string {
  switch (id) {
    case 'name': {
      const trimmed = value.trim();
      if (!trimmed) return 'Nama tidak boleh kosong.';
      if (trimmed.length < 3) return 'Nama minimal 3 karakter.';
      if (!/^[A-Za-z\s.'-]+$/.test(trimmed)) return 'Nama hanya boleh berisi huruf.';
      return '';
    }
    case 'email': {
      const trimmed = value.trim();
      if (!trimmed) return 'Email tidak boleh kosong.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return 'Format email tidak valid.';
      return '';
    }
    case 'password': {
      if (!value) return 'Kata sandi tidak boleh kosong.';
      if (mode === 'register') {
        if (value.length < 8) return 'Kata sandi minimal 8 karakter.';
        if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
          return 'Kata sandi harus mengandung huruf dan angka.';
        }
      }
      return '';
    }
    case 'password_confirmation': {
      if (!value) return 'Konfirmasi kata sandi tidak boleh kosong.';
      if (value !== allValues.password) return 'Konfirmasi tidak cocok dengan kata sandi.';
      return '';
    }
    default:
      return '';
  }
}

function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [values, setValues] = useState<Record<FieldId, string>>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldId, boolean>>>({});
  const [shakeMap, setShakeMap] = useState<Partial<Record<FieldId, number>>>({});

  const activeFields = FIELDS_BY_MODE[mode];

  function switchMode(next: Mode) {
    setMode(next);
    setErrors({});
    setTouched({});
    setShakeMap({});
  }

  function handleChange(id: FieldId, val: string) {
    setValues((prev) => {
      const next = { ...prev, [id]: val };

      // Validasi realtime buat field yang udah pernah "disentuh" (blur),
      // biar error gak langsung muncul pas pengguna baru mulai ngetik.
      if (touched[id]) {
        setErrors((e) => ({ ...e, [id]: validateField(id, val, mode, next) }));
      }

      // Kalau kata sandi berubah dan konfirmasi sudah dsentuh, re-validasi konfirmasi juga.
      if (id === 'password' && touched.password_confirmation) {
        setErrors((e) => ({
          ...e,
          password_confirmation: validateField('password_confirmation', next.password_confirmation, mode, next),
        }));
      }

      return next;
    });
  }

  function handleBlur(id: FieldId) {
    setTouched((t) => ({ ...t, [id]: true }));
    setValues((current) => {
      setErrors((e) => ({ ...e, [id]: validateField(id, current[id], mode, current) }));
      return current;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: Partial<Record<FieldId, string>> = {};
    const newTouched: Partial<Record<FieldId, boolean>> = {};

    activeFields.forEach((id) => {
      newErrors[id] = validateField(id, values[id], mode, values);
      newTouched[id] = true;
    });

    setErrors(newErrors);
    setTouched((t) => ({ ...t, ...newTouched }));

    const invalidFields = activeFields.filter((id) => newErrors[id]);

    if (invalidFields.length > 0) {
      return;
    }

    setIsSubmitting(true);

    if (mode === 'register') {
      router.post('/register', {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      }, {
        onFinish: () => setIsSubmitting(false),
      });
    }

    if (mode === 'login') {
      router.post('/login', {
        email: values.email,
        password: values.password,
      }, {
        onFinish: () => setIsSubmitting(false),
      });
    }
  }

  return (
    <>

      <Head title="Masuk / Daftar" />
  
      <div className="auth">

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

          <div className="auth__tabs">
              <button
                type="button"
                className={`auth__tab ${mode === 'login' ? 'is-active' : ''}`}
                onClick={() => switchMode('login')}
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
                onClick={() => switchMode('register')}
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
        </motion.div>

        <motion.div
          className="auth__panel"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="auth__form-wrap">
            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                onSubmit={handleSubmit}
                className="auth__form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                noValidate
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
                    id="name"
                    label="Nama Lengkap"
                    type="text"
                    value={values.name}
                    onChange={(v) => handleChange('name', v)}
                    onBlur={() => handleBlur('name')}
                    autoComplete="name"
                    error={errors.name}
                    touched={touched.name}
                    isValid={!errors.name && values.name.length > 0}
                    shakeSignal={shakeMap.name ?? 0}
                  />
                )}

                <FloatingField
                  id="email"
                  label="Email Kampus"
                  type="email"
                  value={values.email}
                  onChange={(v) => handleChange('email', v)}
                  onBlur={() => handleBlur('email')}
                  autoComplete="email"
                  error={errors.email}
                  touched={touched.email}
                  isValid={!errors.email && values.email.length > 0}
                  shakeSignal={shakeMap.email ?? 0}
                />

                <FloatingField
                  id="password"
                  label="Kata Sandi"
                  type="password"
                  value={values.password}
                  onChange={(v) => handleChange('password', v)}
                  onBlur={() => handleBlur('password')}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  error={errors.password}
                  touched={touched.password}
                  isValid={!errors.password && values.password.length > 0}
                  shakeSignal={shakeMap.password ?? 0}
                />

                {mode === 'register' && (
                  <PasswordStrengthMeter password={values.password} />
                )}

                {mode === 'register' && (
                  <FloatingField
                    id="password_confirmation"
                    label="Konfirmasi Kata Sandi"
                    type="password"
                    value={values.password_confirmation}
                    onChange={(v) => handleChange('password_confirmation', v)}
                    onBlur={() => handleBlur('password_confirmation')}
                    autoComplete="new-password"
                    error={errors.password_confirmation}
                    touched={touched.password_confirmation}
                    isValid={!errors.password_confirmation && values.password_confirmation.length > 0}
                    shakeSignal={shakeMap.password_confirmation ?? 0}
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
              </motion.form>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
}

interface FloatingFieldProps {
  id: FieldId;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  autoComplete?: string;
  error?: string;
  touched?: boolean;
  isValid?: boolean;
  
  shakeSignal?: number;
}

function FloatingField({
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  autoComplete,
  error,
  touched,
  isValid,
  shakeSignal = 0,
}: FloatingFieldProps) {
  const showError = Boolean(touched && error);
  const showValid = Boolean(touched && !error && isValid);

  return (
    <motion.div
      key={shakeSignal}
      className="field"
      style={{ position: 'relative' }}
      animate={shakeSignal > 0 ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        placeholder=" "
        className="field__input"
        required
        aria-invalid={showError}
        aria-describedby={showError ? `${id}-error` : undefined}
        style={{
          borderColor: showError ? '#e5484d' : showValid ? '#30a46c' : undefined,
          paddingRight: showError || showValid ? 40 : undefined,
          transition: 'border-color 0.2s ease',
        }}
      />
      <label htmlFor={id} className="field__label">{label}</label>

      <AnimatePresence mode="wait">
        {(showError || showValid) && (
          <motion.span
            key={showError ? 'invalid-icon' : 'valid-icon'}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: 12,
              top: 14,
              width: 20,
              height: 20,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1,
              color: '#fff',
              background: showError ? '#e5484d' : '#30a46c',
            }}
          >
            {showError ? '!' : '✓'}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showError && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 6 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              overflow: 'hidden',
              color: '#e5484d',
              fontSize: 12.5,
              lineHeight: 1.4,
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;

  const strength = getPasswordStrength(password);
  const labels = ['Sangat lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat kuat'];
  const colors = ['#e5484d', '#f76b15', '#f5a623', '#30a46c', '#18794e'];
  const pct = (strength / 4) * 100;

  return (
    <div style={{ marginTop: -8, marginBottom: 4 }}>
      <div
        style={{
          height: 4,
          borderRadius: 2,
          background: 'rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ height: '100%', background: colors[strength], borderRadius: 2 }}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={strength}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          style={{ fontSize: 11.5, marginTop: 4, color: colors[strength] }}
        >
          Kekuatan kata sandi: {labels[strength]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
