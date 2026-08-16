<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use App\Models\GaleriReaksi;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;

class GaleriReaksiController extends Controller
{
    public function simpan(Request $request, Galeri $galeri): RedirectResponse
    {
        $request->validate([
            'emoji' => 'required|string|max:8',
        ]);

        $userId = auth()->id();

        $reaksi = GaleriReaksi::where('userId', $userId)
            ->where('galeriId', $galeri->id)
            ->first();

        if ($reaksi && $reaksi->emoji === $request->emoji) {
            // klik emoji yang sama = batalkan reaksi
            $reaksi->delete();
        } else {
            // belum ada reaksi, atau ganti ke emoji lain
            GaleriReaksi::updateOrCreate(
                ['userId' => $userId, 'galeriId' => $galeri->id],
                ['emoji' => $request->emoji]
            );
        }

        return back();
    }
}