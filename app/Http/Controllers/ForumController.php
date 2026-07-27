<?php

namespace App\Http\Controllers;

use App\Models\balasanJawaban;
use App\Models\Diskusi;
use App\Models\jawabanDiskusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ForumController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('ForumPage', [
            
            'diskusi' => Diskusi::with(['user', 'jawaban.user', 'jawaban.balasan.user'])->get(),
            'jawaban' => jawabanDiskusi::all(),
            'balasan' => balasanJawaban::all(),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ] : null,
            ],
        ]);

    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string',
            'isi' => 'required|string',
            'kategori' => 'required|in:Tugas,Proyek',
            'tags' => 'nullable|array',
        ]);

        Diskusi::create([
            'authorId' => Auth::id(),
            'judul' => $request->judul,
            'isi' => $request->isi,
            'kategori' => $request->kategori,
            'tags' => $request->tags,
        ]);

        return redirect()->back();
    }

    public function storeJawaban(Request $request)
    {
        $validated = $request->validate([
            'postId' => ['required', 'exists:tb_diskusi,id'],
            'isi' => ['required', 'string'],
        ]);

        jawabanDiskusi::create([
            'postId' => $validated['postId'],
            'authorId' => auth()->id(),
            'isi' => $validated['isi'],
            'votes' => 0,
            'userVote' => 0,
        ]);

        return back();
    }

    public function update(Request $request, Diskusi $diskusi)
    {
        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'isi' => ['required', 'string'],
        ]);

        $diskusi->update($validated);

        return redirect()->back();
    }

    
    public function storeBalasan(Request $request, jawabanDiskusi $jawaban)
    {
        $validated = $request->validate([
            'isi' => ['required', 'string'],
        ]);

        balasanJawaban::create([
            'postId' => $jawaban->postId,
            'jawabanId' => $jawaban->id,
            'authorId' => auth()->id(),
            'isi' => $validated['isi'],
        ]);

        return redirect()->back();
    }

    public function tandaiJawabanTerbaik(Diskusi $diskusi, jawabanDiskusi $jawaban) {

        // Pastikan jawaban memang milik diskusi tersebut
        if ($jawaban->postId !== $diskusi->id) {
            abort(404);
        }

        // Pastikan hanya pemilik diskusi yang boleh menandai
        if ($diskusi->authorId !== auth()->id()) {
            abort(403);
        }

        $diskusi->update([
        'jawabanTerbaikId' =>
            $diskusi->jawabanTerbaikId === $jawaban->id
                ? null
                : $jawaban->id,
        ]);

        return back();
    }
}
