<?php

use App\Models\User;

it('allows guests to browse the forum page in read-only mode', function () {
    $response = $this->get(route('forum'));

    $response->assertOk();
});

it('allows authenticated users to visit the forum page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('forum'));

    $response->assertOk();
});
