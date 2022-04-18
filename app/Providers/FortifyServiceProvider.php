<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\LogoutResponse;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\Http\Responses\PasswordUpdateResponse;

class FortifyServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   *
   * @return void
   */
  public function register()
  {
    $this->app->instance(LogoutResponse::class, new class implements LogoutResponse
    {
      public function toResponse($request)
      {
        return redirect()->route('login');
      }
    });
  }

  /**
   * Bootstrap any application services.
   *
   * @return void
   */
  public function boot()
  {
    Fortify::createUsersUsing(CreateNewUser::class);
    Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
    Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
    Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

    RateLimiter::for('login', function (Request $request) {
      return Limit::perMinute(600)->by($request->email . $request->ip());
    });
    Fortify::resetPasswordView(function () {
      return Inertia::render('Auth/RecoveryPassword', ['request' => ['email' => request()->email, 'token' => request()->route('token')]]);
    });
  }
}
