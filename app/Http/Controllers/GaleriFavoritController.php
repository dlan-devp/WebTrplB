<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use App\Models\GaleriFavorit;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;

class GaleriFavoritController extends Controller
{
    public function toggle(Galeri $galeri): RedirectResponse
    {
        $userId = auth()->id();

        $favorit = GaleriFavorit::where('userId', $userId)
            ->where('galeriId', $galeri->id)
            ->first();

        if ($favorit) {
            $favorit->delete();
        } else {
            GaleriFavorit::create([
                'userId' => $userId,
                'galeriId' => $galeri->id,
            ]);
        }

        return back();
    }
}
