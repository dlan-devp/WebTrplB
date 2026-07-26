import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { Heart, X, ChevronLeft, ChevronRight, SmilePlus } from 'lucide-react';


interface GaleriItem {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: string; // ISO string
  gambar: string[]; // 1 gambar = tanpa slider, >1 gambar = slider aktif
  isFavorit: boolean;
  reaksi: Record<string, number>; // emoji -> jumlah orang lain yang bereaksi
  reaksiSaya: string | null; // emoji yang dipilih user saat ini (kalau ada)
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

// ============================ MOCK DATA ==================================

const DATA_AWAL: GaleriItem[] = [
  {
    id: 'g1',
    judul: 'Study tour ke kantor startup',
    deskripsi: 'Kunjungan kelas ke kantor salah satu startup lokal, belajar langsung soal kerja tim engineering sehari-hari.',
    tanggal: '2026-07-14T09:30:00',
    gambar: ['https://dummyimage.com/1600x900/000/fff', 'https://dummyimage.com/400x400/000/fff', 'https://dummyimage.com/400x600/000/fff'],
    isFavorit: false,
    reaksi: { '🔥': 6, '❤️': 3 },
    reaksiSaya: null,
  },
  {
    id: 'g2',
    judul: 'Praktikum jaringan bareng',
    deskripsi: 'Sesi konfigurasi router dan switch di Lab 3, sempat panik pas kabelnya ketuker semua.',
    tanggal: '2026-07-10T13:15:00',
    gambar: ['https://dummyimage.com/800x600/000/fff'],
    isFavorit: true,
    reaksi: { '😂': 9 },
    reaksiSaya: '😂',
  },
  {
    id: 'g3',
    judul: 'Buka bersama kelas',
    deskripsi: 'Ngabuburit bareng sebelum buka puasa di taman kampus, seru banget rame-rame.',
    tanggal: '2026-06-02T18:00:00',
    gambar: ['https://dummyimage.com/900x1600/000/fff', 'https://dummyimage.com/600x800/000/fff'],
    isFavorit: false,
    reaksi: { '❤️': 12, '🥰': 4 },
    reaksiSaya: null,
  },
  {
    id: 'g4',
    judul: 'Presentasi proyek akhir',
    deskripsi: 'Demo aplikasi kelompok 3 di depan dosen pembimbing, hasilnya lumayan memuaskan.',
    tanggal: '2026-05-28T10:00:00',
    gambar: ['https://dummyimage.com/800x400/000/fff'],
    isFavorit: false,
    reaksi: { '👏': 15 },
    reaksiSaya: null,
  },
  {
    id: 'g5',
    judul: 'Futsal seru-seruan',
    deskripsi: 'Tanding futsal antar kelompok setelah UTS selesai, kelompok A menang tipis 4-3.',
    tanggal: '2026-05-15T16:30:00',
    gambar: ['https://dummyimage.com/400x300/000/fff', 'https://dummyimage.com/400x300/000/fff', 'https://dummyimage.com/400x300/000/fff', 'https://dummyimage.com/400x300/000/fff'],
    isFavorit: true,
    reaksi: { '⚽': 7, '🔥': 5 },
    reaksiSaya: '🔥',
  },
  {
    id: 'g6',
    judul: 'Ulang tahun ketua kelas',
    deskripsi: 'Kejutan kecil buat Bagas di sela-sela jam kosong, ada kue dan lilin dadakan.',
    tanggal: '2026-04-22T11:00:00',
    gambar: ['https://dummyimage.com/300x400/000/fff'],
    isFavorit: false,
    reaksi: { '🎉': 10, '🥳': 6 },
    reaksiSaya: null,
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

  const hasilCari = cari.trim()
    ? EMOJI_KATEGORI.flatMap((k) => k.emoji).filter((_, idx, arr) => arr.indexOf(_) === idx)
    : null;

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="fixed inset-x-4 bottom-4 z-50 flex max-h-80 w-auto flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:absolute sm:inset-auto sm:bottom-full sm:left-0 sm:mb-2 sm:w-72"
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
        <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-2 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {EMOJI_KATEGORI.map((k, i) => (
            <button
              key={k.nama}
              onClick={() => setTab(i)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                tab === i ? 'bg-violet-100 text-violet-700' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {k.nama}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-8 gap-1 overflow-y-auto p-2">
        {(hasilCari ?? EMOJI_KATEGORI[tab].emoji).map((e, i) => (
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
  const entri = Object.entries(item.reaksi).filter(([, jumlah]) => jumlah > 0);

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
                ? 'border-violet-300 bg-violet-50 text-violet-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
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

// ============================= GALERI CARD ===============================

function GaleriCard({
  item,
  onBuka,
  onToggleFavorit,
  index,
}: {
  item: GaleriItem;
  onBuka: () => void;
  onToggleFavorit: () => void;
  index: number;
}) {
  const totalReaksi = Object.values(item.reaksi).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.05, ease: 'easeOut' }}
      className="group relative mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-(--color-bg)"
    >
      <button onClick={onBuka} className="block w-full text-left">
        <img
          src={item.gambar[0]}
          alt={item.judul}
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {item.gambar.length > 1 && (
          <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            1/{item.gambar.length}
          </span>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-['Space_Grotesk'] text-sm font-semibold text-white line-clamp-1">
            {item.judul}
          </p>
          {totalReaksi > 0 && (
            <p className="mt-0.5 text-xs text-white/80">{totalReaksi} reaksi</p>
          )}
        </div>
      </button>

      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorit();
        }}
        aria-label="Tambah ke favorit"
        className="absolute -right-4 -bottom-1 flex h-10 w-10 items-center justify-center rounded-tl-xl bg-(--color-bg) text-slate-500 shadow-sm backdrop-blur-sm transition-colors hover:text-violet-600"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={item.isFavorit ? 'penuh' : 'kosong'}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Heart size={16} fill={item.isFavorit ? '#7C3AED' : 'none'} color={item.isFavorit ? '#7C3AED' : 'currentColor'} />
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

// =============================== LIGHTBOX =================================

function Lightbox({
  item,
  onTutup,
  onReaksi,
}: {
  item: GaleriItem;
  onTutup: () => void;
  onReaksi: (emoji: string) => void;
}) {
  const [indeks, setIndeks] = useState(0);
  const [arah, setArah] = useState(1);
  const punyaSlider = item.gambar.length > 1;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onTutup();
      if (e.key === 'ArrowRight') gantiSlide(1);
      if (e.key === 'ArrowLeft') gantiSlide(-1);
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indeks]);

  function gantiSlide(delta: number) {
    if (!punyaSlider) return;
    setArah(delta);
    setIndeks((i) => (i + delta + item.gambar.length) % item.gambar.length);
  }

  function handleDragAkhir(_: unknown, info: PanInfo) {
    if (info.offset.x < -80) gantiSlide(1);
    else if (info.offset.x > 80) gantiSlide(-1);
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
            key={indeks}
            src={item.gambar[indeks]}
            alt={`${item.judul} - ${indeks + 1}`}
            custom={arah}
            drag={punyaSlider ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragAkhir}
            initial={{ opacity: 0, x: arah > 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: arah > 0 ? -80 : 80 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
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
            {item.gambar.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setArah(i > indeks ? 1 : -1);
                  setIndeks(i);
                }}
                aria-label={`Ke gambar ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === indeks ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail: judul, deskripsi, tanggal, reaksi saja */}
      <div
        className="max-h-[38vh] shrink-0 overflow-y-auto bg-white/[0.03] px-5 pb-6 pt-4 sm:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-['Space_Grotesk'] text-lg font-semibold text-white sm:text-xl">
          {item.judul}
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/70">
          {item.deskripsi}
        </p>
        <p className="mt-2 font-mono text-xs text-white/45">{formatTanggal(item.tanggal)}</p>

        <div className="mt-4">
          <ReaksiBarGelap item={item} onReaksi={onReaksi} />
        </div>
      </div>
    </motion.div>
  );
}

// Varian ReaksiBar dengan warna untuk latar gelap di dalam lightbox
function ReaksiBarGelap({ item, onReaksi }: { item: GaleriItem; onReaksi: (emoji: string) => void }) {
  const [picketTerbuka, setPickerTerbuka] = useState(false);
  const entri = Object.entries(item.reaksi).filter(([, jumlah]) => jumlah > 0);

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

export default function GaleriPage() {
  const [items, setItems] = useState<GaleriItem[]>(DATA_AWAL);
  const [dipilihId, setDipilihId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'semua' | 'favorit'>('semua');

  const itemDipilih = items.find((i) => i.id === dipilihId) ?? null;
  const ditampilkan = filter === 'favorit' ? items.filter((i) => i.isFavorit) : items;

  function toggleFavorit(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isFavorit: !i.isFavorit } : i))
    );
  }

  function kirimReaksi(id: string, emoji: string) {
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
              Kumpulan momen kelas kita. Klik foto untuk lihat lebih detail, kasih favorit atau reaksi favoritmu.
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

        {ditampilkan.length === 0 ? (
          <div className="rounded-2xl border border-dashed py-20 text-center text-sm text-slate-400">
            Belum ada foto favorit. Tandai foto dengan ikon hati untuk menyimpannya di sini.
          </div>
        ) : (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {ditampilkan.map((item, i) => (
              <GaleriCard
                key={item.id}
                item={item}
                index={i}
                onBuka={() => setDipilihId(item.id)}
                onToggleFavorit={() => toggleFavorit(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {itemDipilih && (
          <Lightbox
            item={itemDipilih}
            onTutup={() => setDipilihId(null)}
            onReaksi={(emoji) => kirimReaksi(itemDipilih.id, emoji)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
