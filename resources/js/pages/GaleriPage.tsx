import { useEffect, useMemo, useRef, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { Heart, X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, SmilePlus } from 'lucide-react';

interface Kategori {
    id: number;
    nama: string;
}

interface GaleriItem {
    id: number;
    judul: string | null;
    deskripsi: string | null;
    gambar: string[];
    ukuran: string;
    isFavorit: boolean;
    reaksi: Record<string, number> | null;
    reaksiSaya: string | null;
    created_at: string;
    updated_at: string;
    kategori: Kategori;
}

interface GaleriPageProps {
    galeri: GaleriItem[];
}


// ============================ EMOJI DATA =================================
// Dikelompokkan mirip keyboard emoji di HP, lengkap dengan pencarian.

const EMOJI_KATEGORI: { nama: string; emoji: string[] }[] = [
  {
    nama: 'Senyum',
    emoji: [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊',
      '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪',
      '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤨', '😐', '😑', '😶', '😏', '😒',
      '🙄', '😬', '😌', '😔', '😪', '🤤', '😴', '😷', '🥵', '🥶', '🥴', '😵',
      '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '🙁', '😮', '😲', '🥺', '😢',
      '😭', '😱', '😩', '😫', '🥱', '😤', '😡', '🤬', '😈', '💀', '💩', '🤡',
    ],
  },
  {
    nama: 'Gestur',
    emoji: [
      '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘',
      '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛',
      '🤜', '👏', '🙌', '👐', '🤲', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '👀',
    ],
  },
  {
    nama: 'Hewan',
    emoji: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
      '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅',
      '🦉', '🦇', '🐺', '🐴', '🦄', '🐝', '🦋', '🐌', '🐞', '🐢', '🐍', '🦎',
      '🐙', '🦑', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈',
    ],
  },
  {
    nama: 'Makanan',
    emoji: [
      '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍒', '🍑',
      '🥭', '🍍', '🥥', '🥝', '🍅', '🥑', '🥦', '🥕', '🌽', '🥐', '🍞', '🧀',
      '🍳', '🥞', '🥓', '🍗', '🍔', '🍟', '🍕', '🌮', '🌯', '🥙', '🍝', '🍜',
      '🍲', '🍛', '🍣', '🍱', '🍤', '🍰', '🎂', '🍭', '🍫', '🍿', '☕', '🍵',
      '🧋', '🍺', '🍻', '🥂',
    ],
  },
  {
    nama: 'Aktivitas',
    emoji: [
      '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏸', '🏓', '🎱', '🏆', '🥇', '🎮',
      '🎲', '🎯', '🎳', '🎪', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎸',
      '🎻', '🚴', '🏊', '🧗', '🏋️', '🧘',
    ],
  },
  {
    nama: 'Perjalanan',
    emoji: [
      '🚗', '🚕', '🚌', '🏎️', '🚓', '🚑', '🚒', '🚲', '🛵', '✈️', '🚀', '🚁',
      '⛵', '🚢', '🗺️', '🗽', '🗼', '🏰', '🎡', '🎢', '🏖️', '🏝️', '🌋', '⛰️',
      '🏕️', '🏠', '🏢', '🏫', '🏥', '⛪',
    ],
  },
  {
    nama: 'Objek',
    emoji: [
      '⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '📷', '📸', '🎥', '📞', '📺', '🎙️',
      '⏰', '🔋', '💡', '🔦', '💰', '💳', '💎', '🔧', '🔨', '🔩', '⚙️', '🔒',
      '🔑', '📚', '📖', '✏️', '📌', '📎',
    ],
  },
  {
    nama: 'Simbol',
    emoji: [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '💕', '💞',
      '💓', '💗', '💖', '💘', '💝', '✅', '❌', '❗', '❓', '➕', '➖', '♾️',
      '💯', '🔥', '✨', '🎉', '🎊', '🎁',
    ],
  },
  {
    nama: 'Bendera',
    emoji: ['🏳️', '🏴', '🚩', '🏳️‍🌈', '🇮🇩', '🇺🇸', '🇬🇧', '🇯🇵', '🇰🇷', '🇸🇬', '🇲🇾', '🇦🇺'],
  },
];


