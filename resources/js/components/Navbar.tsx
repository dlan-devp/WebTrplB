import { motion } from 'motion/react';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#jadwal', label: 'Jadwal' },
  { href: '#pengumuman', label: 'Pengumuman' },
  { href: '#anggota', label: 'Anggota' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#forum', label: 'Forum' },
];

export default function Navbar() {
  return (
    <motion.header
      className="navbar"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar__inner">
        <a href="#top" className="navbar__brand">
          <span className="navbar__dot" />
          Kelas TRPLB
        </a>
        <nav className="navbar__links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#grup" className="navbar__cta">
          Login / Register
        </a>
      </div>
    </motion.header>
  );
}
