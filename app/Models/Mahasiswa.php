<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    protected $table = "tb_mahasiswa";
    protected $primaryKey = 'kodeMahasiswa';
    protected $fillable = ['nama', 'umur', 'fakultas', 'jurusan', 'prodi', 'hobi'];
}
