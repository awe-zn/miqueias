<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Addres extends Model
{
  use HasFactory;

  protected $table = 'adresses';

  public function county()
  {
    return $this->belongsTo(County::class);
  }
}
