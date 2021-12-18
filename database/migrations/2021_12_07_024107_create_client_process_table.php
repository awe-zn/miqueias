<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientProcessTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('client_process', function (Blueprint $table) {
      $table->integer('process_id');
      $table->integer('client_id');
      $table->foreign('process_id')->references('id')->on('process')->onDelete('CASCADE')->onUpdate('CASCADE');
      $table->foreign('client_id')->references('id')->on('users')->onDelete('CASCADE')->onUpdate('CASCADE');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('client_process');
  }
}
