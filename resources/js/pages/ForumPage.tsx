import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import type { DiskusiPost, FilterKategori, SortMode, VoteValue, Balasan, Jawaban  } from '@/types/Forum-Page.types';
// import { buatId } from '@/components/utils/ForumPage.utils';
import ThreadCard from '@/components/ui/ForumPage-ThreadCard';
import ThreadDetail from '@/components/ui/ForumPage-ThreadDetail';
import CreateThreadModal from '@/components/ui/ForumPage-CreateThreadModal';
import GeneralCompPagination from '@/components/ui/GeneralComp-Pagination';
import useMomentumScroll from '@/animation/MomentumScroll';

interface DiskusiProps{
  diskusi: DiskusiPost[];
  jawaban: Jawaban[];
}

const ITEMS_PER_PAGE = 4;

const FILTER_TABS: { value: FilterKategori; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'Tugas', label: 'Tugas' },
  { value: 'Proyek', label: 'Proyek' },
];

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: 'Terbaru', label: 'Terbaru' },
  { value: 'Terpopuler', label: 'Terpopuler' },
  { value: 'belum-terjawab', label: 'Belum Terjawab' },
];

export default function ForumPage({diskusi}: DiskusiProps) {
  const { auth } = usePage<{
    auth?: {
        user?: {
            id?: number | null;
            name?: string | null;
            email?: string | null;
            email_verified_at?: string | null;
        } | null;
    };
}>().props;
  const isVerified = Boolean(auth?.user?.email_verified_at);
  const canInteract = Boolean(auth?.user);
  const [posts, setPosts] = useState<DiskusiPost[]>(diskusi);
  useEffect(() => {
  setPosts(diskusi);
    }, [diskusi]);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterKategori>('semua');
  const [sort, setSort] = useState<SortMode>('Terbaru');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const postsTertampil = useMemo(() => {
    let hasil = posts;

    if (filter !== 'semua') {
      hasil = hasil.filter((p) => p.kategori === filter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      hasil = hasil.filter(
        (p) =>
          p.judul.toLowerCase().includes(q) ||
          p.isi.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          p.user.name.toLowerCase().includes(q)
      );
    }
    if (sort === 'belum-terjawab') {
      hasil = hasil.filter((p) => !p.jawabanTerbaikId);
    }

    return [...hasil].sort((a, b) => {
      if (sort === 'Terpopuler') return b.votes - a.votes;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [posts, filter, sort, search]);

  const totalPages = Math.max(1, Math.ceil(postsTertampil.length / ITEMS_PER_PAGE));
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return postsTertampil.slice(start, start + ITEMS_PER_PAGE);
  }, [postsTertampil, currentPage]);

  const activePost = posts.find((p) => p.id === activePostId) ?? null;

  const updatePost = (id: number, updater: (post: DiskusiPost) => DiskusiPost) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? updater(p) : p)));
  };

  const votePost = (id: number, next: VoteValue) => {
  updatePost(id, (p) => ({
    ...p,
    votes: p.votes + (next - p.userVote),
    userVote: next,
  }));

  router.put(`/forum/${id}/vote`, {
    value: next,
  }, {
    preserveScroll: true,
  });
};

  const hapusPost = (id: number) => {
    // optimistic update: hilangkan dulu dari UI & tutup detail
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setActivePostId(null);

    router.delete(`/forum/${id}`, {
      preserveScroll: true,
      onError: () => {
        // gagal di server, kembalikan post yang sempat dihapus dari state
        setPosts(diskusi);
      },
    });
  };

  const buatPost = (data: {
    judul: string;
    isi: string;
    kategori: DiskusiPost['kategori'];
    tags: string[];
  }) => {
    router.post('/forum', data, {
    onSuccess: (page) => {
    setPosts(page.props.diskusi as DiskusiPost[]);
    setModalOpen(false);
  },
});
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, sort, search]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  useMomentumScroll()

  return (
    <div className="min-h-screen mx-auto lg:w-350 md:w-dvw px-5 pt-25 pb-10">
      <AnimatePresence mode="wait">
        {activePost ? (
          <ThreadDetail
            key="detail"
            post={activePost}
            onBack={() => setActivePostId(null)}
            onUpdatePost={(updater) => updatePost(activePost.id, updater)}
            onDeletePost={() => hapusPost(activePost.id)}
            canInteract={canInteract}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <span className="mb-2 inline-block bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
                  Forum Kelas
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Diskusi Tugas &amp; Proyek
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Tanya, jawab, dan diskusi bareng teman sekelas.
                </p>
              </div>
            </div>

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-1.5 bg-slate-100 p-1">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setFilter(tab.value)}
                    className={`px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      filter === tab.value
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari diskusi..."
                  className="w-full lg:w-100 border border-slate-200 bg-white py-2 pl-8 pr-3 text-sm placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div className="flex gap-3 justify-between sm:justify-end items-center">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortMode)}
                  className="border border-slate-200 bg-white p-2 text-sm text-slate-600 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {canInteract && (
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                        if (!auth?.user) {
                            router.visit('/login');
                            return;
                        }

                        if (!isVerified) {
                            router.visit('/email/verify');
                            return;
                        }

                        setModalOpen(true);
                    }}
                    className="w-max flex shrink-0 items-center gap-1.5 bg-linear-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                >
                    <Plus size={16} /> Buat Diskusi
                </motion.button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {paginatedPosts.map((post) => (
                  <ThreadCard
                    key={post.id}
                    post={post}
                    onOpen={() => setActivePostId(post.id)}
                    onVote={(next) => votePost(post.id, next)}
                    canInteract={canInteract}
                  />
                ))}
              </AnimatePresence>

              {postsTertampil.length === 0 && (
                <div className="border border-dashed border-slate-200 py-14 text-center text-sm text-slate-400">
                  Belum ada diskusi yang cocok. Coba kata kunci lain atau buat diskusi baru.
                </div>
              )}
            </div>

            <GeneralCompPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-6"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <CreateThreadModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={buatPost} />
    </div>
  );
}