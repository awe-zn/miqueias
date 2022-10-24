<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Mail\UserCreated;
use App\Models\State;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Addres;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AdvocateController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $clients = User::query()->where('role', 'advocate')->where('office_id', auth()->user()->office_id)->where('id', '!=', auth()->user()->id)->with('addres.county.state')->get(['name', 'phone_number', 'email', 'id', 'addres_id', 'role']);
    $states = State::query()->get(['name', 'code']);

    return Inertia::render('Advocates/Index', ['advocates' => $clients, 'states' => $states]);
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
  public function store(StoreClientRequest $request)
  {
    $input = (object) $request->validated();

    $addres = new Addres;
    $addres->zip_code = $input->zipCode;
    $addres->line_description = $input->lineDescription;
    $addres->number_addres = $input->numberAddress;
    $addres->district = $input->district;
    $addres->county_id = $input->countyId;
    $addres->save();

    $random = str_shuffle('abcdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ234567890!$%^&!$%^&');
    $password = substr($random, 0, 12);

    $client = new User;
    $client->name = $input->name;
    $client->email = $input->email;
    $client->phone_number = $input->phoneNumber;
    $client->role = 'advocate';
    $client->addres_id = $addres->id;
    $client->office_id = auth()->user()->office_id;
    $client->password = bcrypt($password);
    $client->save();

    Mail::to($client->email)->send(new UserCreated($client->name, $password));

    return redirect()->route('advocate.index');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $task = User::find($id);

    if (!$task) return redirect()->route('home');

    $task->delete();

    return redirect()->route('advocate.index');
  }
}
