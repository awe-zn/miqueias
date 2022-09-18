<?php

namespace Database\Seeders;

use App\Models\County;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class CountySeeder extends Seeder
{
  public function run()
  {
    $json = File::get(database_path('json/counties.json'));
    $counties = json_decode($json);

    foreach ($counties as $value) {
      County::create([
        'name' => $value->name,
        'code' => $value->ibge_code,
        'state_code' => $value->uf_id,
      ]);
    }
  }
}
