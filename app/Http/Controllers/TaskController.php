<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    //
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
  public function store(StoreTaskRequest $request)
  {
    $validated = (object) $request->validated();

    $task = new Task;

    $task->title = $validated->title;
    $task->description = $validated->description;
    $task->process_id = $validated->processId;
    $task->schedule_at = $validated->date;
    $task->task_priority_id = $validated->priorityId;

    $task->save();

    return redirect()->route('calendar.index');
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
  public function update(StoreTaskRequest $request, $id)
  {
    $task = Task::find($id);

    if (!$task) return redirect()->route('home');

    $validated = (object) $request->validated();

    $task->title = $validated->title;
    $task->description = $validated->description;
    $task->process_id = $validated->processId;
    $task->schedule_at = $validated->date;
    $task->task_priority_id = $validated->priorityId;

    $task->save();

    return redirect()->route('calendar.index');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $task = Task::find($id);

    if (!$task) return redirect()->route('home');

    $task->delete();

    return redirect()->route('calendar.index');
  }
}
