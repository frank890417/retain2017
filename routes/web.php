<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

$langs = ["","cn","en","zh"];

Route::get('home','NewsController@index');

$manage_routes= function(){
  Route::get('/manage/{page?}',"ManageController@index");
  Route::get('/manage/{page?}/{para?}',"ManageController@index");
  // Route::resource('manage/','NewsController');
};



Auth::routes();

$website_routes=function(){
  Route::get('/', 'HomeController@index');
  Route::get('/member', 'HomeController@index');
  Route::get('/tech', 'HomeController@index');
  Route::get('/about', 'HomeController@index');
  Route::get('/news', 'HomeController@index');
  Route::get('/news/{id}', 'HomeController@index');
  Route::get('/news/n/{title}', 'HomeController@index');
  Route::get('/news/cata/{name}', 'HomeController@index');
  Route::get('/solution/{id}', 'HomeController@index');
  Route::get('/solution', 'HomeController@index');
  Route::get('/job', 'HomeController@index');
  Route::get('/contact', 'HomeController@index');
  Route::get('/search', 'HomeController@index');
  Route::get('/tern', 'HomeController@index');
};


// $domains=[
//   'www.retain2017.dev',
//   'retain2017.dev',
//   'en.retain2017.dev',
//   'zh.retain2017.dev',
//   'cn.retain2017.dev',

//   'retainbiotech.com',
//   'www.retainbiotech.com',
//   'en.retainbiotech.com',
//   'zh.retainbiotech.com',
//   'cn.retainbiotech.com',


//   'manage.retainbiotech.com',
//   'www.retainbiotech.com',
//   'en.manage.retainbiotech.com',
//   'zh.manage.retainbiotech.com',
//   'cn.manage.retainbiotech.com'

// ];



// Route::get("/zh/", 'HomeController@index')->name("home");

foreach ($langs as $key => $lang) {
  Route::group(['prefix' => $lang ,'middleware'=>'auth','middleware'=>'lang:'.$lang],$manage_routes);  
  Route::group(['prefix' => $lang ,'middleware'=>['lang:'.$lang,'seoinfo:'.$lang] ],$website_routes);
}


