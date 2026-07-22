<?php

namespace App\Http\Controllers;

use App\Models\Testimoni;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimoniController extends Controller
{
    public function index()
    {
        return Inertia::render('TestimoniPage', [
            'testimoni' => Testimoni::latest()->get(),
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

        return redirect('/testimoni');
    }
}
