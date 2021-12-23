<?php

namespace Database\Seeders;

use App\Models\LegalInstance;
use Illuminate\Database\Seeder;

class LegalInstanceSeeder extends Seeder
{
  public function run()
  {
    $legal_instances = array('1ª instância', '2ª instância');

    foreach ($legal_instances as $legal_instance) {
      LegalInstance::create([
        'name' => $legal_instance
      ]);
    }
  }
}
