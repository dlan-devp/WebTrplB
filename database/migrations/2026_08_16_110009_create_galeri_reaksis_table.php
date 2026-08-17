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
        Schema::create('tb_galeriReaksi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userId');
            $table->unsignedBigInteger('galeriId');
            $table->string('emoji');
            $table->timestamps();

            $table->foreign('userId')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('galeriId')->references('id')->on('tb_galeri')->cascadeOnDelete();

            $table->unique(['userId', 'galeriId']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_galeriReaksi');
    }
};
