<?php

namespace App\Http\Controllers;

use App\Models\Office;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function index()
  {
    $officeId = auth()->user()->office->id;
    $office = Office::query()->where('id', $officeId)->with([
      'events' => function ($query) {
        $query->whereDate('starts_in', '>=', now())->with(['process'])->limit(3);
      },
      'process' => function ($query) {
        $query->where('concluded', false)->with(['legal_forum', 'clients'])->limit(4);
      },
      'tasks' => function ($query) {
        $startWeek = now()->startOfWeek(0);
        $endWeek = now()->endOfWeek(6);

        $query->whereBetween('schedule_at', [$startWeek, $endWeek])->limit(4);
      },
    ])->first();

    $events = $office->events;
    $process = $office->process;
    $tasks = $office->tasks;

    return Inertia::render('Dashboard', [
      'events' => $events,
      'process' => $process,
      'tasks' => $tasks,
    ]);
  }
}
