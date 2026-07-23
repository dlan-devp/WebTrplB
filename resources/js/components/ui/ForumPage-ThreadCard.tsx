import { motion } from 'framer-motion';
import { MessageSquare, Eye, CheckCircle2 } from 'lucide-react';
import type { DiskusiPost, VoteValue } from '@/types/Forum-Page.types';
import { waktuRelatif } from '@/components/utils/ForumPage.utils';
import VoteControl from './ForumPage-VoteControl';

interface ThreadCardProps {
  post: DiskusiPost;
  onOpen: () => void;
  onVote: (next: VoteValue) => void;
  canInteract?: boolean;
}

const KATEGORI_STYLE: Record<DiskusiPost['kategori'], string> = {
  tugas: 'bg-violet-50 text-violet-600',
  proyek: 'bg-blue-50 text-blue-600',
};

export default function ThreadCard({ post, onOpen, onVote, canInteract = false }: ThreadCardProps) {
  const terjawab = Boolean(post.jawabanTerbaikId);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex gap-4 border border-slate-200 bg-white p-4 shadow-sm hover:border-violet-200 hover:shadow-md transition-[box-shadow,border-color]"
    >
      <div onClick={(e) => e.stopPropagation()} className="pt-1">
        <VoteControl votes={post.votes} userVote={post.userVote} onVote={onVote} readOnly={!canInteract} />
      </div>

      <button onClick={onOpen} className="min-w-0 flex-1 text-left">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <span className={`px-2.5 py-0.5 text-xs font-semibold capitalize ${KATEGORI_STYLE[post.kategori]}`}>
            {post.kategori}
          </span>
          {terjawab && (
            <span className="flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
              <CheckCircle2 size={12} /> Terjawab
            </span>
          )}
          {post.tags.map((tag) => (
            <span key={tag} className="bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">
              #{tag}
            </span>
          ))}
        </div>

        <h3 className="mb-1 truncate text-[15px] font-semibold text-slate-900">{post.judul}</h3>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-500">{post.isi}</p>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="font-medium text-slate-500">{post.authorNama}</span>
          <span>&middot;</span>
          <span>{waktuRelatif(post.createdAt)}</span>
          <span className="ml-auto flex items-center gap-3">
            <span className="flex items-center gap-1">
              <MessageSquare size={13} /> {post.jawaban.length}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={13} /> {post.views}
            </span>
          </span>
        </div>
      </button>
    </motion.article>
  );
}
