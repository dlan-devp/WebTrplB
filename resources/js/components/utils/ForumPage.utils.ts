export function waktuRelatif(iso: string): string {
  const now = new Date('2026-07-23T12:00:00'); // referensi waktu "sekarang" untuk demo
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 1) return 'baru saja';
  if (diffMin < 60) return `${diffMin} menit lalu`;
  const diffJam = Math.round(diffMin / 60);
  if (diffJam < 24) return `${diffJam} jam lalu`;
  const diffHari = Math.round(diffJam / 24);
  if (diffHari === 1) return 'kemarin';
  if (diffHari < 7) return `${diffHari} hari lalu`;
  return then.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function buatId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
