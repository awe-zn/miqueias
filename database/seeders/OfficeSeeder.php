<?php

namespace Database\Seeders;

use App\Models\Office;
use Illuminate\Database\Seeder;

class OfficeSeeder extends Seeder
{
  public function run()
  {
    if (app()->environment('local')) {
      Office::truncate();

      Office::factory(20)->create();
    }
  }
}
