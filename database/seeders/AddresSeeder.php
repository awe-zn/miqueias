<?php

namespace Database\Seeders;

use App\Models\Addres;
use Illuminate\Database\Seeder;

class AddresSeeder extends Seeder
{
  public function run()
  {
    $users = array([
      "zip_code" => '59.610-280',
      "line_description" => "Av. Jerônimo Dix-Neuf Rosado",
      "number_addres" => '1357',
      "district" => 'Centro',
      "county_id" => 3198,
    ]);

    foreach ($users as $value) {
      $value = (object) $value;

      Addres::create([
        "zip_code" => $value->zip_code,
        "line_description" => $value->line_description,
        "number_addres" => $value->number_addres,
        "district" => $value->district,
        "county_id" => $value->county_id,
      ]);
    }

    if (app()->environment('local')) {
      Addres::factory(20)->create();
    }
  }
}
