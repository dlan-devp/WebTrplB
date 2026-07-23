import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, LogIn, X } from 'lucide-react';

interface HomePageAuthPromptModalProps {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onLogin: () => void;
  onContinue: () => void;
  continueLabel?: string;
}

export default function AllPageAuthPromptModal({
  open,
  title = 'Login dulu',
  description = 'Kamu perlu masuk terlebih dahulu sebelum melanjutkan.',
  onClose,
  onLogin,
  onContinue,
  continueLabel = 'Tetap lanjut',
}: HomePageAuthPromptModalProps) {
  return (
    <AnimatePresence>
      {open && (
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
              <h3 className="display">{title}</h3>
              <button
                className="testimoni-modal__close"
                onClick={onClose}
                aria-label="Tutup"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <div className="testimoni-form">
              <p className="testimoni-card__pesan" style={{ marginBottom: '1rem' }}>
                {description}
              </p>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  className="testimoni-form__submit"
                  type="button"
                  onClick={onLogin}
                  style={{
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LogIn size={16} style={{ marginRight: '0.5rem' }} />
                  Masuk / Daftar
                </button>

                <button
                  className="testimoni-form__submit"
                  type="button"
                  onClick={onContinue}
                  style={{
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    color: '#4f46e5',
                    border: '1px solid #c7d2fe',
                  }}
                >
                  <ArrowRight size={16} style={{ marginRight: '0.5rem' }} />
                  {continueLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
