<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdressesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('adresses', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->string('zip_code', 16);
      $table->string('line_description', 64);
      $table->string('number_addres', 8);
      $table->string('district', 32);
      $table->integer('county_id')->unsigned()->nullable();
      $table->foreign('county_id')->references('id')->on('counties')->onDelete('SET NULL')->onUpdate('CASCADE');
      $table->timestampsTz();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('adresses');
  }
}
