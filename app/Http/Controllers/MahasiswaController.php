<?php

namespace App\Http\Controllers;

//use Illuminate\Http\Request;
use App\Models\Mahasiswa;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    public function index(){

        return Inertia::render('welcome', [
            'mahasiswa' => Mahasiswa::all(),
            'test' => 'mantap'
        ]);
    }
}
