<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
  use HasFactory;

  protected $table = 'process';

  public function legal_instance()
  {
    return $this->hasOne(LegalInstance::class, 'id', 'legal_instance_id');
  }

  public function legal_court()
  {
    return $this->hasOne(LegalCourt::class, 'id', 'legal_court_id');
  }

  public function legal_forum()
  {
    return $this->hasOne(LegalForum::class, 'id', 'legal_forum_id');
  }

  public function office()
  {
    return $this->belongsTo(Office::class, 'id', 'office_id');
  }

  public function clients()
  {
    return $this->hasManyThrough(User::class, ClientProcess::class, 'process_id', 'id', 'id', 'client_id');
  }
}
