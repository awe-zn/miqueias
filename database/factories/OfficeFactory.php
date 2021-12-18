<?php

namespace Database\Factories;

use App\Models\Office;
use App\Models\State;
use Illuminate\Database\Eloquent\Factories\Factory;

class OfficeFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = Office::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      "name" => $this->faker->company(),
      "email" => $this->faker->email(),
      "identification_document" => $this->faker->cnpj(false),
      "ccm" => $this->faker->bothify('######'),
      "oab" => $this->faker->bothify('###########'),
      "state_oab" => $this->faker->numberBetween(1, 27),
    ];
  }
}
