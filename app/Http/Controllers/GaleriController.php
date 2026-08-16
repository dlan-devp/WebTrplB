<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use App\Models\GaleriFavorit;
use App\Models\GaleriReaksi;
use Inertia\Inertia;

class GaleriController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        $galeri = Galeri::with('kategori')
            ->latest()
            ->get()
            ->map(function ($item) use ($userId) {
                $reaksiPerEmoji = GaleriReaksi::where('galeriId', $item->id)
                    ->selectRaw('emoji, count(*) as jumlah')
                    ->groupBy('emoji')
                    ->pluck('jumlah', 'emoji');

                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'deskripsi' => $item->deskripsi,
                    'gambar' => $item->gambar,
                    'ukuran' => $item->ukuran,
                    'isFavorit' => $userId
                        ? GaleriFavorit::where('userId', $userId)
                            ->where('galeriId', $item->id)
                            ->exists()
                        : false,
                    'reaksi' => $reaksiPerEmoji,
                    'reaksiSaya' => $userId
                        ? GaleriReaksi::where('userId', $userId)
                            ->where('galeriId', $item->id)
                            ->value('emoji')
                        : null,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,
                    'kategori' => $item->kategori,
                ];
            });

        return Inertia::render('GaleriPage', [
            'galeri' => $galeri,
        ]);
    }
}