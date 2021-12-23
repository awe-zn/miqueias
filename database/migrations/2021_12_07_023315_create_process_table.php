<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProcessTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('process', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->string('title', 64);
      $table->string('code', 16);
      $table->string('judgment', 32);
      $table->string('action', 64);
      $table->string('link', 256)->nullable();
      $table->string('description', 256);
      $table->integer('fee_cause');
      $table->integer('fee_condemnation');
      $table->integer('fee_amount');
      $table->date('distributed_in');
      $table->string('observation_description', 128);
      $table->boolean('public')->default(true);
      $table->integer('legal_instance_id')->unsigned()->nullable();
      $table->foreign('legal_instance_id')->references('id')->on('legal_instances')->onDelete('SET NULL')->onUpdate('CASCADE');
      $table->integer('legal_court_id')->unsigned()->nullable();
      $table->foreign('legal_court_id')->references('id')->on('legal_courts')->onDelete('SET NULL')->onUpdate('CASCADE');
      $table->integer('legal_forum_id')->unsigned()->nullable();
      $table->foreign('legal_forum_id')->references('id')->on('legal_forums')->onDelete('SET NULL')->onUpdate('CASCADE');
      $table->integer('office_id')->unsigned();
      $table->foreign('office_id')->references('id')->on('offices')->onDelete('CASCADE')->onUpdate('CASCADE');
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
    Schema::dropIfExists('process');
  }
}
