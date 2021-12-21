<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  public function run()
  {
    // \App\Models\User::factory(10)->create();
    $this->call([
      StateSeeder::class,
      CountySeeder::class,
      AddresSeeder::class,
      OfficeSeeder::class,
      UserSeeder::class,
      LegalCourtSeeder::class,
      LegalInstanceSeeder::class,
      LegalForumSeeder::class,
    ]);
  }
}
