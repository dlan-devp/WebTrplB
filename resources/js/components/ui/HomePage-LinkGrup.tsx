import { motion } from 'motion/react';
import { MessageCircle, Hash, FolderOpen, ArrowUpRight } from 'lucide-react';
import { linkGrup } from '../../../../database/dummyData';
import type { LinkGrup } from '../../types/LinkGrup-Comp.props';
import SectionHeading from './SectionHeading';
import '../../../css/components/LinkGrup.css';

const ICON: Record<LinkGrup['tipe'], React.ComponentType<{ size?: number }>> = {
  whatsapp: MessageCircle,
  discord: Hash,
  drive: FolderOpen,
};

export default function LinkGrup() {
  const links: LinkGrup[] = Array.isArray(linkGrup) ? linkGrup : [linkGrup];

  return (
    <section id="grup" className="section">
      <SectionHeading
        eyebrow="Tetap Terhubung"
        title="Link Grup Kelas"
        subtitle="Semua pintu masuk ke obrolan dan file kelas, ada di sini."
      />

      <div className="linkgrup-grid">
        {links.map((link: LinkGrup, i: number) => {
          const Icon = ICON[link.tipe];
          return (
            <motion.a
              key={link.id}
              href={link.url}
              className="linkgrup-card"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <span className={`linkgrup-card__icon linkgrup-card__icon--${link.tipe}`}>
                <Icon size={20} />
              </span>
              <span className="linkgrup-card__text">
                <span className="linkgrup-card__nama">{link.nama}</span>
                <span className="linkgrup-card__desk">{link.deskripsi}</span>
              </span>
              <ArrowUpRight size={18} className="linkgrup-card__arrow" />
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
