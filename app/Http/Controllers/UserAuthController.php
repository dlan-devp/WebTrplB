<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class UserAuthController extends Controller
{
    public function index()
    {
        return Inertia::render('AuthPage');
    }

    // AuthController.php
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Link reset terkirim.'])
            : response()->json(['message' => 'Email tidak ditemukan.'], 404);
    }

    public function showPage()
    {
        return Inertia::render('ForgotPassword');
    }
}