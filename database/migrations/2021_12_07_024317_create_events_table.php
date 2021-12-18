<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('events', function (Blueprint $table) {
      $table->id();
      $table->string('title', 64);
      $table->string('description', 128);
      $table->dateTimeTz('starts_in');
      $table->dateTimeTz('ends_at');
      $table->integer('process_id');
      $table->foreign('process_id')->references('id')->on('process')->onDelete('CASCADE')->onUpdate('CASCADE');
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
    Schema::dropIfExists('events');
  }
}
