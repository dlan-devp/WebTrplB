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
        Schema::create('tb_diskusi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('authorId');
            $table->string('judul');
            $table->text('isi');
            $table->string('kategori');
            $table->string('tags')->nullable();
            $table->integer('votes')->nullable();
            $table->integer('userVote')->nullable();
            $table->integer('views')->nullable();
            $table->unsignedBigInteger('jawabanTerbaikId')->nullable();
            $table->timestamps();

            $table->foreign('authorId')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diskusis');
    }
};
