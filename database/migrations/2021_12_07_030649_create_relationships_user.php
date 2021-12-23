<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelationshipsUser extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('users', function (Blueprint $table) {
      $table->integer('addres_id')->unsigned()->nullable();
      $table->foreign('addres_id')->references('id')->on('adresses')->onDelete('SET NULL')->onUpdate('CASCADE');
      $table->integer('office_id')->unsigned();
      $table->foreign('office_id')->references('id')->on('offices')->onDelete('CASCADE')->onUpdate('CASCADE');
      $table->integer('avatar_id')->unsigned()->nullable();
      $table->foreign('avatar_id')->references('id')->on('avatars')->onDelete('SET NULL')->onUpdate('CASCADE');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('users', function (Blueprint $table) {
      $table->dropColumn('addres_id');
      $table->dropColumn('office_id');
      $table->dropColumn('avatar_id');
    });
  }
}
