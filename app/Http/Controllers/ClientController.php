<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Mail\UserCreated;
use App\Models\Addres;
use App\Models\County;
use App\Models\State;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ClientController extends Controller
{
  public function index()
  {
    $clients = User::query()->where('role', 'client')->where('office_id', auth()->user()->office_id)->with('addres.county.state')->get(['name', 'phone_number', 'email', 'id', 'addres_id', 'role']);
    $states = State::query()->get(['name', 'code']);

    return Inertia::render('Clients/Index', ['clients' => $clients, 'states' => $states]);
  }

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
    $client->role = 'client';
    $client->addres_id = $addres->id;
    $client->office_id = auth()->user()->office_id;
    $client->password = bcrypt($password);
    $client->save();

    Mail::to($client->email)->send(new UserCreated($client->name, $password));

    return redirect()->route('client.index');
  }

  public function update(UpdateClientRequest $request, $id)
  {
    $input = (object) $request->validated();

    $client = User::query()->find($id);

    $emailIsEqual = $client->email === $request->email;
    if (!$emailIsEqual) {
      $userWithSameEmail = User::query()->where('email', $request->email)->first();

      if (!!$userWithSameEmail) {
        return redirect()->back()->withErrors(['email' => 'Este email já está sendo utilizado por outro usuário']);
      }
    }

    $client->name = $input->name;
    $client->email = $request->email;
    $client->phone_number = $input->phoneNumber;
    $client->save();

    $addres = Addres::query()->find($client->addres_id);
    $addres->zip_code = $input->zipCode;
    $addres->line_description = $input->lineDescription;
    $addres->number_addres = $input->numberAddress;
    $addres->district = $input->district;
    $addres->county_id = $input->countyId;
    $addres->save();

    return redirect()->route('client.index');
  }
}
