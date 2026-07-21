export interface Testimoni {
  id: string;
  nama: string;
  tipe: 'pendapat' | 'saran' | 'kritik';
  pesan: string;
}