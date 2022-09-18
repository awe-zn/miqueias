<?php

use App\Http\Controllers\AdvocateController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\CaseContactController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CountyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Route::inertia('/about', 'About')->name('about');
// Route::inertia('/action', 'Action')->name('action');
// Route::inertia('/terms', 'Terms')->name('terms');
// Route::inertia('/privacy', 'Privacy')->name('privacy');

Route::post('/contact', [ContactController::class, 'store'])->name('contact');
Route::post('/case/contact', [CaseContactController::class, 'store'])->name('case.contact');

Route::middleware('guest')->group(function () {
  Route::get('/login', [LoginController::class, 'create'])->name('login');

  Route::get('/', function () {
    return redirect()->route('login');
  })->name('homesite');
});

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
  Route::get('/', function () {
    return redirect()->route('home');
  })->name('homesite');

  Route::middleware(['password.notrenewed'])->group(function () {
    Route::put('/renew-password', [ProfileController::class, 'renew_password'])->name('renew-password');
    Route::inertia('/renew-password', 'Auth/RenewPassword')->name('renew-password');
  });

  Route::middleware(['password.renewed'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('home');
    Route::prefix('/profile')->name('profile.')->group(function () {
      Route::get('/', [ProfileController::class, 'index'])->name('index');
      Route::put('/identification', [ProfileController::class, 'update_identification'])->name('identification');
      Route::put('/office', [ProfileController::class, 'update_office'])->name('office');
      Route::post('/avatar', [AvatarController::class, 'store'])->name('avatar');
      Route::get('/avatar', [AvatarController::class, 'show'])->name('avatar');
      Route::put('/notifications', [NotificationController::class, 'update'])->name('notifications');
    });
    Route::prefix('/process')->name('process.')->group(function () {
      Route::get('/', [ProcessController::class, 'index'])->name('index');
      Route::get('/create', [ProcessController::class, 'create'])->name('create');
      Route::post('/', [ProcessController::class, 'store'])->name('store');
      Route::get('/{id}', [ProcessController::class, 'show'])->name('show');
      Route::put('/{id}', [ProcessController::class, 'update'])->name('update');
      Route::get('/edit/{id}', [ProcessController::class, 'edit'])->name('edit');
      Route::delete('/{id}', [ProcessController::class, 'destroy'])->name('destroy');
      Route::put('/conclude/{id}', [ProcessController::class, 'conclude'])->name('conclude');

      Route::prefix('/files')->name('files.')->group(function () {
        Route::get('/{id}', [ProcessController::class, 'show_file'])->name('show');
        Route::post('/{id}', [ProcessController::class, 'store_file'])->name('store');
        Route::delete('/{id}', [ProcessController::class, 'destroy_file'])->name('destroy');
      });
    });
    Route::prefix('/task')->name('task.')->group(function () {
      Route::post('/', [TaskController::class, 'store'])->name('store');
      Route::put('/{id}', [TaskController::class, 'update'])->name('update');
      Route::put('/conclude/{id}', [TaskController::class, 'conclude'])->name('conclude');
      Route::delete('/{id}', [TaskController::class, 'destroy'])->name('delete');
    });
    Route::prefix('/event')->name('event.')->group(function () {
      Route::post('/', [EventController::class, 'store'])->name('store');
      Route::put('/{id}', [EventController::class, 'update'])->name('update');
      Route::delete('/{id}', [EventController::class, 'destroy'])->name('delete');
    });
    Route::middleware(['advocate'])->group(function () {
      Route::prefix('/calendar')->name('calendar.')->group(function () {
        Route::get('/', [CalendarController::class, 'index'])->name('index');
      });

      Route::prefix('/client')->name('client.')->group(function () {
        Route::get('/', [ClientController::class, 'index'])->name('index');
        Route::post('/', [ClientController::class, 'store'])->name('store');
        Route::put('/{id}', [ClientController::class, 'update'])->name('update');
      });

      Route::prefix('/advocate')->name('advocate.')->group(function () {
        Route::get('/', [AdvocateController::class, 'index'])->name('index');
        Route::post('/', [AdvocateController::class, 'store'])->name('store');
      });
    });
  });
});

Route::prefix('/county')->name('county.')->group(function () {
  Route::get('/{id}', [CountyController::class, 'show'])->name('show');
});

Route::get('/test', function () {
  $random = str_shuffle('abcdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ234567890!$%^&!$%^&');
  $password = substr($random, 0, 10);

  return view('mail.user-created', ['name' => 'Teste', 'password' => $password]);
});
