import { Link, router, usePage } from '@inertiajs/react';
import { motion } from 'motion/react';
import { useState, type MouseEvent } from 'react';
import '../../../css/components/Navbar.css';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { logout } from '@/routes';
import PreviousPageButton from './ButtonComp-PreviousPageButton';
import AllPageAuthPromptModal from './AllPage-AuthPromptModal';

const NAV_LINKS = [
  { href: '/#jadwal', label: 'Jadwal' },
  { href: '/#pengumuman', label: 'Pengumuman' },
  { href: '/#anggota', label: 'Anggota' },
  { href: '/#galeri', label: 'Galeri' },
  { href: '/forum', label: 'Forum' },
  { href: '/testimoni', label: 'Testimoni' },
];

export default function Navbar() {
  const page = usePage<{ auth: { user?: { name?: string | null } } }>();
  const { auth } = page.props;
  const { currentUrl } = useCurrentUrl();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const isAuthenticated = Boolean(auth.user);
  const isHomePage = currentUrl === '/' || currentUrl === '';

  const closeAuthPrompt = () => {
    setShowAuthPrompt(false);
    setPendingHref(null);
  };

  const handleContinueBrowsing = () => {
    closeAuthPrompt();
    router.visit(pendingHref ?? '/');
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    if (isAuthenticated || !['Forum', 'Testimoni'].includes(label)) {
      return;
    }

    event.preventDefault();
    setPendingHref(href);
    setShowAuthPrompt(true);
  };

  return (
    <>
      <motion.header
        className="navbar border m-4 mx-20 border-white/30 shadow-2xl rounded-full backdrop-blur-sm"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="navbar__inner px-20">
          {!isHomePage && <PreviousPageButton />}
          <a href="/#top" className="navbar__brand">
            Kelas TRPL-B
          </a>
          <nav className="navbar__links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__link"
                onClick={(event) => handleNavClick(event, link.href, link.label)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {isAuthenticated ? (
            <Link href={logout()} as="button" method="post" className="navbar__cta">
              Logout
            </Link>
          ) : (
            <a href="/user-auth" className="navbar__cta">
              Login / Register
            </a>
          )}
        </div>
      </motion.header>

      <AllPageAuthPromptModal
        open={showAuthPrompt}
        title="Login dulu"
        description="Kamu masih bisa melihat-lihat data, tetapi untuk menambah atau mengedit data perlu masuk terlebih dahulu."
        onClose={closeAuthPrompt}
        onLogin={() => {
          closeAuthPrompt();
          router.visit('/user-auth');
        }}
        onContinue={handleContinueBrowsing}
      />
    </>
  );
}
