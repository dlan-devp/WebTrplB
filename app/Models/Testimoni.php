<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimoni extends Model
{
    use HasFactory;
    protected $table = "tb_testimoni";
    protected $primaryKey = 'id';
    protected $fillable = ['nama', 'type', 'deskripsi'];
}
