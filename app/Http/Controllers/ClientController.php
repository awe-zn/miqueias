<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
  public function index()
  {
    $clients = User::query()->where('role', 'client')->where('office_id', auth()->user()->office_id)->get(['name', 'phone_number', 'email', 'id']);

    return Inertia::render('Clients', ['clients' => $clients]);
  }
}
