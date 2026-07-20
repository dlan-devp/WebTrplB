import type {
  JadwalItem,
  PengumumanItem,
  AnggotaItem,
  FotoGaleri,
  LinkGrupItem,
  ThreadDiskusi,
  TestimoniItem,
} from '../types';

export const jadwalKelas: JadwalItem[] = [
  { id: 'j1', hari: 'Senin', waktu: '08:00 - 10:00', matkul: 'Struktur Data', dosen: 'Bu Rina', ruang: 'R.301', tipe: 'teori' },
  { id: 'j2', hari: 'Senin', waktu: '13:00 - 15:00', matkul: 'Praktikum Basis Data', dosen: 'Pak Yudi', ruang: 'Lab 2', tipe: 'praktikum' },
  { id: 'j3', hari: 'Selasa', waktu: '10:00 - 12:00', matkul: 'Aljabar Linear', dosen: 'Bu Sari', ruang: 'R.204', tipe: 'teori' },
  { id: 'j4', hari: 'Rabu', waktu: '08:00 - 10:00', matkul: 'Jaringan Komputer', dosen: 'Pak Anton', ruang: 'R.301', tipe: 'teori' },
  { id: 'j5', hari: 'Kamis', waktu: '13:00 - 16:00', matkul: 'Praktikum Jaringan', dosen: 'Pak Anton', ruang: 'Lab 3', tipe: 'praktikum' },
  { id: 'j6', hari: 'Jumat', waktu: '09:00 - 11:00', matkul: 'Manajemen Proyek TI', dosen: 'Bu Dewi', ruang: 'R.108', tipe: 'teori' },
];

export const pengumuman: PengumumanItem[] = [
  { id: 'p1', judul: 'Deadline Laporan Praktikum Basis Data', isi: 'Kumpulkan laporan bab 3-4 lewat Drive kelas paling lambat malam ini.', tanggal: '20 Jul 2026', urgensi: 'deadline' },
  { id: 'p2', judul: 'Kelas Aljabar Linear diganti jadi Online', isi: 'Bu Sari ada acara di luar kota, kelas Selasa dipindah ke Zoom.', tanggal: '19 Jul 2026', urgensi: 'penting' },
  { id: 'p3', judul: 'Foto dokumentasi study tour sudah diupload', isi: 'Cek folder Galeri untuk foto-foto kegiatan minggu lalu.', tanggal: '17 Jul 2026', urgensi: 'info' },
];

export const anggotaKelas: AnggotaItem[] = [
  { id: 'a1', nama: 'Bagas Pratama', peran: 'Ketua Kelas', inisial: 'BP', online: true },
  { id: 'a2', nama: 'Citra Ayu', peran: 'Wakil Ketua', inisial: 'CA', online: true },
  { id: 'a3', nama: 'Dimas Aditya', peran: 'Sekretaris', inisial: 'DA' },
  { id: 'a4', nama: 'Eka Putri', peran: 'Bendahara', inisial: 'EP', online: true },
  { id: 'a5', nama: 'Farhan Maulana', peran: 'Anggota', inisial: 'FM' },
  { id: 'a6', nama: 'Gita Lestari', peran: 'Anggota', inisial: 'GL' },
  { id: 'a7', nama: 'Hafiz Ramadhan', peran: 'Anggota', inisial: 'HR' },
  { id: 'a8', nama: 'Indah Sari', peran: 'Anggota', inisial: 'IS', online: true },
];

export const fotoGaleri: FotoGaleri[] = [
  { id: 'g1', url: '/images/galeri-1.jpg', caption: 'Study tour ke kantor startup' },
  { id: 'g2', url: '/images/galeri-2.jpg', caption: 'Praktikum jaringan bareng' },
  { id: 'g3', url: '/images/galeri-3.jpg', caption: 'Buka bersama kelas' },
  { id: 'g4', url: '/images/galeri-4.jpg', caption: 'Presentasi proyek akhir' },
  { id: 'g5', url: '/images/galeri-5.jpg', caption: 'Futsal seru-seruan' },
];

export const linkGrup: LinkGrupItem[] = [
  { id: 'l1', nama: 'Grup WhatsApp Kelas', deskripsi: 'Info harian & japri dosen', url: '#', tipe: 'whatsapp' },
  { id: 'l2', nama: 'Server Discord', deskripsi: 'Diskusi tugas & nongkrong', url: '#', tipe: 'discord' },
  { id: 'l3', nama: 'Google Drive Kelas', deskripsi: 'Materi, tugas, dan arsip', url: '#', tipe: 'drive' },
];

export const threadDiskusi: ThreadDiskusi[] = [
  { id: 't1', judul: 'Ada yang paham materi normalisasi database bab 4?', penulis: 'Farhan', jumlahBalasan: 12, waktu: '2 jam lalu' },
  { id: 't2', judul: 'Rekomendasi tools buat UML diagram apa ya?', penulis: 'Indah', jumlahBalasan: 7, waktu: '5 jam lalu' },
  { id: 't3', judul: 'Yuk atur jadwal belajar bareng buat UAS', penulis: 'Citra', jumlahBalasan: 21, waktu: 'Kemarin' },
];

export const testimoniKelas: TestimoniItem[] = [
  { id: 'ts1', nama: 'Gita Lestari', peran: 'Anggota', tipe: 'pendapat', pesan: 'Seneng banget kelas kita kompak, grup WA gak pernah sepi info tugas.' },
  { id: 'ts2', nama: 'Hafiz Ramadhan', peran: 'Anggota', tipe: 'saran', pesan: 'Mungkin bisa bikin jadwal belajar kelompok rutin tiap minggu sebelum UTS/UAS.' },
  { id: 'ts3', nama: 'Indah Sari', peran: 'Anggota', tipe: 'kritik', pesan: 'Notulen rapat kelas suka telat diupload, semoga ke depannya bisa lebih cepat.' },
  { id: 'ts4', nama: 'Dimas Aditya', peran: 'Sekretaris', tipe: 'pendapat', pesan: 'Bangga jadi bagian kelas ini, semua saling bantu kalau ada yang kesulitan materi.' },
  { id: 'ts5', nama: 'Eka Putri', peran: 'Bendahara', tipe: 'saran', pesan: 'Kas kelas bisa dipakai buat beli konsumsi pas kelas praktikum yang lama.' },
  { id: 'ts6', nama: 'Farhan Maulana', peran: 'Anggota', tipe: 'kritik', pesan: 'Beberapa masih suka telat submit tugas kelompok, perlu reminder H-1.' },
];
