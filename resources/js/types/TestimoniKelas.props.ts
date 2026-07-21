export interface Testimoni {
  id: string;
  nama: string;
  tipe: 'pendapat' | 'saran' | 'kritik';
  pesan: string;
  authorId?: string; // kosong = data awal/seed, ga bisa diedit siapa pun
}