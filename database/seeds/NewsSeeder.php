<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Facade\DB;
use Illuminate\Database\Eloquent\Model;
use App\News;
class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        News::truncate();
        for($i=0;$i<10;$i++){
          News::create([
            'title' => ["全方位企業檢測方案","解讀先天遺傳癌症風險","為安全出發讓生活更美好"][rand(0,2)],
            'date' => '2017.'.str_pad(''.rand(1,12),2,'0',STR_PAD_LEFT).".".str_pad(''.rand(1,31),2,'0',STR_PAD_LEFT),
            'content' => ["全方位企業檢測方案","解讀先天遺傳癌症風險","為安全出發讓生活更美好"][rand(0,2)],
            'description' => "解讀先天遺傳癌症風險，傳統健檢Out、精準醫療In，罹癌時鐘越跑越快。",
            'tag' => "類別類別",
            'updated_at' => date("Y-m-d H:i:s"),
            'created_at' => date("Y-m-d H:i:s"),

          ]);
        }
    }
}
