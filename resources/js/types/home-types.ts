export interface JadwalItem {
  id: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  waktu: string; // "08:00 - 10:00"
  matkul: string;
  dosen: string;
  ruang: string;
  tipe: 'teori' | 'praktikum';
}

export interface PengumumanItem {
  id: string;
  judul: string;
  isi: string;
  tanggal: string; // "20 Jul 2026"
  urgensi: 'info' | 'penting' | 'deadline';
}

export interface AnggotaItem {
  id: string;
  nama: string;
  inisial: string;
  online?: boolean;
}

export interface FotoGaleri {
  id: string;
  url: string;
  caption: string;
}

export interface LinkGrupItem {
  id: string;
  nama: string;
  deskripsi: string;
  url: string;
  tipe: 'whatsapp' | 'discord' | 'drive';
}

export interface ThreadDiskusi {
  id: string;
  judul: string;
  penulis: string;
  jumlahBalasan: number;
  waktu: string;
}

export interface TestimoniItem {
  id: string;
  nama: string;
  tipe: 'pendapat' | 'saran' | 'kritik';
  pesan: string;
}
