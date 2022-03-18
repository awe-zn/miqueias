<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
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
  public function store(StoreEventRequest $request)
  {
    $validated = (object) $request->validated();

    $event = new Event;

    $event->title = $validated->title;
    $event->description = $validated->description;
    $event->process_id = $validated->processId;
    $event->starts_in = $validated->startsIn;
    $event->ends_at = $validated->endsAt;

    $event->save();

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
  public function update(StoreEventRequest $request, $id)
  {
    $event = Event::find($id);

    if (!$event) return redirect()->route('home');

    $validated = (object) $request->validated();

    $event->title = $validated->title;
    $event->description = $validated->description;
    $event->process_id = $validated->processId;
    $event->starts_in = $validated->startsIn;
    $event->ends_at = $validated->endsAt;

    $event->save();

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
    $event = Event::find($id);

    if (!$event) return redirect()->route('home');

    $event->delete();

    return redirect()->route('calendar.index');
  }
}
