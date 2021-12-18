<?php

namespace Database\Seeders;

use App\Models\Addres;
use Illuminate\Database\Seeder;

class AddresSeeder extends Seeder
{
  public function run()
  {
    Addres::truncate();

    Addres::factory(20)->create();
  }
}
