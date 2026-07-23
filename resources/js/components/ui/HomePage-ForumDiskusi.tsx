import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { threadDiskusi } from '../../../../database/dummyData';
import SectionHeading from './SectionHeading';
import '../../../css/components/ForumDiskusi.css';
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ForumDiskusi() {
  return (
    <section id="forum" className="section section--tint">
      <SectionHeading
        eyebrow="Sedang Dibahas"
        title="Forum Diskusi"
        subtitle="Tanya-jawab seputar tugas dan materi kuliah, langsung dari teman sekelas."
      />

      <div className="forum-list">
        {threadDiskusi.map((thread, i) => (
          <motion.a
            key={thread.id}
            href="#"
            className="forum-item"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
          >
            <span className="forum-item__icon">
              <MessageSquare size={16} />
            </span>
            <span className="forum-item__body">
              <span className="forum-item__title">{thread.judul}</span>
              <span className="forum-item__meta">
                oleh {thread.penulis} &middot; {thread.waktu}
              </span>
            </span>
            <span className="forum-item__count">{thread.jumlahBalasan} balasan</span>
          </motion.a>
        ))}
      </div>

      <Link href="/testimoni" className="forum-page-nav">
        Buka diskusi baru <ArrowRight size={18} />
      </Link>
    </section>
  );
}
