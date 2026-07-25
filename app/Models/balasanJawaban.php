<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class balasanJawaban extends Model
{
    protected $table = 'tb_balasanJawaban';

    protected $primaryKey = 'id';

    protected $fillable = [
        'postId',
        'jawabanId',
        'authorId',
        'isi',
    ];

    public function jawaban(){
        return $this->belongsTo(jawabanDiskusi::class, 'jawabanId', 'id');
    }

    public function diskusi(){
        return $this->belongsTo(Diskusi::class, 'postId', 'id');
    }
    public function user(){
        return $this->belongsTo(user::class, 'authorId', 'id');
    }
}
