<?php

namespace Database\Seeders;

use App\Models\Addres;
use Illuminate\Database\Seeder;

class AddresSeeder extends Seeder
{
  public function run()
  {
    if (app()->environment('local')) {
      Addres::truncate();

      Addres::factory(20)->create();
    }
  }
}
