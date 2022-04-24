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

  public function events()
  {
    return $this->hasManyThrough(Event::class, Process::class, 'office_id', 'process_id', 'id', 'id');
  }

  public function tasks()
  {
    return $this->hasManyThrough(Task::class, Process::class, 'office_id', 'process_id', 'id', 'id');
  }

  public function process()
  {
    return $this->hasMany(Process::class, 'office_id', 'id');
  }
}
