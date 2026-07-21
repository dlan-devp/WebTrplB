<?php

use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\PublicAuthController;
use App\Http\Controllers\TestimoniController;
use Illuminate\Support\Facades\Route;


Route::get('/', [MahasiswaController::class, 'index'])->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/public-auth', [PublicAuthController::class, 'index'])->name('auth');
    Route::get('/testimoni', [TestimoniController::class, 'index'])->name('testimoni');
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/settings.php';
