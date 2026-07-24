<?php

namespace Database\Factories;

use App\Models\Pengumuman;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Pengumuman>
 */
class PengumumanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul' => fake()->word(),
            'isi' => fake()->word(),
            'tanggal' => fake()->date('Y-m-d', 'now'),
            'urgensi' => fake()->randomElement(['Info', 'Penting', 'Deadline']),
        ];
    }
}
