<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authenticated user can submit anonymous testimony with editable display name', function () {
    $user = User::factory()->create(['name' => 'Rani Putri']);

    $response = $this->actingAs($user)->post(route('testimoni.store'), [
        'nama' => 'Rani Putri',
        'type' => 'Pendapat',
        'deskripsi' => 'Kelas sangat bagus',
        'is_anonymous' => true,
    ]);

    $response->assertRedirect(route('testimoni'));

    $this->assertDatabaseHas('tb_testimoni', [
        'nama' => 'Rani Putri',
        'type' => 'Pendapat',
        'deskripsi' => 'Kelas sangat bagus',
        'is_anonymous' => true,
    ]);
});
