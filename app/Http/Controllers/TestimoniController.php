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
            'is_anonymous' => ['nullable', 'boolean'],
        ]);

        $validated['nama'] = ($validated['is_anonymous'] ?? false)
            ? $validated['nama']
            : ($request->user()?->name ?? $validated['nama']);

        $validated['is_anonymous'] = (bool) ($validated['is_anonymous'] ?? false);

        Testimoni::create($validated);

        return redirect('/testimoni');
    }
}
