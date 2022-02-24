<?php

namespace App\Http\Controllers;

use App\Models\Addres;
use App\Models\Office;
use App\Models\State;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $addres = Addres::with(['county' => function ($query) {
      $query->with('state');
    }])->find(Auth::user()->addres_id);
    $office = Office::find(Auth::user()->office_id);
    $states = State::all();

    return Inertia::render('Profile', [
      'addres' => $addres,
      'office' => $office,
      'states' => $states,
    ]);
  }

  public function update_identification(Request $request)
  {
    $user = User::find(Auth::id());
    $addres = Addres::find(Auth::user()->addres_id);

    $user->name = $request->name;
    $user->email = $request->email;
    $user->phone_number = $request->phoneNumber;
    $addres->zip_code = $request->zipCode;
    $addres->line_description = $request->lineDescription;
    $addres->number_addres = $request->numberAddres;
    $addres->district = $request->district;
    $addres->county_id = $request->countyId;

    $user->save();
    $addres->save();

    return redirect()->route('profile.index');
  }

  public function update_office(Request $request)
  {
    $office = Office::find(Auth::user()->office_id);

    $office->name = $request->name;
    $office->email = $request->email;
    $office->ccm = $request->ccm;
    $office->identification_document = $request->identificationDocument;
    $office->oab = $request->oab;
    $office->state_oab = $request->stateOab;

    $office->save();

    return redirect()->route('profile.index');
  }
}
