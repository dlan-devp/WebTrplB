<?php

namespace Database\Seeders;

use App\Models\Jadwal;
use App\Models\Mahasiswa;
use App\Models\Testimoni;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Mahasiswa::factory(10)->create();
        Testimoni::factory(10)->create();
        Jadwal::factory(10)->create();

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => 'admin111',
        ]);
    }
}
