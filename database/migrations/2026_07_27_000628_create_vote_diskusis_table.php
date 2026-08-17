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
        Schema::create('tb_voteDiskusi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('authorId');
            $table->unsignedBigInteger('postId');
            $table->tinyInteger('value');
            $table->unique(['authorId', 'postId']);
            $table->timestamps();

            $table->foreign('authorId')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('postId')->references('id')->on('tb_diskusi')->cascadeOnDelete();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_voteDiskusi');
    }
};
