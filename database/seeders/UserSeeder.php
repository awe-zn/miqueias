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
      'email_verified_at' => now(),
      'password' => Hash::make('LlCsU1NrZX'),
      'remember_token' => Str::random(10),
      'phone_number' => '84 99822-9875',
      'role' => 'advocate',
      'addres_id' => 1,
      'office_id' => 1,
    ], [
      'name' => 'Daniel Souza',
      'email' => 'daniel@email.com',
      'email_verified_at' => now(),
      'password' => Hash::make('password'),
      'remember_token' => Str::random(10),
      'phone_number' => $faker->phoneNumber(),
      'role' => 'advocate',
      'addres_id' => $faker->numberBetween(2, 21),
      'office_id' => 2,
    ]);

    foreach ($users as $value) {
      $value = (object) $value;

      User::create([
        'name' => $value->name,
        'email' => $value->email,
        'email_verified_at' => $value->email_verified_at,
        'password' => $value->password,
        'remember_token' => $value->remember_token,
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
