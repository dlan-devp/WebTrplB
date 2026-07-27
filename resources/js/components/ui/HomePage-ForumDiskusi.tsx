import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';
import SectionHeading from './HomePage-SectionHeading';
import '../../../css/components/ForumDiskusi.css';
import AllPageAuthPromptModal from './AllPage-AuthPromptModal';
import { ThreadDiskusi } from '@/types/Forum-Comp.types';

interface DiskusiProps{
  threadDiskusi: ThreadDiskusi[];
}

export default function ForumDiskusi({threadDiskusi}: DiskusiProps) {
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
            href="forum"
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
                oleh {thread.user.name} &middot; {new Date(thread.created_at).toLocaleString('id-ID')}
              </span>
            </span>
            <span className="forum-item__count">{thread.jawaban_count} balasan</span>
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
