export type Kategori = 'Tugas' | 'Proyek';
export type VoteValue = 1 | 0 | -1;

export interface CurrentUser {
  id: string;
  nama: string;
  inisial: string;
}

/** Balasan = reply on an answer, satu level saja (seperti reply Reddit yang disederhanakan) */
export interface Balasan {
  id: number;
  postId: number;
  jawabanId: number;
  authorId: number;
  authorNama: string;
  isi: string;
  created_at: string;
}

/** Jawaban = answer/comment on a discussion thread (seperti answer di StackOverflow) */
export interface Jawaban {
  id: number;
  postId: number;
  authorId: number;
  authorNama: string;
  isi: string;
  created_at: string;
  votes: number;
  userVote: VoteValue;
   user: {
    id: number;
    name: string;
  };
  balasan: Balasan[];
}

/** DiskusiPost = thread utama (seperti post di Reddit / pertanyaan di Quora) */
export interface DiskusiPost {
  id: number;
  authorId: number;
  authorNama: string;
  judul: string;
  isi: string;
  kategori: Kategori;
  tags: string | null;
  created_at: string;
  votes: number;
  userVote: VoteValue;
  views: number;
  jawabanTerbaikId?: string | null;
  jawaban: Jawaban[];

  user: {
    id: number;
    name: string;
  };
}

export type SortMode = 'Terbaru' | 'Terpopuler' | 'Belum-Terjawab';
export type FilterKategori = 'semua' | Kategori;
