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
        Schema::create('tb_jawabanDiskusi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('postId');
            $table->unsignedBigInteger('authorId');
            $table->text('isi');
            $table->integer('votes');
            $table->integer('userVote');
            $table->timestamps();


            $table->foreign('postId')->references('id')->on('tb_diskusi')->cascadeOnDelete();
            $table->foreign('authorId')->references('id')->on('users')->cascadeOnDelete();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jawaban_diskusis');
    }
};
