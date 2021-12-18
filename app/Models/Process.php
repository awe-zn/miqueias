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
    return $this->hasOne(LegalInstance::class, 'legal_instance_id', 'id');
  }

  public function legal_court()
  {
    return $this->hasOne(LegalCourt::class, 'legal_court_id', 'id');
  }

  public function legal_forum()
  {
    return $this->hasOne(LegalForum::class, 'legal_forum_id', 'id');
  }

  public function office()
  {
    return $this->belongsTo(Office::class, 'office_id', 'id');
  }
}
