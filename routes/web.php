<?php

use App\Http\Controllers\ForumController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\TestimoniController;
// use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\GaleriController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MahasiswaController::class, 'index'])->name('home');

Route::get('/galeri', [GaleriController::class, 'index'])->name('galeri');

Route::get('/testimoni', [TestimoniController::class, 'index'])->name('testimoni');

// forumpage
Route::get('/forum', [ForumController::class, 'index'])->name('forum');
Route::middleware(['auth', 'verified'])->group(function () {
Route::post('/forum', [ForumController::class, 'store'])
    ->name('forum.store');

// diskusi
Route::put('/forum/{diskusi}', [ForumController::class, 'update']);
Route::put('/forum/{diskusi}/jawabanTerbaik/{jawaban}', [ForumController::class, 'tandaiJawabanTerbaik'])->name('forum.jawaban-terbaik');

// jawaban dikusi
Route::post('/forumJawaban', [ForumController::class, 'storeJawaban']);
Route::post('/forumJawaban/{jawaban}/balasan', [ForumController::class, 'storeBalasan'])->name('forumJawaban.balasan.store');
Route::put('/forumJawaban/{jawaban}', [ForumController::class, 'updateJawaban'])
    ->middleware('auth');
Route::delete('/forumJawaban/{jawaban}', [ForumController::class, 'destroyJawaban'])
    ->middleware('auth');

// balasanjawaban
Route::put('/forum/{balasan}', [ForumController::class, 'updateBalasan'])
    ->middleware('auth');
Route::delete('/forum/{balasan}', [ForumController::class, 'destroyBalasan'])
    ->middleware('auth');


Route::put('/forum/{diskusi}/vote', [ForumController::class, 'vote'])
    ->name('forum.vote');
});

Route::middleware('auth')->group(function () {
    Route::middleware('verified')->group(function () {
    Route::post('/testimoni', [TestimoniController::class, 'store'])
        ->name('testimoniPage.store');

    Route::put('/testimoni/{testimoni}', [TestimoniController::class, 'update'])->name('testimoni.update');

    Route::delete('/testimoni/{testimoni}', [TestimoniController::class, 'destroy'])->name('testimoni.destroy');
    });
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/settings.php';
