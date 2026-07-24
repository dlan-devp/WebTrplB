<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use App\Models\Jadwal;
use App\Models\Mahasiswa;
use App\Models\Pengumuman;
use App\Models\Testimoni;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    public function index(){

        return Inertia::render('welcome', [
            'mahasiswa' => Mahasiswa::all(),
            'testimoni' => Testimoni::latest()->get(),
            'galeri' => Galeri::all(),
            'jadwal' => Jadwal::all(),
            'pengumuman' => Pengumuman::latest()->get(),
            'test' => 'mantap'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:Pendapat,Saran,Kritik'],
            'deskripsi' => ['required', 'string'],
        ]);

        Testimoni::create($validated);

        return redirect('/#testimoni');
    }
}
