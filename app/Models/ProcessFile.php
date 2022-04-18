<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcessFile extends Model
{
  use HasFactory;

  protected $table = 'process_files';

  protected $fillable = [
    'path',
    'mask',
    'process_id',
  ];

  public function process()
  {
    return $this->belongsTo(Process::class, 'process_id', 'id');
  }
}
