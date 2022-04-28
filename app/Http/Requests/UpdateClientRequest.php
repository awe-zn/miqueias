<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
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
      'phoneNumber' => ['required', 'max:64', 'string'],
      'zipCode' => ['required', 'size:8', 'string'],
      'lineDescription' => ['required', 'max:64', 'string'],
      'numberAddress' => ['required', 'max:8', 'string'],
      'district' => ['required', 'max:64', 'string'],
      'countyId' => ['required', 'max:64', 'string', 'exists:counties,id'],
    ];
  }
}
