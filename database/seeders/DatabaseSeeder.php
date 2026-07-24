<?php

namespace Database\Seeders;

use App\Models\Jadwal;
use App\Models\Mahasiswa;
use App\Models\Pengumuman;
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
        $mahasiswa = [[
            'nama' => 'Monica Nova Yanti Marbun',
            'umur' => '19',
        ],[
            'nama' => 'Natasya Olivia Karlolina Pangaribuan',
            'umur' => '19',
        ],[
            'nama' => 'Muhammad Fadlan',
            'umur' => '19',
        ],[
            'nama' => 'Josendra Giraldo',
            'umur' => '19',
        ],[
            'nama' => 'I Gusti Ngurah Made Ardi Pratama',
            'umur' => '20',
        ],[
            'nama' => 'Belicia Benedicta Scotia Sitorus',
            'umur' => '21',
        ],[
            'nama' => 'Putu Sumitrayasa',
            'umur' => '19',
        ],[
            'nama' => 'Satriyo Seno Akbar',
            'umur' => '19',
        ],[
            'nama' => 'Berconi Jonatan Haloho',
            'umur' => '20',
        ],[
            'nama' => 'Daffa Dimaz Fahrezi Setiyawan',
            'umur' => '20',
        ],[
            'nama' => 'Farid Amjad Saputra',
            'umur' => '22',
        ],[
            'nama' => 'I Nyoman Redika Janu Putra',
            'umur' => '19',
        ],[
            'nama' => 'Ketut Restu Dinata',
            'umur' => '20',
        ],[
            'nama' => 'I Komang Wahyu Suputra',
            'umur' => '19',
        ],[
            'nama' => 'Luh Putu Bella Satri',
            'umur' => '20',
        ],[
            'nama' => 'Esha Sharlyn Putrinta Br Sembiring',
            'umur' => '19',
        ],[
            'nama' => 'I Gede Galang Kusuma Febryan',
            'umur' => '19',
        ],[
            'nama' => 'Ida Bagus Kade Surya Aditya Saputra',
            'umur' => '20',
        ],];

        Mahasiswa::insert($mahasiswa);
        Testimoni::factory(10)->create();
        Jadwal::factory(10)->create();
        Pengumuman::factory(10)->create();

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => 'admin111',
        ]);
    }
}
