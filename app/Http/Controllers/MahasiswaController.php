<?php

namespace App\Http\Controllers;

//use Illuminate\Http\Request;
use App\Models\Galeri;
use App\Models\Jadwal;
use App\Models\Mahasiswa;
use App\Models\Testimoni;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    public function index(){

        return Inertia::render('welcome', [
            'mahasiswa' => Mahasiswa::all(),
            'testimoni' => Testimoni::all(),
            'galeri' => Galeri::all(),
            'jadwal' => Jadwal::all(),
            'test' => 'mantap'
        ]);
    }
}
