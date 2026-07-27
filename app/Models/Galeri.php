<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Galeri extends Model
{
    protected $table = "tb_galeri";
    protected $primaryKey = 'id';
    protected $fillable = ['gambar', 'deskripsi'];

    protected static function booted(): void
    {
        static::deleting(function (Galeri $galeri) {
            Storage::disk('public')->delete($galeri->gambar);
        });
    }
}
