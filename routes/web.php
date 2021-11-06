<?php

use App\Http\Controllers\CaseContactController;
use App\Http\Controllers\ContactController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return Inertia::render('Home');
})->name('home');
Route::get('/about', fn () => Inertia::render('About'))->name('about');
Route::post('/contact', [ContactController::class, 'store'])->name('contact');
Route::post('/case/contact', [CaseContactController::class, 'store'])->name('case.contact');
