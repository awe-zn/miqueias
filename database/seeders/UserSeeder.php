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
    User::truncate();

    if (app()->environment('local')) {
      User::factory(20)->create();
    }

    $faker = Factory::create();

    $users = array([
      'name' => 'Daniel Souza',
      'email' => 'miqueiascostaadv@gmail.com',
      'email_verified_at' => now(),
      'password' => Hash::make('LlCsU1NrZX'),
      'remember_token' => Str::random(10),
      'phone_number' => $faker->phoneNumber(),
      'role' => 'advocate',
      'addres_id' => $faker->numberBetween(1, 20),
      'office_id' => $faker->numberBetween(1, 20),
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
  }
}
