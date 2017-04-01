<?php

use Illuminate\Database\Seeder;
use database\seeds\NewsSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call('NewsSeeder');
        // $this->call(NewsSeeder::class);
    }
}
