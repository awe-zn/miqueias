<?php

namespace App\Console;

use App\Mail\UserSchedule;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Mail;

class Kernel extends ConsoleKernel
{
  /**
   * The Artisan commands provided by your application.
   *
   * @var array
   */
  protected $commands = [
    //
  ];

  /**
   * Define the application's command schedule.
   *
   * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
   * @return void
   */
  protected function schedule(Schedule $schedule)
  {
    $schedule->call(function () {
      $users = User::query()->where('tasks_notification', true)->orWhere('events_notification', true)->get();

      foreach ($users as $user) {
        $user->events = [];
        $user->tasks = [];


        if ($user->events_notification) {
          $events = $user->office->events->whereBetween('starts_in', [Carbon::now(), Carbon::now()->addDay()]);

          $user->events = $events;
        }
        if ($user->tasks_notification) {
          $tasks = $user->office->tasks->where('schedule_at', now()->format('Y-m-d'));

          $user->tasks = $tasks;
        }

        Mail::to($user->email)->send(new UserSchedule($user));
      }
    })->everyMinute();
  }

  /**
   * Register the commands for the application.
   *
   * @return void
   */
  protected function commands()
  {
    $this->load(__DIR__ . '/Commands');

    require base_path('routes/console.php');
  }
}
