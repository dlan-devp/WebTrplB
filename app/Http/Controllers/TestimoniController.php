<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TestimoniController extends Controller
{
    public function index()
    {
        return Inertia::render('TestimoniPage');
    }
}
