<?php

namespace Database\Factories;

use App\Models\Jadwal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Jadwal>
 */
class JadwalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'matkul' => fake()->name(),
            'hari' => fake()->randomElement(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']),
            'waktu' => 'ABC',
            'dosen' => fake()->name(),
            'ruang' => fake()->lexify('room-?-#'),
            'type' => fake()->randomElement(['Teori', 'Praktikum']),
        ];
    }
}
