<?php

use App\Models\User;

it('redirects guests to the login page when they visit the forum', function () {
    $response = $this->get(route('forum'));

    $response->assertRedirect(route('login'));
});

it('allows authenticated users to visit the forum page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('forum'));

    $response->assertOk();
});
