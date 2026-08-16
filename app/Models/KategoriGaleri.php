<?php

namespace App\Models;

use App\Models\Galeri;
use Illuminate\Database\Eloquent\Model;

class KategoriGaleri extends Model
{
    protected $table = 'tb_kategoriGaleri';

    protected $fillable = ['nama'];

    public function galeri()
    {
        return $this->hasMany(Galeri::class, 'kategori_id');
    }
}
