<?php

namespace Database\Seeders;

use App\Models\State;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class StateSeeder extends Seeder
{
  public function run()
  {
    $json = File::get(database_path('json/federative_units.json'));
    $federative_units = json_decode($json);

    foreach ($federative_units as $value) {
      State::create([
        'name' => $value->name,
        'code' => $value->code,
        'initials' => $value->initials,
      ]);
    }
  }
}
