<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    use HasFactory;
    protected $table = "tb_pengumuman";
    protected $primaryKey = 'id';
    protected $fillable = ['judul', 'isi', 'tanggal', 'urgensi'];

}
