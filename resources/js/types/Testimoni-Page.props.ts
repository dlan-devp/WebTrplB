export interface Testimoni {
  id: string;
  nama: string;
  type: 'Pendapat' | 'Saran' | 'Kritik';
  deskripsi: string;
  is_anonymous?: boolean;
  user_id?: number | null;
  user?: {
    id?: number | null;
    name?: string | null;
    email_verified_at?: string | null;
  } | null;
}