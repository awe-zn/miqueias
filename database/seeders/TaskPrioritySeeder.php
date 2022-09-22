<?php

namespace Database\Seeders;

use App\Models\TaskPriority;
use Illuminate\Database\Seeder;

class TaskPrioritySeeder extends Seeder
{
  public function run()
  {
    $offices = array([
      "description" => "Alta",
    ], [
      "description" => "Média",
    ], [
      "description" => "Baixa",
    ]);

    foreach ($offices as $value) {
      $value = (object) $value;

      TaskPriority::create([
        "description" => $value->description,
      ]);
    }
  }
}
