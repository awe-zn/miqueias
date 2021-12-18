<?php

namespace Database\Factories;

use App\Models\Addres;
use App\Models\County;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddresFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = Addres::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      "zip_code" => $this->faker->postcode(),
      "line_description" => $this->faker->streetAddress(),
      "number_addres" => $this->faker->buildingNumber(),
      "district" => $this->faker->city(),
      "county_id" => $this->faker->numberBetween(1, 5570),
    ];
  }
}
