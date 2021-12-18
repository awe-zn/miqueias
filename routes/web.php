<?php

use App\Http\Controllers\CaseContactController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LoginController;
use App\Models\Office;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Home');
})->name('homesite');

Route::get('/about', function () {
  return Inertia::render('About');
})->name('about');

Route::post('/contact', [ContactController::class, 'store'])->name('contact');
Route::post('/case/contact', [CaseContactController::class, 'store'])->name('case.contact');


Route::middleware('guest')->group(function () {
  Route::get('/login', [LoginController::class, 'create'])->name('login');
});


Route::middleware(['auth:sanctum', 'verified'])->group(function () {
  Route::inertia('/dashboard', 'Dashboard')->name('home');
  Route::inertia('/profile', 'Profile')->name('profile');
});
