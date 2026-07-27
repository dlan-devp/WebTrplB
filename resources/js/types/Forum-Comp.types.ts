export interface ThreadDiskusi {
  id: string;
  judul: string;
  user: {
      id: number;
      name: string;
  };
  jawaban_count: number;
  created_at: number;
}