<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\CaseContactController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CountyController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home')->name('homesite');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/action', 'Action')->name('action');
Route::inertia('/terms', 'Terms')->name('terms');
Route::inertia('/privacy', 'Privacy')->name('privacy');

Route::post('/contact', [ContactController::class, 'store'])->name('contact');
Route::post('/case/contact', [CaseContactController::class, 'store'])->name('case.contact');

Route::middleware('guest')->group(function () {
  Route::get('/login', [LoginController::class, 'create'])->name('login');
});

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
  Route::inertia('/dashboard', 'Dashboard')->name('home');
  Route::prefix('/profile')->name('profile.')->group(function () {
    Route::get('/', [ProfileController::class, 'index'])->name('index');
    Route::put('/identification', [ProfileController::class, 'update_identification'])->name('identification');
    Route::put('/office', [ProfileController::class, 'update_office'])->name('office');
  });
  Route::prefix('/process')->name('process.')->group(function () {
    Route::get('/', [ProcessController::class, 'index'])->name('index');
    Route::get('/create', [ProcessController::class, 'create'])->name('create');
    Route::post('/', [ProcessController::class, 'store'])->name('store');
    Route::get('/{id}', [ProcessController::class, 'show'])->name('show');
    Route::put('/{id}', [ProcessController::class, 'update'])->name('update');
    Route::get('/edit/{id}', [ProcessController::class, 'edit'])->name('edit');
  });
  Route::prefix('/task')->name('task.')->group(function () {
    Route::post('/', [TaskController::class, 'store'])->name('store');
    Route::put('/{id}', [TaskController::class, 'update'])->name('update');
    Route::delete('/{id}', [TaskController::class, 'destroy'])->name('delete');
  });
  Route::prefix('/event')->name('event.')->group(function () {
    Route::post('/', [EventController::class, 'store'])->name('store');
    Route::put('/{id}', [EventController::class, 'update'])->name('update');
    Route::delete('/{id}', [EventController::class, 'destroy'])->name('delete');
  });
  Route::prefix('/calendar')->name('calendar.')->group(function () {
    Route::get('/', [CalendarController::class, 'index'])->name('index');
  });
  Route::get('/clients', [ClientController::class, 'index'])->name('client.index');
});

Route::prefix('/county')->name('county.')->group(function () {
  Route::get('/{id}', [CountyController::class, 'show'])->name('show');
});
