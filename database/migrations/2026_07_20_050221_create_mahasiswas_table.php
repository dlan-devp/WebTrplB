<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_mahasiswa', function (Blueprint $table) {
            $table->id('kodeMahasiswa');
            $table->string('foto')->nullable();
            $table->string('nama');
            $table->integer('umur');
            $table->string('fakultas')->default('FTK');
            $table->string('jurusan')->default('Teknik Informatika');
            $table->string('prodi')->default('TRPL');
            $table->string('hobi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswas');
    }
};
