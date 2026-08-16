<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GaleriFavorit extends Model
{
    protected $table = 'tb_galeriFavorit';

    protected $fillable = ['userId', 'galeriId'];

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function galeri()
    {
        return $this->belongsTo(Galeri::class, 'galeriId');
    }
}
