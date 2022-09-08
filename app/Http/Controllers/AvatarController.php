<?php

namespace App\Http\Controllers;

use App\Models\Avatar;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AvatarController extends Controller
{
  public function show()
  {
    $avatar = Auth::user()->avatar;
    $url = null;

    try {
      $url = Storage::temporaryUrl('avatars/' . $avatar->path, now()->addDays(1));
    } catch (Exception $e) {
      $url = asset('images/avatar/user.svg');
    }

    return redirect()->to($url);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $file = $request->file('avatar');

    $filecode = (string) Str::uuid();
    $filename_encrypted = $filecode . '.' . $file->getClientOriginalExtension();
    $file->storeAs('avatars', $filename_encrypted);

    $avatar = new Avatar([
      'path' => $filename_encrypted,
    ]);
    $avatar->save();

    $user = $request->user();
    $user->avatar_id = $avatar->id;
    $user->save();

    return redirect()->back();
  }
}
