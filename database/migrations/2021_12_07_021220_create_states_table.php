<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('states', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->string('name', 64);
      $table->integer('code')->unsigned()->unique();
      $table->string('initials', 2)->unique();
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
    Schema::dropIfExists('states');
  }
}
