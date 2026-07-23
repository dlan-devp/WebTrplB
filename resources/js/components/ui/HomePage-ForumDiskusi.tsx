import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';
import { threadDiskusi } from '../../../../database/dummyData';
import SectionHeading from './HomePage-SectionHeading';
import '../../../css/components/ForumDiskusi.css';
import AllPageAuthPromptModal from './AllPage-AuthPromptModal';

export default function ForumDiskusi() {
  const { auth } = usePage<{ auth: { user?: { id?: string | null; name?: string | null } } }>().props;
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const openAuthPrompt = () => {
    setShowAuthPrompt(true);
  };

  const closeAuthPrompt = () => {
    setShowAuthPrompt(false);
  };

  const handleGoToForum = (e: MouseEvent<Element>) => {
    if (auth.user) {
      return;
    }

    e.preventDefault();
    openAuthPrompt();
  };

  const handleContinueToAuth = () => {
    closeAuthPrompt();
    router.visit('/user-auth');
  };

  const handleContinueBrowsing = () => {
    closeAuthPrompt();
    router.visit('/forum');
  };

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

      <Link href="/forum" className="forum-page-nav" onClick={handleGoToForum}>
        Buat diskusi baru <ArrowRight size={18} />
      </Link>

      <AllPageAuthPromptModal
        open={showAuthPrompt}
        description="Kamu masih bisa melihat-lihat diskusi, tetapi untuk menulis atau mengedit diskusi perlu masuk."
        onClose={closeAuthPrompt}
        onLogin={handleContinueToAuth}
        onContinue={handleContinueBrowsing}
      />
    </section>
  );
}
