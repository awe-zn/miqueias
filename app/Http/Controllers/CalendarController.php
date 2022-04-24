<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Office;
use App\Models\Process;
use App\Models\Task;
use App\Models\TaskPriority;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CalendarController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $process = Process::where(['office_id' => Auth::user()->office_id])->get();
    $task_priority = TaskPriority::all();

    $officeId = auth()->user()->office->id;
    $office = Office::query()->where('id', $officeId)->with([
      'events.process',
      'tasks' => function ($query) {
        $query->with(['task_priority', 'process']);
      },
    ])->first();

    $tasks = $office->tasks;
    $events = $office->events;

    return Inertia::render('Calendar', [
      'process' => $process,
      'task_priority' => $task_priority,
      'events' => $events,
      'tasks' => $tasks,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    //
  }
}
