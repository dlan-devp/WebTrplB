<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class jawabanDiskusi extends Model
{
    protected $table = 'tb_jawabanDiskusi';

    protected $primaryKey = 'id';

    protected $fillable = [
        'postId',
        'authorId',
        'isi',
        'votes',
        'userVote',
    ];

    public function diskusi(){
        return $this->belongsTo(Diskusi::class, 'postId', 'id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'authorId', 'id');
    }

    public function balasan(){
        return $this->hasMany(balasanJawaban::class, 'jawabanId', 'id');
    }
}
