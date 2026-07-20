<?php

namespace Database\Factories;

use App\Models\Mahasiswa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Mahasiswa>
 */
class MahasiswaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'nama' => fake()->name(),
        'umur' => fake()->numberBetween(18, 25),
        'fakultas' => 'FTK',
        'jurusan' => 'Teknik Informatika',
        'prodi' => fake()->randomElement(['TRPL', 'SI', 'TI']),
        'hobi' => fake()->word(),
        
        ];

    }
}
