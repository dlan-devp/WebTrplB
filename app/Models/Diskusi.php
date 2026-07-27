<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diskusi extends Model
{
    protected $table = 'tb_diskusi';

    protected $primaryKey = 'id';
    protected $casts = [
        'tags' => 'array',
    ];

    protected $fillable = [
        'authorId',
        'judul',
        'isi',
        'kategori',
        'tags',
        'votes',
        'userVote',
        'views',
        'jawabanTerbaikId',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'authorId', 'id');
    }

    public function jawaban(){
        return $this->hasMany(jawabanDiskusi::class, 'postId', 'id');
    }

    public function vote()
    {
        return $this->hasMany(VoteDiskusi::class, 'postId');
    }
}
