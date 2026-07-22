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
            'testimoni' => Testimoni::with('user')->latest()->get(),
            'auth' => [
                'user' => auth()->user()?->only(['id', 'name', 'email']),
            ],
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
        $validated['user_id'] = $request->user()?->id;

        Testimoni::create($validated);

        return redirect('/testimoni');
    }

    public function update(Request $request, Testimoni $testimoni)
    {
        if ($request->user()?->id !== $testimoni->user_id) {
            abort(403);
        }

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

        $testimoni->update($validated);

        return redirect('/testimoni');
    }

    public function destroy(Request $request, Testimoni $testimoni)
    {
        if ($request->user()?->id !== $testimoni->user_id) {
            abort(403);
        }

        $testimoni->delete();

        return redirect('/testimoni');
    }
}
