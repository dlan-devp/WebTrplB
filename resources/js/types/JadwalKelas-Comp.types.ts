export interface Jadwal {
  id: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  waktu?: string;
  matkul?: string;
  dosen?: string;
  ruang?: string;
  type?: 'teori' | 'praktikum';

}