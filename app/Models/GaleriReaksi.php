<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GaleriReaksi extends Model
{
    protected $table = 'tb_galeriReaksi';
 
    protected $fillable = ['userId', 'galeriId', 'emoji'];
 
    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }
 
    public function galeri()
    {
        return $this->belongsTo(Galeri::class, 'galeriId');
    }

}
