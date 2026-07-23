<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class UserAuthController extends Controller
{
    public function index()
    {
        return Inertia::render('AuthPage');
    }
}