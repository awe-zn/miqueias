<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProcessRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'title' => ['required', 'string', 'max:64'],
      'code' => ['required', 'string', 'max:16'],
      'legalInstanceId' => ['required', 'numeric', 'exists:legal_instances,id'],
      'judgment' => ['required', 'string', 'max:32'],
      'legalCourtId' => ['required', 'numeric', 'exists:legal_courts,id'],
      'legalForum' => ['required', 'string'],
      'action' => ['required', 'string', 'max:64'],
      'link' => ['required', 'string', 'max:256', 'url'],
      'description' => ['required', 'string', 'max:256'],
      'feeCause' => ['required', 'numeric'],
      'feeCondemnation' => ['required', 'numeric'],
      'feeAmount' => ['required', 'numeric'],
      'distributedIn' => ['required', 'date'],
      'observationDescription' => ['required', 'string', 'max:128'],
      'public' => ['required', 'boolean'],
      'clientsId' => ['required', 'array'],
      'clientsId.*' => ['exists:users,id'],
    ];
  }
}
