<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diskusi extends Model
{
    protected $table = 'tb_diskusi';

    protected $primaryKey = 'id';

    protected $fillable = [
        'authorId',
        'judul',
        'isi',
        'kategori',
        'tags',
        'votes',
        'userVote',
        'views',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'authorId', 'id');
    }

    public function jawaban(){
        return $this->hasMany(jawabanDiskusi::class, 'postId', 'id');
    }
}
