<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    use HasFactory;
    protected $table = "tb_forum";
    protected $primaryKey = 'id';
    protected $fillable = ['judul', 'penulis', 'jumlahBalasan', 'waktu'];
}
