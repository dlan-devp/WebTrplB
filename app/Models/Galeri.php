<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Galeri extends Model
{
    protected $table = "tb_galeri";
    protected $primaryKey = 'id';
    protected $fillable = ['gambar', 'deskripsi'];
}
