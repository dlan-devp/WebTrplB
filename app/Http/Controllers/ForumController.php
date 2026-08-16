<?php

namespace App\Http\Controllers;

use App\Models\balasanJawaban;
use App\Models\Diskusi;
use App\Models\jawabanDiskusi;
use App\Models\VoteDiskusi;
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
                    'email_verified_at' => $user->email_verified_at,
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

    public function updateJawaban(Request $request, jawabanDiskusi $jawaban)
    {
        abort_unless($jawaban->authorId === auth()->id(), 403);

        $validated = $request->validate([
            'isi' => ['required', 'string'],
        ]);

        $jawaban->update([
            'isi' => $validated['isi'],
        ]);

        return back();
    }

    public function destroyJawaban(jawabanDiskusi $jawaban)
    {
        abort_unless($jawaban->authorId === auth()->id(), 403);

        $jawaban->delete();

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

    public function updateBalasan(Request $request, balasanJawaban $balasan)
    {
        abort_unless($balasan->authorId == auth()->id(), 403);

        $validated = $request->validate([
            'isi' => ['required', 'string'],
        ]);

        $balasan->update([
            'isi' => $validated['isi'],
        ]);

        return back();
    }

    public function destroyBalasan(balasanJawaban $balasan)
    {
        abort_unless($balasan->authorId === auth()->id(), 403);

        $balasan->delete();

        return back();
    }

    public function vote(Request $request, $id)
    {
        $request->validate([
            'value' => ['required', 'integer', 'in:-1,0,1'],
        ]);

        $diskusi = Diskusi::findOrFail($id);

        $voteLama = VoteDiskusi::where('authorId', auth()->id())
            ->where('postId', $diskusi->id)
            ->first();

        $nilaiBaru = $request->value;

        if (!$voteLama) {
            // User belum pernah vote
            if ($nilaiBaru !== 0) {
                VoteDiskusi::create([
                    'authorId' => auth()->id(),
                    'postId' => $diskusi->id,
                    'value' => $nilaiBaru,
                ]);

                $diskusi->increment('votes', $nilaiBaru);
            }
        } else {
            $nilaiLama = $voteLama->value;

            if ($nilaiBaru === 0) {
                // Membatalkan vote
                $voteLama->delete();

                $diskusi->decrement('votes', $nilaiLama);
            } else {
                // Mengubah vote
                $voteLama->update([
                    'value' => $nilaiBaru,
                ]);

                $diskusi->increment('votes', $nilaiBaru - $nilaiLama);
            }
        }

        return back();
    }
}
