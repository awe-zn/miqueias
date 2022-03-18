<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  use HasFactory;

  public function process()
  {
    return $this->belongsTo(Process::class, 'process_id', 'id');
  }

  public function task_priority()
  {
    return $this->hasOne(TaskPriority::class, 'id', 'task_priority_id');
  }
}
