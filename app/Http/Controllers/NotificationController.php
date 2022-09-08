<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request)
  {
    $tasks = $request->tasks;
    $events = $request->events;

    $user = User::find(Auth::user()->id);
    $user->tasks_notification = $tasks;
    $user->events_notification = $events;
    $user->save();

    return redirect()->back();
  }
}
