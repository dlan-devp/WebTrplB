<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VoteDiskusi extends Model
{
    protected $table = 'tb_voteDiskusi';
    protected $primaryKey = 'id';

    protected $fillable = [
        'authorId',
        'postId',
        'value',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'authorId');
    }

    public function diskusi()
    {
        return $this->belongsTo(Diskusi::class, 'postId');
    }
}
