<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Mahasiswa extends Model
{
    use HasFactory;
    protected $table = "tb_mahasiswa";
    protected $primaryKey = 'kodeMahasiswa';
    protected $fillable = ['nama', 'umur', 'fakultas', 'jurusan', 'prodi', 'hobi', 'foto'];

    protected static function booted()
    {
        // Hapus file saat record dihapus
        static::deleting(function ($mahasiswa) {
            if ($mahasiswa->foto) {
                Storage::disk('public')->delete($mahasiswa->foto);
            }
        });

        // Hapus foto lama saat foto diganti
        static::updating(function ($mahasiswa) {
            if ($mahasiswa->isDirty('foto')) {

                $oldFoto = $mahasiswa->getOriginal('foto');

                if ($oldFoto) {
                    Storage::disk('public')->delete($oldFoto);
                }
            }
        });
    }
}
