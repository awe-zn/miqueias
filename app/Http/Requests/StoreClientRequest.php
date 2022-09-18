<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
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
      'name' => ['required', 'max:64', 'string'],
      'email' => ['required', 'max:64', 'string', 'email', 'unique:users,email'],
      'phoneNumber' => ['required', 'min:14', 'string'],
      'zipCode' => ['required', 'min:9', 'string'],
      'lineDescription' => ['required', 'max:64', 'string'],
      'numberAddress' => ['required', 'max:8', 'string'],
      'district' => ['required', 'max:64', 'string'],
      'countyId' => ['required', 'max:64', 'string', 'exists:counties,id'],
    ];
  }
}
