import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { VoteValue } from '@/types/Forum-Page.types';

interface VoteControlProps {
  votes: number;
  userVote: VoteValue;
  onVote: (next: VoteValue) => void;
  size?: 'sm' | 'md';
  orientation?: 'vertical' | 'horizontal';
}

export default function VoteControl({
  votes,
  userVote,
  onVote,
  size = 'md',
  orientation = 'vertical',
}: VoteControlProps) {
  const iconSize = size === 'sm' ? 14 : 18;

  const handleClick = (dir: 1 | -1) => {
    // klik lagi pada arah yang sama = batalkan vote
    onVote(userVote === dir ? 0 : dir);
  };

  return (
    <div
      className={
        orientation === 'vertical'
          ? 'flex flex-col items-center gap-0.5'
          : 'flex items-center gap-1.5'
      }
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.8 }}
        onClick={() => handleClick(1)}
        aria-label="Upvote"
        className={`p-1 transition-colors ${
          userVote === 1
            ? 'text-violet-600 bg-violet-50'
            : 'text-slate-400 hover:text-violet-600 hover:bg-violet-50'
        }`}
      >
        <ChevronUp size={iconSize} strokeWidth={2.5} />
      </motion.button>

      <motion.span
        key={votes}
        initial={{ scale: 1.25, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`font-mono font-semibold tabular-nums ${
          size === 'sm' ? 'text-xs' : 'text-sm'
        } ${
          userVote === 1
            ? 'text-violet-600'
            : userVote === -1
            ? 'text-blue-600'
            : 'text-slate-600'
        }`}
      >
        {votes}
      </motion.span>

      <motion.button
        type="button"
        whileTap={{ scale: 0.8 }}
        onClick={() => handleClick(-1)}
        aria-label="Downvote"
        className={`p-1 transition-colors ${
          userVote === -1
            ? 'text-blue-600 bg-blue-50'
            : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        <ChevronDown size={iconSize} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
