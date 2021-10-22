<?php

namespace App\Http\Controllers;

use App\Mail\ContactRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    sleep(5);

    $input = (object) Validator::make($request->all(), [
      'name' => ['required', 'string'],
      'email' => ['required', 'email'],
      'subject' => ['required', 'string'],
      'message' => ['required', 'string'],
    ])->validate();

    Mail::to(env('MAIL_CONTACT'))->send(new ContactRequest());

    return redirect()->route('home')->with('x', 'x');
  }
}
