<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProcessRequest;
use App\Models\ClientProcess;
use App\Models\LegalCourt;
use App\Models\LegalForum;
use App\Models\LegalInstance;
use App\Models\Process;
use App\Models\ProcessFile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

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
  public function store(StoreProcessRequest $request)
  {
    $validated = (object) $request->validated();

    $process = new Process;

    $process->title = $validated->title;
    $process->code = $validated->code;
    $process->legal_instance_id = $validated->legalInstanceId;
    $process->judgment = $validated->judgment;
    $process->legal_court_id = $validated->legalCourtId;
    $process->legal_forum_id = $validated->legalForumId;
    $process->action = $validated->action;
    $process->link = $validated->link;
    $process->description = $validated->description;
    $process->fee_cause = $validated->feeCause;
    $process->fee_condemnation = $validated->feeCondemnation;
    $process->fee_amount = $validated->feeAmount;
    $process->distributed_in = $validated->distributedIn;
    $process->observation_description = $validated->observationDescription;
    $process->public = $validated->public;
    $process->office_id = Auth::user()->office_id;
    $process->save();

    foreach ($validated->clientsId as $clientId) {
      $client_process = new ClientProcess;
      $client_process->process_id = $process->id;
      $client_process->client_id = $clientId;
      $client_process->save();
    }

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
    $process = Process::where(['id' => $id, 'office_id' => Auth::user()->office_id])->with(['clients', 'legal_instance', 'legal_court', 'legal_forum', 'office', 'tasks.task_priority', 'tasks.process', 'events.process', 'files'])->first();

    return Inertia::render('Process/Show', [
      'process' =>  $process,
      'id' => $id,
    ]);
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
  public function update(StoreProcessRequest $request, $id)
  {
    $process = Process::where(['id' => $id, 'office_id' => Auth::user()->office_id])->first();
    if (!$process) {
      return redirect()->route('process.index');
    }

    $validated = (object) $request->validated();

    $client_process = ClientProcess::where('process_id', $id)->get();
    foreach ($client_process as $cp) {
      $cp->delete();
    }

    $process->title = $validated->title;
    $process->code = $validated->code;
    $process->legal_instance_id = $validated->legalInstanceId;
    $process->judgment = $validated->judgment;
    $process->legal_court_id = $validated->legalCourtId;
    $process->legal_forum_id = $validated->legalForumId;
    $process->action = $validated->action;
    $process->link = $validated->link;
    $process->description = $validated->description;
    $process->fee_cause = $validated->feeCause;
    $process->fee_condemnation = $validated->feeCondemnation;
    $process->fee_amount = $validated->feeAmount;
    $process->distributed_in = $validated->distributedIn;
    $process->observation_description = $validated->observationDescription;
    $process->public = $validated->public;
    $process->save();

    foreach ($validated->clientsId as $clientId) {
      $client_process = new ClientProcess;
      $client_process->process_id = $process->id;
      $client_process->client_id = $clientId;
      $client_process->save();
    }

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
    // dd($id);

    $process = Process::where(['id' => $id, 'office_id' => Auth::user()->office_id])->first();
    if (!$process) {
      return redirect()->route('process.index');
    }

    $process->delete();

    return redirect()->route('process.index');
  }

  public function conclude($id)
  {
    $process = Process::where(['id' => $id, 'office_id' => Auth::user()->office_id])->first();
    if (!$process) {
      return redirect()->route('process.index');
    }

    $process->concluded = !$process->concluded;
    $process->save();

    return redirect()->back();
  }

  public function show_file($id)
  {
    $file = ProcessFile::where(['id' => $id])->with('process')->first();

    if ($file->process->office_id === Auth::user()->office_id) {
      return redirect()->to(Storage::temporaryUrl('process_files/' . $file->path, now()->addDays(5)));
    } else {
      return redirect()->route('process.index');
    }
  }

  public function store_file(Request $request, $id)
  {
    $file = $request->file;
    $filecode = (string) Str::uuid();
    $filename = $file->getClientOriginalName();
    $filename_encrypted = $filecode . '.' . $file->getClientOriginalExtension();
    $file->storeAs('process_files', $filename_encrypted);

    $file = new ProcessFile([
      'path' => $filename_encrypted,
      'mask' => $filename,
      'process_id' => $id,
    ]);
    $file->save();

    return redirect()->route('process.show', $id);
  }

  public function destroy_file()
  {
  }
}
