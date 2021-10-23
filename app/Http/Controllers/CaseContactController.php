<?php

namespace App\Http\Controllers;

use App\Mail\CaseContact;
use App\Mail\CaseUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class CaseContactController extends Controller
{
  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $input = (object) Validator::make($request->all(), [
      'sector' => ['required', 'string'],
      'typeEntityCase' => ['required', 'string'],
      'typeEntityUser' => ['required', 'string'],
      'nameCase' => ['required', 'string'],
      'messageCase' => ['required', 'string'],
      'nameUser' => ['required', 'string'],
      'emailUser' => ['required', 'string'],
      'phoneUser' => ['required', 'string'],
      'attachFiles' => ['array'],
      'attachFiles.*' => ['file'],
    ])->validate();

    $input->typeEntityCase = $input->typeEntityCase === 'legal-person' ? 'Pessoa Jurídica' : 'Pessoa Física';
    $input->typeEntityUser = $input->typeEntityUser === 'legal-person' ? 'Pessoa Jurídica' : 'Pessoa Física';

    Mail::to(env('MAIL_CONTACT'))->send(new CaseContact($input));
    Mail::to($input->emailUser)->send(new CaseUser());

    return redirect()->route('home');
  }
}
