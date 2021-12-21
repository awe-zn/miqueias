<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('tasks', function (Blueprint $table) {
      $table->id();
      $table->string('title', 64);
      $table->string('description', 128);
      $table->dateTimeTz('schedule_at');
      $table->integer('process_id');
      $table->foreign('process_id')->references('id')->on('process')->onDelete('CASCADE')->onUpdate('CASCADE');;
      $table->integer('task_priority_id')->nullable();
      $table->foreign('task_priority_id')->references('id')->on('tasks_priority')->onDelete('SET NULL')->onUpdate('CASCADE');;
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
    Schema::dropIfExists('tasks');
  }
}