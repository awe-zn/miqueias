<?php

namespace Database\Seeders;

use App\Models\LegalCourt;
use Illuminate\Database\Seeder;

class LegalCourtSeeder extends Seeder
{
  public function run()
  {
    LegalCourt::truncate();

    $legal_courts = array('Vara de infância e juventude', 'Vara da Fazenda Pública', 'Vara de família');

    foreach ($legal_courts as $legal_court) {
      LegalCourt::create([
        'name' => $legal_court
      ]);
    }
  }
}
