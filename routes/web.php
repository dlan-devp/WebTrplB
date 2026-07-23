<?php

use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\TestimoniController;
use App\Http\Controllers\ForumController;
use Illuminate\Support\Facades\Route;


Route::get('/', [MahasiswaController::class, 'index'])->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/user-auth', [UserAuthController::class, 'index'])->name('userAuth');
});

Route::middleware('auth')->group(function () {
    Route::get('/testimoni', [TestimoniController::class, 'index'])->name('testimoni');
    Route::get('/forum', [ForumController::class, 'index'])->name('forum');

    Route::post('/testimoni', [MahasiswaController::class, 'store'])
        ->name('testimoni.store');
        
    Route::post('/testimoniPage', [TestimoniController::class, 'store'])
        ->name('testimoni.store');

    Route::put('/testimoni/{testimoni}', [TestimoniController::class, 'update'])->name('testimoni.update');
    
    Route::delete('/testimoni/{testimoni}', [TestimoniController::class, 'destroy'])->name('testimoni.destroy');
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/settings.php';
