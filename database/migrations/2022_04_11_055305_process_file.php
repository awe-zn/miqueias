<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProcessFile extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('process_files', function (Blueprint $table) {
      $table->id();
      $table->string('path');
      $table->string('mask');
      $table->integer('process_id')->unsigned()->nullable();
      $table->foreign('process_id')->references('id')->on('adresses')->onDelete('SET NULL')->onUpdate('CASCADE');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('process_files');
  }
}
