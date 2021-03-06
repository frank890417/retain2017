<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use App\Question;
class QuestionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    //
    public function index(){
      $questions = Question::orderBy("stick_top","desc")->get();
      return view('manage.question')
              ->with("questions",$questions);
    }
    public function edit($id){
      $question = Question::find($id);
      return view('manage.question_edit')
              ->with("question",$question);
    }
    public function update($id){
      $inputs= Input::all();
      $question = Question::find($id);
      $inputs['updated_at']=date("Y-m-d H:i:s");
      $question->update($inputs);
      return Redirect::to("manage/question");
    }

    public function create(){
      return view('manage.question_edit');
    }
    public function store(){
      $inputs= Input::all();
      $inputs['updated_at']=date("Y-m-d H:i:s");
      $inputs['created_at']=date("Y-m-d H:i:s");
      $question = Question::Create($inputs);
      return Redirect::to("manage/question");
    }
    public function destroy($id){
      Question::destroy($id);
      return Redirect::to("manage/question");
    }
}
