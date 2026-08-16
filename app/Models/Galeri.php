<?php

namespace App\Models;

use App\Models\KategoriGaleri;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Galeri extends Model
{
    protected $table = "tb_galeri";
    protected $primaryKey = 'id';
    protected $fillable = ['gambar', 'deskripsi', 'judul', 'isFavorit', 'ukuran', 'kategori_id', 'reaksi', 'reaksiSaya'];

    protected static function booted(): void
    {
        static::deleting(function (Galeri $galeri) {
            Storage::disk('public')->delete($galeri->gambar);
        });
    }

    protected $casts = [
        'gambar' => 'array',
        'isFavorit' => 'boolean',
        'reaksi' => 'array',
    ];

    public function kategori()
    {
        return $this->belongsTo(KategoriGaleri::class, 'kategori_id');
    }

    public function favorit()
    {
         return $this->hasMany(GaleriFavorit::class, 'galeriId');
    }

    public function reaksi()
    {
        return $this->hasMany(GaleriReaksi::class, 'galeriId');
    }
}
