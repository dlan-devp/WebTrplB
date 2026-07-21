<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = "tb_role";
    protected $primaryKey = 'kodeRole';
    protected $fillable = ['namaRole', 'deskripsi'];

    public function user(){
        return $this->hasMany(User::class, 'kodeRole', 'kodeRole');
    }
}
