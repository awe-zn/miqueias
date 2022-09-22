<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
  public function run()
  {
    $faker = Factory::create();

    $users = array([
      'name' => 'Miqueias Costa',
      'email' => 'miqueiascostaadv@gmail.com',
      'password' => Hash::make('LlCsU1NrZX'),
      'phone_number' => '84 99822-9875',
      'role' => 'advocate',
      'addres_id' => 1,
      'office_id' => 1,
    ], [
      'name' => 'Daniel Souza',
      'email' => 'daniel@email.com',
      'password' => Hash::make('password'),
      'phone_number' => $faker->phoneNumber(),
      'role' => 'advocate',
      'addres_id' => 1,
      'office_id' => app()->environment('local') ? 2 : 1,
    ]);

    foreach ($users as $value) {
      $value = (object) $value;

      User::create([
        'name' => $value->name,
        'email' => $value->email,
        'password' => $value->password,
        'phone_number' => $value->phone_number,
        'role' => $value->role,
        'addres_id' => $value->addres_id,
        'office_id' => $value->office_id,
      ]);
    }

    if (app()->environment('local')) {
      User::factory(20)->create();
    }
  }
}
