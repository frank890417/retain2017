<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Tech extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('teches',function($table){

          $table->increments('id');
          $table->string('title')->nullable();
          $table->string('cover')->nullable();
          $table->string('icon')->nullable();
          $table->string('description',1000)->nullable();
          $table->string('link',1000)->nullable();
          $table->string('btn_text')->nullable();
          $table->text('content')->nullable();
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
        //
        Schema::drop('teches');
    }
}
