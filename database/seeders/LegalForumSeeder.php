<?php

namespace Database\Seeders;

use App\Models\LegalForum;
use Illuminate\Database\Seeder;

class LegalForumSeeder extends Seeder
{
  public function run()
  {
    LegalForum::truncate();

    $legal_forums = array('Fórum Regional I');

    foreach ($legal_forums as $legal_forum) {
      LegalForum::create([
        'name' => $legal_forum
      ]);
    }
  }
}
