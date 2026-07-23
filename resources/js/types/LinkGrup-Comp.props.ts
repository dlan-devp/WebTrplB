export interface LinkGrup {
  id: string;
  nama: string;
  deskripsi: string;
  url: string;
  tipe: 'whatsapp' | 'discord' | 'drive';
}