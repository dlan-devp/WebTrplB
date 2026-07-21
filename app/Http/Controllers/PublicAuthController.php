<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PublicAuthController extends Controller
{
    public function index()
    {
        return Inertia::render('AuthPage');
    }
}