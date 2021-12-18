<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory;

class UserSeeder extends Seeder
{
  public function run()
  {
    User::truncate();

    User::factory(20)->create();

    $faker = Factory::create();

    $users = array([
      'name' => 'Daniel Souza',
      'email' => 'daniel@email.com',
      'email_verified_at' => now(),
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
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
