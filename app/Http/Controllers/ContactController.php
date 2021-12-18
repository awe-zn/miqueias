<?php

namespace App\Http\Controllers;

use App\Mail\ContactRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
  public function store(Request $request)
  {
    $input = (object) Validator::make($request->all(), [
      'name' => ['required', 'string'],
      'email' => ['required', 'email'],
      'subject' => ['required', 'string'],
      'message' => ['required', 'string'],
    ])->validate();

    Mail::to(env('MAIL_CONTACT'))->send(new ContactRequest($input));

    return redirect()->route('home');
  }
}
