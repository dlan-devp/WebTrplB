export interface Testimoni {
  id: string;
  nama: string;
  type: 'Pendapat' | 'Saran' | 'Kritik';
  deskripsi: string;
}