<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientProcess extends Model
{
  use HasFactory;

  protected $table = 'client_process';
  protected $primaryKey = null;
  public $incrementing = false;
  public $timestamps = false;

  public function process()
  {
    return $this->hasOne(Process::class, 'process_id', 'id');
  }

  public function client()
  {
    return $this->hasOne(Client::class, 'client_id', 'id');
  }
}
