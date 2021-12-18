<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
  use HasFactory;

  public function state()
  {
    return $this->hasOne(State::class, 'id', 'state_oab');
  }

  public function users()
  {
    return $this->hasMany(User::class, 'office_id', 'id');
  }
}
