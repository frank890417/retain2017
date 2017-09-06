<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
class MailController extends Controller
{
    //
    public function index(){
       Mail::send('emails.welcome', ['key' => 'value'], function($message){
    	   $message->to('frank890417@gmail.com', 'majer')->subject('測試');
	});
    }
}
