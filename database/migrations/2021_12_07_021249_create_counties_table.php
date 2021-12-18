<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCountiesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('counties', function (Blueprint $table) {
      $table->id();
      $table->integer('code');
      $table->string('name', 64);
      $table->integer('state_code');
      $table->foreign('state_code')->references('code')->on('states')->onDelete('CASCADE')->onUpdate('CASCADE');
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
    Schema::dropIfExists('counties');
  }
}
