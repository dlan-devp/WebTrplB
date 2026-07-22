import { Link, usePage } from '@inertiajs/react';
import { motion } from 'motion/react';
import '../../../css/components/Navbar.css';
import { logout } from '@/routes';

const NAV_LINKS = [
  { href: '/#jadwal', label: 'Jadwal' },
  { href: '/#pengumuman', label: 'Pengumuman' },
  { href: '/#anggota', label: 'Anggota' },
  { href: '/#galeri', label: 'Galeri' },
  { href: '/#forum', label: 'Forum' },
  { href: '/#testimoni', label: 'Testimoni' },
];

export default function Navbar() {
  const { auth } = usePage<{ auth: { user?: { name?: string | null } } }>().props;
  const isAuthenticated = Boolean(auth.user);

  return (
    <motion.header
      className="navbar"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar__inner">
        <a href="/#top" className="navbar__brand">
          <span className="navbar__dot" />
          Kelas TRPL-B
        </a>
        <nav className="navbar__links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>
        {isAuthenticated ? (
          <Link href={logout()} as="button" method="post" className="navbar__cta">
            Logout
          </Link>
        ) : (
          <a href="/public-auth" className="navbar__cta">
            Login / Register
          </a>
        )}
      </div>
    </motion.header>
  );
}
