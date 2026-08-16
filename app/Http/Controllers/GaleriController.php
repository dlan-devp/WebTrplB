<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use Inertia\Inertia;

class GaleriController extends Controller
{
    public function index()
    {
        $galeri = Galeri::with('kategori')->latest()->get();

        return Inertia::render('GaleriPage', [
            'galeri' => $galeri,
        ]);
    }
}
