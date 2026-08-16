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
        Schema::create('tb_galeri', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kategori_id')->nullable();
            $table->string('judul')->nullable();
            $table->json('gambar');
            $table->boolean('isFavorit')->nullable()->default(false);
            $table->text('deskripsi')->nullable();
            $table->string('ukuran')->default('landscape');
            $table->json('reaksi')->nullable();
            $table->string('reaksiSaya')->nullable();
            $table->timestamps();

            $table->foreign('kategori_id')->references('id')->on('tb_kategoriGaleri')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galeris');
    }
};
