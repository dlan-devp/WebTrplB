export type Kategori = 'tugas' | 'proyek';
export type VoteValue = 1 | 0 | -1;

export interface CurrentUser {
  id: string;
  nama: string;
  inisial: string;
}

/** Balasan = reply on an answer, satu level saja (seperti reply Reddit yang disederhanakan) */
export interface Balasan {
  id: string;
  postId: string;
  jawabanId: string;
  authorId: string;
  authorNama: string;
  isi: string;
  createdAt: string;
}

/** Jawaban = answer/comment on a discussion thread (seperti answer di StackOverflow) */
export interface Jawaban {
  id: string;
  postId: string;
  authorId: string;
  authorNama: string;
  isi: string;
  createdAt: string;
  votes: number;
  userVote: VoteValue;
  balasan: Balasan[];
}

/** DiskusiPost = thread utama (seperti post di Reddit / pertanyaan di Quora) */
export interface DiskusiPost {
  id: string;
  authorId: string;
  authorNama: string;
  judul: string;
  isi: string;
  kategori: Kategori;
  tags: string[];
  createdAt: string;
  votes: number;
  userVote: VoteValue;
  views: number;
  jawabanTerbaikId?: string;
  jawaban: Jawaban[];
}

export type SortMode = 'terbaru' | 'terpopuler' | 'belum-terjawab';
export type FilterKategori = 'semua' | Kategori;
