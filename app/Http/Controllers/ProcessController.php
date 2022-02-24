<?php

namespace App\Http\Controllers;

use App\Models\ClientProcess;
use App\Models\LegalCourt;
use App\Models\LegalForum;
use App\Models\LegalInstance;
use App\Models\Process;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProcessController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $process = Process::with(['clients', 'legal_forum'])->get();

    return Inertia::render('Process/Index', [
      'process' => $process,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create(Request $request)
  {
    $legal_courts = LegalCourt::all();
    $legal_forums = LegalForum::all();
    $legal_instances = LegalInstance::all();
    $clients = User::where(['role' => 'client', 'office_id' => Auth::user()->office_id])->get();


    return Inertia::render('Process/Create', [
      'legal_courts' => $legal_courts,
      'legal_forums' => $legal_forums,
      'legal_instances' => $legal_instances,
      'clients' => $clients,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $process = new Process;
    $client_process = new ClientProcess;

    $process->title = $request->title;
    $process->code = $request->code;
    $process->legal_instance_id = $request->legalInstanceId;
    $process->judgment = $request->judgment;
    $process->legal_court_id = $request->legalCourtId;
    $process->legal_forum_id = $request->legalForumId;
    $process->action = $request->action;
    $process->link = $request->link;
    $process->description = $request->description;
    $process->fee_cause = $request->feeCause;
    $process->fee_condemnation = $request->feeCondemnation;
    $process->fee_amount = $request->feeAmount;
    $process->distributed_in = $request->distributedIn;
    $process->observation_description = $request->observationDescription;
    $process->public = $request->public;
    $process->office_id = Auth::user()->office_id;
    $process->save();

    $client_process->process_id = $process->id;
    $client_process->client_id = $request->clientId;
    $client_process->save();

    return redirect()->route('process.index');
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
    $process = Process::where(['id' => $id, 'office_id' => Auth::user()->office_id])->with('clients')->first();
    if (!$process) {
      return redirect()->route('process.index');
    }

    $legal_courts = LegalCourt::all();
    $legal_forums = LegalForum::all();
    $legal_instances = LegalInstance::all();
    $clients = User::where(['role' => 'client', 'office_id' => Auth::user()->office_id])->get();

    return Inertia::render('Process/Edit', [
      'legal_courts' => $legal_courts,
      'legal_forums' => $legal_forums,
      'legal_instances' => $legal_instances,
      'clients' => $clients,
      'process' => $process,
    ]);
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
    $process = Process::where(['id' => $id, 'office_id' => Auth::user()->office_id])->first();
    if (!$process) {
      return redirect()->route('process.index');
    }

    $client_process = ClientProcess::where(['process_id' => $id])->first();

    $process->title = $request->title;
    $process->code = $request->code;
    $process->legal_instance_id = $request->legalInstanceId;
    $process->judgment = $request->judgment;
    $process->legal_court_id = $request->legalCourtId;
    $process->legal_forum_id = $request->legalForumId;
    $process->action = $request->action;
    $process->link = $request->link;
    $process->description = $request->description;
    $process->fee_cause = $request->feeCause;
    $process->fee_condemnation = $request->feeCondemnation;
    $process->fee_amount = $request->feeAmount;
    $process->distributed_in = $request->distributedIn;
    $process->observation_description = $request->observationDescription;
    $process->public = $request->public;
    $process->save();

    $client_process->client_id = $request->clientId;
    $client_process->save();

    return redirect()->route('process.index');
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
