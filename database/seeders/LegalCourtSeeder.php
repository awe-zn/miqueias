<?php

namespace Database\Seeders;

use App\Models\LegalCourt;
use Illuminate\Database\Seeder;

class LegalCourtSeeder extends Seeder
{
  public function run()
  {
    $legal_courts = array('Vara de Infância e Juventude', 'Vara do Trabalho', 'Vara da Fazenda Pública', 'Vara Civel', 'Vara de Família', 'Vara Criminal', 'Vara do Juizado Especial Civel e Criminal');

    foreach ($legal_courts as $legal_court) {
      LegalCourt::create([
        'name' => $legal_court
      ]);
    }
  }
}
