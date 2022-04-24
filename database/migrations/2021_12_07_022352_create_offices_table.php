<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOfficesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('offices', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name', 64);
      $table->string('email', 64)->unique();
      $table->string('identification_document', 14)->unique();
      $table->string('ccm', 16)->unique();
      $table->string('oab', 16)->unique();
      $table->integer('state_oab')->unsigned()->nullable();
      $table->foreign('state_oab')->references('id')->on('states')->onDelete('SET NULL')->onUpdate('CASCADE');
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
    Schema::dropIfExists('offices');
  }
}
