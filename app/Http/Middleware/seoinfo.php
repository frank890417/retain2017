<?php

namespace App\Http\Middleware;

use Closure;

use App\News;
use App\Solution;
use App\Websiteinfo;
use Request;
class seoinfo
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next,$lang)
    {
        //default meta data for all webisite
        $meta_title = '睿田生技';
        $meta_cover = 'http://www.retainbiotech.com/img/og_default.png';
        $meta_description = '睿田生技致力於建立健康守護地圖，提供個人化預防醫學健康管理服務。睿田生技集結產、學、研三方資源投入，為台大與永齡健康基金會共同合資的第一家產學新創公司，整合了台大的研發實力、台成幹細胞治療中心在幹細胞領域投入多年的豐富臨床經驗、以及永齡健康基金會長期以來在預防醫學與癌症治療領域投注的龐大資源。';
        
        //page_set
        $post_fix = ' - 睿田生技';
        // dd($request);
        // dd($request->getPathInfo());
        $current_path = preg_replace("/\/".$lang."\//","/", $request->getPathInfo());

        // match solution
        // if ( preg_match("/solution\/n\/(.*)/",$current_path,$test) ){
            

        //     $match_solution = Solution::where("title", urldecode($test[1]))->first();
        //     $meta_title=$match_solution->title. $post_fix ;
        //     // $meta_title=$match_solution->title. $post_fix ;
        //     $meta_description=$match_solution->sub_content;
        // }

        // dd($current_path);
        // match news
        if ( preg_match("/news\/n\/.*/",$current_path,$test) ){
            $lang = Request::get('lang');
            $site_data= Websiteinfo::where("key", $lang)->first()->data;

            $news = json_decode($site_data)->page_news->news;
            foreach ($news as $key => $value) {

                if ("/news/n/".$value->title==urldecode($current_path) ) {
                    $match_news=$value;
                }
                // dd($value);
            }
            // dd($match_news);
            // $match_news = News::where("id", urldecode($test[1]))->first();
            if (isset($match_news) ){
                $meta_title=$match_news->title. $post_fix ;
                $meta_cover=$match_news->cover ;
                // $meta_title=$match_news->title. $post_fix ;
                $meta_description= mb_substr(preg_replace("/lt/",'',$match_news->content),0,50)."...";
                
            }
        }
        
        // dd($request->getPathInfo());
        switch($request->getPathInfo()){
            case '/':
            case '/home':    
                $meta_title = '睿田生技 Retain Biotech';
                break;

            case '/about':
                $meta_title = '關於' . $post_fix;
                break;
            case '/news':
                $meta_title = '新聞' . $post_fix;
                break;
            case '/member':
                $meta_title = '管理經營' . $post_fix;
                break;
            case '/solution':
                $meta_title = '產品方案' . $post_fix;
                break;
            case '/contact':
                $meta_title = '聯絡我們' . $post_fix;
                break;
        }



        //add meta to request ,send to controller
        $request->attributes->add(
          [
            'metas' =>[
                'meta_title'=>$meta_title,
                'meta_cover'=>$meta_cover,
                'meta_description'=>$meta_description  
            ]
          ]
        );
        // dd($request);
        return $next($request);
    }
}
