import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Pencil, Trash2, MessageSquare, Eye } from 'lucide-react';
import type { DiskusiPost, VoteValue } from '@/types/Forum-Page.types';
import { currentUser } from '../../../../database/seedData';
import { waktuRelatif, buatId } from '@/components/utils/ForumPage.utils';
import VoteControl from './ForumPage-VoteControl';
import JawabanItem from './ForumPage-JawabanItem';

interface ThreadDetailProps {
  post: DiskusiPost;
  onBack: () => void;
  onUpdatePost: (updater: (post: DiskusiPost) => DiskusiPost) => void;
  onDeletePost: () => void;
  canInteract?: boolean;
}

const KATEGORI_STYLE: Record<DiskusiPost['kategori'], string> = {
  tugas: 'bg-violet-50 text-violet-600',
  proyek: 'bg-blue-50 text-blue-600',
};

export default function ThreadDetail({ post, onBack, onUpdatePost, onDeletePost, canInteract = false }: ThreadDetailProps) {
  const isOwner = post.authorId === currentUser.id;
  const [editingPost, setEditingPost] = useState(false);
  const [judulEdit, setJudulEdit] = useState(post.judul);
  const [isiEdit, setIsiEdit] = useState(post.isi);
  const [jawabanBaru, setJawabanBaru] = useState('');

  const jawabanTerurut = useMemo(() => {
    return [...post.jawaban].sort((a, b) => {
      if (a.id === post.jawabanTerbaikId) return -1;
      if (b.id === post.jawabanTerbaikId) return 1;
      return b.votes - a.votes;
    });
  }, [post.jawaban, post.jawabanTerbaikId]);

  const votePost = (next: VoteValue) => {
    onUpdatePost((p) => {
      const delta = next - p.userVote;
      return { ...p, votes: p.votes + delta, userVote: next };
    });
  };

  const simpanEditPost = () => {
    if (!judulEdit.trim() || !isiEdit.trim()) return;
    onUpdatePost((p) => ({ ...p, judul: judulEdit.trim(), isi: isiEdit.trim() }));
    setEditingPost(false);
  };

  const kirimJawaban = () => {
    if (!jawabanBaru.trim()) return;
    onUpdatePost((p) => ({
      ...p,
      jawaban: [
        ...p.jawaban,
        {
          id: buatId('jwb'),
          postId: p.id,
          authorId: currentUser.id,
          authorNama: currentUser.nama,
          isi: jawabanBaru.trim(),
          createdAt: new Date().toISOString(),
          votes: 0,
          userVote: 0,
          balasan: [],
        },
      ],
    }));
    setJawabanBaru('');
  };

  const voteJawaban = (jawabanId: string, next: VoteValue) => {
    onUpdatePost((p) => ({
      ...p,
      jawaban: p.jawaban.map((j) =>
        j.id === jawabanId ? { ...j, votes: j.votes + (next - j.userVote), userVote: next } : j
      ),
    }));
  };

  const editJawaban = (jawabanId: string, isiBaru: string) => {
    onUpdatePost((p) => ({
      ...p,
      jawaban: p.jawaban.map((j) => (j.id === jawabanId ? { ...j, isi: isiBaru } : j)),
    }));
  };

  const hapusJawaban = (jawabanId: string) => {
    onUpdatePost((p) => ({
      ...p,
      jawaban: p.jawaban.filter((j) => j.id !== jawabanId),
      jawabanTerbaikId: p.jawabanTerbaikId === jawabanId ? undefined : p.jawabanTerbaikId,
    }));
  };

  const tandaiTerbaik = (jawabanId: string) => {
    onUpdatePost((p) => ({ ...p, jawabanTerbaikId: jawabanId }));
  };

  const tambahBalasan = (jawabanId: string, isi: string) => {
    onUpdatePost((p) => ({
      ...p,
      jawaban: p.jawaban.map((j) =>
        j.id === jawabanId
          ? {
              ...j,
              balasan: [
                ...j.balasan,
                {
                  id: buatId('bls'),
                  postId: p.id,
                  jawabanId,
                  authorId: currentUser.id,
                  authorNama: currentUser.nama,
                  isi,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : j
      ),
    }));
  };

  const editBalasan = (jawabanId: string, balasanId: string, isiBaru: string) => {
    onUpdatePost((p) => ({
      ...p,
      jawaban: p.jawaban.map((j) =>
        j.id === jawabanId
          ? { ...j, balasan: j.balasan.map((b) => (b.id === balasanId ? { ...b, isi: isiBaru } : b)) }
          : j
      ),
    }));
  };

  const hapusBalasan = (jawabanId: string, balasanId: string) => {
    onUpdatePost((p) => ({
      ...p,
      jawaban: p.jawaban.map((j) =>
        j.id === jawabanId ? { ...j, balasan: j.balasan.filter((b) => b.id !== balasanId) } : j
      ),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="mx-auto max-w-3xl px-4 py-8"
    >
      <button onClick={onBack} className="mb-5 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-violet-600">
        <ArrowLeft size={16} /> Kembali ke daftar diskusi
      </button>

      <div className="border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex gap-4">
          <VoteControl votes={post.votes} userVote={post.userVote} onVote={votePost} readOnly={!canInteract} />

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 text-xs font-semibold capitalize ${KATEGORI_STYLE[post.kategori]}`}>
                {post.kategori}
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">
                  #{tag}
                </span>
              ))}
            </div>

            {editingPost ? (
              <div className="space-y-2">
                <input
                  value={judulEdit}
                  onChange={(e) => setJudulEdit(e.target.value)}
                  className="w-full border border-slate-200 px-3 py-2 text-lg font-semibold focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                />
                <textarea
                  value={isiEdit}
                  onChange={(e) => setIsiEdit(e.target.value)}
                  rows={4}
                  className="w-full resize-none border border-slate-200 px-3 py-2 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                />
                <div className="flex gap-2">
                  <button onClick={simpanEditPost} className="bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white">
                    Simpan
                  </button>
                  <button
                    onClick={() => { setEditingPost(false); setJudulEdit(post.judul); setIsiEdit(post.isi); }}
                    className="px-4 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="mb-2 text-xl font-semibold leading-snug text-slate-900">{post.judul}</h1>
                <p className="mb-4 whitespace-pre-line text-sm leading-relaxed text-slate-600">{post.isi}</p>
              </>
            )}

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="font-medium text-slate-500">{post.authorNama}</span>
              <span>&middot; {waktuRelatif(post.createdAt)}</span>
              <span className="flex items-center gap-1"><Eye size={13} /> {post.views}</span>
              <span className="flex items-center gap-1"><MessageSquare size={13} /> {post.jawaban.length}</span>

              {/* Edit & hapus thread hanya untuk pembuatnya dan pengguna terautentikasi */}
              {canInteract && isOwner && !editingPost && (
                <span className="ml-auto flex items-center gap-3">
                  <button onClick={() => setEditingPost(true)} className="flex items-center gap-1 hover:text-violet-600">
                    <Pencil size={13} /> Edit
                  </button>
                  <button onClick={onDeletePost} className="flex items-center gap-1 hover:text-red-500">
                    <Trash2 size={13} /> Hapus
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-700">
          {post.jawaban.length} Jawaban
        </h2>

        <div className="space-y-3">
          {jawabanTerurut.map((j) => (
            <JawabanItem
              key={j.id}
              jawaban={j}
              isBestAnswer={j.id === post.jawabanTerbaikId}
              isPostAuthor={isOwner}
              onVote={(next) => voteJawaban(j.id, next)}
              onEdit={(isiBaru) => editJawaban(j.id, isiBaru)}
              onDelete={() => hapusJawaban(j.id)}
              onTandaiTerbaik={() => tandaiTerbaik(j.id)}
              onTambahBalasan={(isi) => tambahBalasan(j.id, isi)}
              onEditBalasan={(balasanId, isiBaru) => editBalasan(j.id, balasanId, isiBaru)}
              onDeleteBalasan={(balasanId) => hapusBalasan(j.id, balasanId)}
              canInteract={canInteract}
            />
          ))}
        </div>

        {canInteract && (
          <div className="mt-5 border border-slate-200 bg-white p-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">Tulis Jawaban</label>
            <textarea
              value={jawabanBaru}
              onChange={(e) => setJawabanBaru(e.target.value)}
              rows={3}
              placeholder="Bagikan solusi atau pendapatmu..."
              className="w-full resize-none border border-slate-200 px-3.5 py-2.5 text-sm placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
            <div className="mt-2.5 flex justify-end">
              <button
                onClick={kirimJawaban}
                className="bg-linear-to-r from-violet-600 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
              >
                Kirim Jawaban
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
