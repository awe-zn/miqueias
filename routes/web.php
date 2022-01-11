<?php

use App\Http\Controllers\CaseContactController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProcessController;
use App\Mail\CaseContact;
use App\Mail\CaseUser;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Home')->name('homesite');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/action', 'Action')->name('action');

Route::post('/contact', [ContactController::class, 'store'])->name('contact');
Route::post('/case/contact', [CaseContactController::class, 'store'])->name('case.contact');

Route::middleware('guest')->group(function () {
  Route::get('/login', [LoginController::class, 'create'])->name('login');
});

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
  Route::inertia('/dashboard', 'Dashboard')->name('home');
  Route::inertia('/profile', 'Profile')->name('profile');
  Route::prefix('/process')->name('process.')->group(function () {
    Route::get('/', [ProcessController::class, 'index'])->name('index');
    Route::get('/create', [ProcessController::class, 'create'])->name('create');
  });
  Route::get('/clients', [ClientController::class, 'index'])->name('client.index');
});