// ============================== HELPERS ==================================

const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

function formatTanggal(iso: string): string {
  const d = new Date(iso);
  const jam = d.getHours().toString().padStart(2, '0');
  const menit = d.getMinutes().toString().padStart(2, '0');
  return `${jam}:${menit} · ${d.getDate()} ${NAMA_BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

// ============================ EMOJI PICKER ===============================

function EmojiPicker({
  onPilih,
  onTutup,
}: {
  onPilih: (emoji: string) => void;
  onTutup: () => void;
}) {
  const [cari, setCari] = useState('');
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickLuar(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onTutup();
      }
    }
    document.addEventListener('mousedown', handleClickLuar);
    return () => document.removeEventListener('mousedown', handleClickLuar);
  }, [onTutup]);

  useEffect(() => {
    setPage(0);
  }, [cari, tab]);

  const hasilCari = cari.trim()
    ? EMOJI_KATEGORI.flatMap((k) => k.emoji).filter((_, idx, arr) => arr.indexOf(_) === idx)
    : null;

  const emojiList = hasilCari ?? EMOJI_KATEGORI[tab].emoji;
  const pageSize = 24;
  const pageCount = Math.max(1, Math.ceil(emojiList.length / pageSize));
  const pageEmojis = emojiList.slice(page * pageSize, (page + 1) * pageSize);
  const bisaPrev = page > 0;
  const bisaNext = page < pageCount - 1;

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="fixed left-4 right-4 bottom-4 z-50 flex max-h-80 w-auto flex-col overflow-auto rounded-2xl border border-slate-200 bg-white shadow-xl sm:right-auto sm:w-72"
    >
      <div className="border-b border-slate-100 p-2">
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari emoji..."
          className="w-full rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {!cari.trim() && (
        <div className="border-b border-slate-100 px-2 py-2">
          <label className="sr-only" htmlFor="emoji-kategori">
            Pilih kategori emoji
          </label>
          <div className="relative inline-flex w-full max-w-xs">
            <select
              id="emoji-kategori"
              value={tab}
              onChange={(event) => setTab(Number(event.target.value))}
              className="appearance-none w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 pr-10 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            >
              {EMOJI_KATEGORI.map((k, i) => (
                <option key={k.nama} value={i}>
                  {k.nama}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 px-2 pt-2">
        <button
          type="button"
          onClick={() => setPage((prev) => Math.max(0, prev - 1))}
          disabled={!bisaPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronUp size={18} />
        </button>

        <span className="text-xs text-slate-500">
          {pageCount > 1 ? `Halaman ${page + 1}/${pageCount}` : 'Pilih emoji'}
        </span>

        <button
          type="button"
          onClick={() => setPage((prev) => Math.min(pageCount - 1, prev + 1))}
          disabled={!bisaNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronDown size={18} />
        </button>
      </div>

      <div className="grid grid-cols-8 gap-1 p-2">
        {pageEmojis.map((e, i) => (
          <button
            key={`${e}-${i}`}
            onClick={() => onPilih(e)}
            className="rounded-lg py-1.5 text-xl transition-transform hover:scale-125 hover:bg-slate-50"
          >
            {e}
          </button>
        ))}
        {hasilCari && hasilCari.length === 0 && (
          <span className="col-span-8 py-4 text-center text-xs text-slate-400">
            Emoji tidak ditemukan
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ============================= REAKSI BAR ================================

function ReaksiBar({
  item,
  onReaksi,
}: {
  item: GaleriItem;
  onReaksi: (emoji: string) => void;
}) {
  const [picketTerbuka, setPickerTerbuka] = useState(false);
  const entri = Object.entries(item.reaksi ?? {})
    .filter(([, jumlah]) => jumlah > 0);

  return (
    <div className="relative flex flex-wrap items-center gap-2">
      {entri.map(([emoji, jumlah]) => {
        const aktif = item.reaksiSaya === emoji;
        return (
          <motion.button
            key={emoji}
            whileTap={{ scale: 0.9 }}
            onClick={() => onReaksi(emoji)}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-sm transition-colors ${
              aktif
                ? 'border-violet-300 bg-violet-500/30 text-gray-100'
                : 'border-slate-200 bg-white/30 text-gray-400 hover:border-slate-300'
            }`}
          >
            <span>{emoji}</span>
            <span className="text-xs font-medium">{jumlah}</span>
          </motion.button>
        );
      })}

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setPickerTerbuka((v) => !v)}
        className="flex items-center gap-1 rounded-full border border-dashed border-slate-300 px-2.5 py-1 text-slate-400 transition-colors hover:border-violet-400 hover:text-violet-500"
        aria-label="Tambah reaksi"
      >
        <SmilePlus size={16} />
      </motion.button>

      <AnimatePresence>
        {picketTerbuka && (
          <EmojiPicker
            onPilih={(emoji) => {
              onReaksi(emoji);
              setPickerTerbuka(false);
            }}
            onTutup={() => setPickerTerbuka(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================= ALBUM CARD =================================
// Satu kartu mewakili satu kategori (album). Cover pakai foto pertama,
// badge menunjukkan 1/total foto dalam album, nama kategori muncul saat hover.
// Favorit & reaksi ditempel ke foto cover, sama seperti kartu foto sebelumnya.

function AlbumCard({
  kategori,
  items,
  onBuka,
  onToggleFavorit,
  onReaksi,
  index,
}: {
  kategori: string;
  items: GaleriItem[];
  onBuka: (id: number) => void;
  onToggleFavorit: (id: number) => void;
  onReaksi: (id: number, emoji: string) => void;
  index: number;
}) {
  const cover = useMemo(
    () =>
      [...items].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0],
    [items]
  );
  const total = items.length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04, ease: 'easeOut' }}
      className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-(--color-bg)"
    >
      <button onClick={() => onBuka(cover.id)} className="block w-full text-left">
        <img
          src={`/storage/${cover.gambar[0]}`}
          alt={kategori}
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {total > 1 && (
          <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            1/{total}
          </span>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-['Space_Grotesk'] text-sm font-semibold text-white line-clamp-1">
            {kategori}
          </p>
          <p className="mt-0.5 text-xs text-white/80">{total} foto</p>
        </div>
      </button>

      <div className="absolute top-3 left-3" onClick={(e) => e.stopPropagation()}>
        <ReaksiBar item={cover} onReaksi={(emoji) => onReaksi(cover.id, emoji)} />
      </div>

      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorit(cover.id);
        }}
        aria-label="Tambah ke favorit"
        className="absolute -right-4 -bottom-1 flex h-10 w-10 items-center justify-center rounded-tl-xl bg-(--color-bg) text-slate-500 shadow-sm backdrop-blur-sm transition-colors hover:text-violet-600"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={cover.isFavorit ? 'penuh' : 'kosong'}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Heart size={16} fill={cover.isFavorit ? '#7C3AED' : 'none'} color={cover.isFavorit ? '#7C3AED' : 'currentColor'} />
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

// =============================== LIGHTBOX =================================

function Lightbox({
  item,
  album,
  onTutup,
  onReaksi,
}: {
  item: GaleriItem;
  album: GaleriItem[];
  onTutup: () => void;
  onReaksi: (emoji: string) => void;
}) {
  const indeksAwal = album.findIndex((i) => i.id === item.id);

  const [indeks, setIndeks] = useState(
    indeksAwal >= 0 ? indeksAwal : 0
  );

  const [arah, setArah] = useState(1);

  // Item yang sedang ditampilkan dalam album
  const itemAktif = album[indeks] ?? item;

  const punyaSlider = album.length > 1;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onTutup();
      }

      if (e.key === 'ArrowRight') {
        gantiSlide(1);
      }

      if (e.key === 'ArrowLeft') {
        gantiSlide(-1);
      }
    }

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indeks, album]);

  function gantiSlide(delta: number) {
    if (!punyaSlider) return;

    setArah(delta);

    setIndeks((i) => {
      return (i + delta + album.length) % album.length;
    });
  }

  function handleDragAkhir(_: unknown, info: PanInfo) {
    if (info.offset.x < -80) {
      gantiSlide(1);
    } else if (info.offset.x > 80) {
      gantiSlide(-1);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-(--color-ink) backdrop-blur-sm"
      onClick={onTutup}
    >
      <button
        onClick={onTutup}
        aria-label="Tutup"
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-(--color-bg) text-(--color-ink) transition-colors hover:bg-(--color-bg)/50 sm:right-6 sm:top-6"
      >
        <X size={20} />
      </button>

      {/* Area gambar */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {punyaSlider && (
          <button
            onClick={() => gantiSlide(-1)}
            aria-label="Sebelumnya"
            className="absolute left-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <AnimatePresence initial={false} custom={arah} mode="wait">
          <motion.img
            key={itemAktif.id}
            src={`/storage/${itemAktif.gambar[0]}`}
            alt={itemAktif.judul ?? 'Galeri'}
            custom={arah}
            drag={punyaSlider ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragAkhir}
            initial={{
              opacity: 0,
              x: arah > 0 ? 80 : -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: arah > 0 ? -80 : 80,
            }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
            }}
            className="max-h-full max-w-full cursor-grab select-none rounded-lg object-contain active:cursor-grabbing"
          />
        </AnimatePresence>

        {punyaSlider && (
          <button
            onClick={() => gantiSlide(1)}
            aria-label="Berikutnya"
            className="absolute right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {punyaSlider && (
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {album.map((albumItem, i) => (
              <button
                key={albumItem.id}
                onClick={() => {
                  setArah(i > indeks ? 1 : -1);
                  setIndeks(i);
                }}
                aria-label={`Ke foto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === indeks
                    ? 'w-5 bg-white'
                    : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail */}
      <div
        className="max-h-[38vh] shrink-0 overflow-y-auto bg-white/3 px-5 pb-6 pt-4 sm:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-['Space_Grotesk'] text-lg font-semibold text-white sm:text-xl">
          {itemAktif.judul}
        </h2>

        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/70">
          {itemAktif.deskripsi}
        </p>

        <p className="mt-2 font-mono text-xs text-white/45">
          {formatTanggal(itemAktif.created_at)}
        </p>

        <div className="mt-4">
          <ReaksiBarGelap
            item={itemAktif}
            onReaksi={onReaksi}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Varian ReaksiBar dengan warna untuk latar gelap di dalam lightbox
function ReaksiBarGelap({ item, onReaksi }: { item: GaleriItem; onReaksi: (emoji: string) => void }) {
  const [picketTerbuka, setPickerTerbuka] = useState(false);
  const entri = Object.entries(item.reaksi ?? {})
    .filter(([, jumlah]) => jumlah > 0);

  return (
    <div className="relative flex flex-wrap items-center gap-2">
      {entri.map(([emoji, jumlah]) => {
        const aktif = item.reaksiSaya === emoji;
        return (
          <motion.button
            key={emoji}
            whileTap={{ scale: 0.9 }}
            onClick={() => onReaksi(emoji)}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-sm transition-colors ${
              aktif
                ? 'border-violet-400/60 bg-violet-500/20 text-violet-200'
                : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30'
            }`}
          >
            <span>{emoji}</span>
            <span className="text-xs font-medium">{jumlah}</span>
          </motion.button>
        );
      })}

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setPickerTerbuka((v) => !v)}
        className="flex items-center gap-1 rounded-full border border-dashed border-white/25 px-2.5 py-1 text-white/50 transition-colors hover:border-violet-400 hover:text-violet-300"
        aria-label="Tambah reaksi"
      >
        <SmilePlus size={16} />
      </motion.button>

      <AnimatePresence>
        {picketTerbuka && (
          <EmojiPicker
            onPilih={(emoji) => {
              onReaksi(emoji);
              setPickerTerbuka(false);
            }}
            onTutup={() => setPickerTerbuka(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ================================ HALAMAN =================================

export default function GaleriPage({ galeri }: GaleriPageProps) {
  const [items, setItems] = useState(galeri);
  const [dipilihId, setDipilihId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'semua' | 'favorit'>('semua');

  const itemDipilih = items.find((i) => i.id === dipilihId) ?? null;

  const ditampilkan = useMemo(() => {
    return filter === 'favorit' ? items.filter((i) => i.isFavorit) : items;
  }, [filter, items]);

  // Kelompokkan foto menjadi album berdasarkan kategori.
  const albums = useMemo(() => {
    return ditampilkan.reduce((groups, item) => {
      const namaKategori = item.kategori?.nama ?? 'Lainnya';

      if (!groups[namaKategori]) {
        groups[namaKategori] = [];
      }

      groups[namaKategori].push(item);

      return groups;
    }, {} as Record<string, GaleriItem[]>);
  }, [ditampilkan]);

  // Album (satu kategori penuh) yang sedang dibuka di lightbox.
  const albumDipilih = useMemo(() => {
    if (!itemDipilih) return [];

    return ditampilkan.filter(
      (i) => i.kategori?.id === itemDipilih.kategori?.id
    );
  }, [ditampilkan, itemDipilih]);

  function toggleFavorit(id: number) {
    // optimistic update biar responsif, lalu kirim ke server
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isFavorit: !i.isFavorit } : i))
    );

    router.post(`/galeri/${id}/favorit`, {}, {
      preserveScroll: true,
      preserveState: true,
    });
  }

  function kirimReaksi(id: number, emoji: string) {
    // optimistic update biar responsif, lalu kirim ke server
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const reaksiBaru = { ...i.reaksi };

        // Lepas reaksi lama milik user (kalau ada dan beda dari yang baru)
        if (i.reaksiSaya) {
          reaksiBaru[i.reaksiSaya] = Math.max(0, (reaksiBaru[i.reaksiSaya] ?? 1) - 1);
        }

        const sudahDipilihSebelumnya = i.reaksiSaya === emoji;
        if (sudahDipilihSebelumnya) {
          // Klik emoji yang sama = batalkan reaksi
          return { ...i, reaksi: reaksiBaru, reaksiSaya: null };
        }

        reaksiBaru[emoji] = (reaksiBaru[emoji] ?? 0) + 1;
        return { ...i, reaksi: reaksiBaru, reaksiSaya: emoji };
      })
    );

    router.post(`/galeri/${id}/reaksi`, { emoji }, {
      preserveScroll: true,
      preserveState: true,
    });
  }

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-ink)">
      <div className="mx-auto lg:w-350 md:w-dvw px-5 pt-25 pb-10">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-blue-600">
              Dokumentasi
            </span>
            <h1 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold text-slate-900">
              Galeri Kegiatan
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
              Kumpulan momen kelas kita, dikelompokkan per album. Klik album untuk lihat semua foto di kategori itu.
            </p>
          </div>

          <div className="relative flex w-fit rounded-full border border-slate-200 bg-slate-50 p-1">
            {(['semua', 'favorit'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="relative rounded-full px-4 py-1.5 text-sm font-medium capitalize text-slate-600"
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-aktif"
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${filter === f ? 'text-violet-700' : ''}`}>
                  {f}
                </span>
              </button>
            ))}
          </div>
        </header>

        {Object.keys(albums).length === 0 ? (
          <div className="rounded-2xl border border-dashed py-20 text-center text-sm text-slate-400">
            Belum ada foto favorit. Tandai foto dengan ikon hati untuk menyimpannya di sini.
          </div>
        ) : (
          <div className="columns-2 gap-5 sm:columns-3 lg:columns-4">
            {Object.entries(albums).map(([kategori, data], i) => (
              <AlbumCard
                key={kategori}
                kategori={kategori}
                items={data}
                index={i}
                onBuka={setDipilihId}
                onToggleFavorit={toggleFavorit}
                onReaksi={kirimReaksi}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {itemDipilih && (
          <Lightbox
            item={itemDipilih}
            album={albumDipilih}
            onTutup={() => setDipilihId(null)}
            onReaksi={(emoji) => kirimReaksi(itemDipilih.id, emoji)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}