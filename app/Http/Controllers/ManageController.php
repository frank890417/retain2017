<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use App\News;
use App\Websiteinfo;
class ManageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    //
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $lang = Request::get('lang');
        $is_default_lang = Request::get('is_default_lang');

        // if ($is_default_lang){
        //     // dd(Request::getPathInfo());
        //     return redirect('http://www.retain2017.dev'.Request::getPathInfo());
        // }

        // dd($lang);
        // dd($lang);
        // if ()
        // dd($metas);
        // dd($lang);
        $lang_pack= Websiteinfo::where("key", $lang)->first()->data;
        return view('layouts.app_manage')
               ->with("lang_pack",$lang_pack)
               ->with("lang",$lang)
            ;
    }
}
