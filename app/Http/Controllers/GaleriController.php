<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class GaleriController extends Controller
{
    public function index()
    {
        return Inertia::render('GaleriPage');
    }
}
