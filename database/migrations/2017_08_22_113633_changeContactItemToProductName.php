<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeContactItemToProductName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('contact_records', function (Blueprint $table) {
            $table->dropColumn("ask_item_id");
            $table->string("ask_item_name");
            
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
        Schema::table('contact_records', function (Blueprint $table) {
            $table->integer("ask_item_id");
            $table->dropColumn("ask_item_name");

            //
        });
    }
}
