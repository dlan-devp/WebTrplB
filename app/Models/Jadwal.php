<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;
    protected $table = "tb_jadwal";
    protected $primaryKey = 'id';
    protected $fillable = ['matkul', 'hari', 'waktu', 'dosen', 'ruang', 'type'];
}
