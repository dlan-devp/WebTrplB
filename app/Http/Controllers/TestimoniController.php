<?php

namespace App\Http\Controllers;

use App\Models\Testimoni;
use Inertia\Inertia;

class TestimoniController extends Controller
{
    public function index()
    {
        return Inertia::render('TestimoniPage', [
            'testimoni' => Testimoni::latest()->get(),
        ]);
    }
}
