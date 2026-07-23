import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Pencil, Trash2, CornerDownRight } from 'lucide-react';
import type { Jawaban, VoteValue } from '@/types/Forum-Page.types';
import { currentUser } from '../../../../database/seedData';
import { waktuRelatif } from '@/components/utils/ForumPage.utils';
import VoteControl from './ForumPage-VoteControl';

interface JawabanItemProps {
  jawaban: Jawaban;
  isBestAnswer: boolean;
  isPostAuthor: boolean;
  onVote: (next: VoteValue) => void;
  onEdit: (isiBaru: string) => void;
  onDelete: () => void;
  onTandaiTerbaik: () => void;
  onTambahBalasan: (isi: string) => void;
  onEditBalasan: (balasanId: string, isiBaru: string) => void;
  onDeleteBalasan: (balasanId: string) => void;
  canInteract?: boolean;
}

export default function JawabanItem({
  jawaban,
  isBestAnswer,
  isPostAuthor,
  onVote,
  onEdit,
  onDelete,
  onTandaiTerbaik,
  onTambahBalasan,
  onEditBalasan,
  onDeleteBalasan,
  canInteract = false,
}: JawabanItemProps) {
  const isOwner = jawaban.authorId === currentUser.id;
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(jawaban.isi);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyValue, setReplyValue] = useState('');

  const simpanEdit = () => {
    if (!editValue.trim()) return;
    onEdit(editValue.trim());
    setEditing(false);
  };

  const kirimBalasan = () => {
    if (!replyValue.trim()) return;
    onTambahBalasan(replyValue.trim());
    setReplyValue('');
    setShowReplyForm(false);
  };

  return (
    <div
      className={`border p-4 ${
        isBestAnswer ? 'border-emerald-200 bg-emerald-50/40' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex gap-3">
        <VoteControl votes={jawaban.votes} userVote={jawaban.userVote} onVote={onVote} size="sm" readOnly={!canInteract} />

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-700">{jawaban.authorNama}</span>
            <span className="text-xs text-slate-400">&middot; {waktuRelatif(jawaban.createdAt)}</span>
            {isBestAnswer && (
              <span className="flex items-center gap-1 bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 size={12} /> Jawaban Terbaik
              </span>
            )}
          </div>

          {editing ? (
            <div className="space-y-2">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={3}
                className="w-full resize-none border border-slate-200 px-3 py-2 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
              />
              <div className="flex gap-2">
                <button onClick={simpanEdit} className="bg-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white">
                  Simpan
                </button>
                <button
                  onClick={() => { setEditing(false); setEditValue(jawaban.isi); }}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-slate-600">{jawaban.isi}</p>
          )}

          {!editing && canInteract && (
            <div className="mt-2 flex items-center gap-3 text-xs font-medium">
              <button onClick={() => setShowReplyForm((s) => !s)} className="text-slate-400 hover:text-violet-600">
                Balas
              </button>
              {isPostAuthor && !isBestAnswer && (
                <button onClick={onTandaiTerbaik} className="text-slate-400 hover:text-emerald-600">
                  Tandai jawaban terbaik
                </button>
              )}
              {/* Edit & hapus hanya tampil untuk pemilik jawaban */}
              {isOwner && (
                <>
                  <button onClick={() => setEditing(true)} className="flex items-center gap-1 text-slate-400 hover:text-violet-600">
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={onDelete} className="flex items-center gap-1 text-slate-400 hover:text-red-500">
                    <Trash2 size={12} /> Hapus
                  </button>
                </>
              )}
            </div>
          )}

          <AnimatePresence>
            {canInteract && showReplyForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 flex gap-2 overflow-hidden"
              >
                <input
                  value={replyValue}
                  onChange={(e) => setReplyValue(e.target.value)}
                  placeholder="Tulis balasan singkat..."
                  className="flex-1 border border-slate-200 px-3.5 py-1.5 text-xs focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                  onKeyDown={(e) => e.key === 'Enter' && kirimBalasan()}
                />
                <button onClick={kirimBalasan} className="bg-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white">
                  Kirim
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nested replies, ala thread balasan Reddit */}
          {jawaban.balasan.length > 0 && (
            <div className="mt-3 space-y-2.5 border-l-2 border-slate-100 pl-3.5">
              {jawaban.balasan.map((b) => (
                <BalasanRow
                  key={b.id}
                  isi={b.isi}
                  authorNama={b.authorNama}
                  authorId={b.authorId}
                  createdAt={b.createdAt}
                  onEdit={(isiBaru) => onEditBalasan(b.id, isiBaru)}
                  onDelete={() => onDeleteBalasan(b.id)}
                  canInteract={canInteract}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BalasanRow({
  isi,
  authorNama,
  authorId,
  createdAt,
  onEdit,
  onDelete,
  canInteract = false,
}: {
  isi: string;
  authorNama: string;
  authorId: string;
  createdAt: string;
  onEdit: (isiBaru: string) => void;
  onDelete: () => void;
  canInteract?: boolean;
}) {
  const isOwner = authorId === currentUser.id;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(isi);

  return (
    <div className="flex gap-2 text-sm">
      <CornerDownRight size={13} className="mt-1 shrink-0 text-slate-300" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-medium text-slate-700">{authorNama}</span>
          <span className="text-xs text-slate-400">&middot; {waktuRelatif(createdAt)}</span>
        </div>
        {editing ? (
          <div className="mt-1 flex gap-2">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 border border-slate-200 px-3 py-1 text-xs focus:border-violet-400 focus:outline-none"
            />
            <button
              onClick={() => { if (value.trim()) { onEdit(value.trim()); setEditing(false); } }}
              className="text-xs font-semibold text-violet-600"
            >
              Simpan
            </button>
          </div>
        ) : (
          <p className="text-slate-500">{isi}</p>
        )}
        {canInteract && isOwner && !editing && (
          <div className="mt-0.5 flex gap-2.5 text-xs text-slate-400">
            <button onClick={() => setEditing(true)} className="hover:text-violet-600">Edit</button>
            <button onClick={onDelete} className="hover:text-red-500">Hapus</button>
          </div>
        )}
      </div>
    </div>
  );
}
