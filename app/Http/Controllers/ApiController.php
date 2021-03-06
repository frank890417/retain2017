<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Route;
use Intervention\Image\ImageManagerStatic as Image;
use Storage;
use App\News;
use App\Websiteinfo;
class ApiController extends Controller
{
    //
    function news(){
      return News::orderBy('id','desc')->get();
    }
    
    public function websiteinfo($key){
      return Websiteinfo::where("key",$key)->first()->data;
    }

    public function websiteinfo_save($key){
      $input = Input::all();

      
      // dd($input);
      $websiteinfo = Websiteinfo::where("key",$key)->first();

      // dd($input["update"]);
      $websiteinfo->data=$input["update"];
      $websiteinfo->save();

      return ["status"=> "ok"];
    }


    //影像上傳
    public function upload_image(){
      $input = Input::all();
      if(Input::file())
       {
         $image = Input::file('file');
         // $ext = $image->getClientOriginalExtension();
         $filename  =  date('Y_m_d_h_i_s').'_'. $_FILES['file']['name'] ;

         // prevent possible upsizing
         // dd("storage/".$filename);
         $img = Image::make($image);
         $img->resize(1920, null, function ($constraint) {
             $constraint->aspectRatio();
             $constraint->upsize();
         });

         $path = 'img/uploaded/';
         $img->save(storage_path('app/public/'.$path.$filename) );
         // dd($img->__toString());
         //Storage::put(storage_path($path.$filename),$img->__toString());


         return ['location'=>'/storage/'.$path.str_replace(" ","%20",$filename)];
     
             // Image::make($image->getRealPath())->resize(200, 200)->save($path);
             // $user->image = $filename;
             // $user->save();
        }
    }
}
