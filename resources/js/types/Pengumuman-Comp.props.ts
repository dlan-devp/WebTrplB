export interface Pengumuman {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  urgensi: 'info' | 'penting' | 'deadline';
}