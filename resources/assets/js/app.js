
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import store from "./store"
import router from "./router"
import {mapState} from "vuex"
import {TweenMax} from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
window.TweenMax=TweenMax
import VueI18n from 'vue-i18n'
import Rx from 'rxjs/Rx'

import custom_i18n from './i18n'
import VueYouTubeEmbed from 'vue-youtube-embed'
import btn from './components/btn'
Vue.component('btn',btn)


Vue.use(VueYouTubeEmbed)


// detect ie
function is_ie() {
  const result = (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== 'undefined' && $.browser.msie == 1));

  return !!result;
}

if (is_ie()){
  store.commit("set_is_ie",true)
}

const app = new Vue({
  el: "#app",
  router,
  store,
  i18n: custom_i18n.i18n,
  computed: mapState(['news','about_logs','big_font','is_ie']),
  mounted(){
     // store.dispatch("loadWebsite");
  }
});


$(function(){ 

  var $window = $(window);
  var scrollTime = 1;
  var scrollDistance = 120;

  $window.on("mousewheel DOMMouseScroll", function(event){

    event.preventDefault(); 

    var delta = event.originalEvent.wheelDelta/100 || -event.originalEvent.detail/3;
    var scrollTop = $window.scrollTop();
    var finalScroll = scrollTop - parseInt(delta*scrollDistance);

    TweenMax.to($window, scrollTime, {
      scrollTo : { y: finalScroll, autoKill:true },
        ease: Power2.easeOut,
        overwrite: 5              
      });
    // console.log(finalScroll);
  });
});

//---------------------

//數數動畫
var scroll_delay=1000;
var scrolling=false;
var pre_region=null, now_region=null, next_region=null;
var direction='up';
var lock_scroll=true;
var window_width= $(window).outerWidth();
var window_height= $(window).outerHeight();
var scroll = Rx.Observable.fromEvent(document,'scroll')
            .map(e => e.target.scrollingElement.scrollTop);
// scroll.subscribe(obj=>console.log(obj));

// Rx捲軸位置
scroll
  .map(top => top<=0)
  .subscribe((at_top)=>{
    if (at_top) 
      $("nav,.go_to_topbtn").addClass("at_top");
    else 
      $("nav,.go_to_topbtn").removeClass("at_top");

   });

//使用卷軸位置更新元件
window.update_scroll=function update_scroll(top_val){
  //update parallax backgrounds
  let bg_px = Array.from(document.getElementsByClassName("bg_parallax"))
  if ( bg_px.length ){
    bg_px.forEach((obj,index)=>{
      let $obj=$(obj)
      if ( !obj.classList.contains("no_attach") ){
        if ($obj.offset().top+$obj.outerHeight()>top_val)
          $obj.css("background-position","center "+ -(top_val-$obj.offset().top)/11+"px");
        
      }else{
        if ($obj.offset().top+$obj.outerHeight()>top_val){
          $obj.css("background-position","center "+ (top_val-$obj.offset().top)/1.6+"px");
        };   
      }
    });
  }
  if ($(".mountain").length>0){
    $(".mountain").css("bottom",(+(-(top_val+window_height*0.85-$("#section_about_log").offset().top)/4))+"px");
  }

  if ($(".cover1").length>0){
    var grow_top=$(".page_index_grow").offset().top;
    if (grow_top+$(".page_index_grow").outerHeight()>top_val){
      $(".cover1").css("transform","translateY("+(-(top_val-grow_top)/2.2+50)+"px)");
      $(".cover2").css("transform","translateY("+(-(top_val-grow_top)/5.2+50)+"px)");
      $(".cover3").css("transform","translateY("+(-(top_val-grow_top)/9.2+86)+"px)");
   }
  }

    //update section content fadeIn
    $(".section_title.initial,.section_para").each(function(index,obj){
      if ($(obj).offset().top<top_val+window_height){
        $(obj).removeClass("initial");
      }
    });


    //post box float

    var postbox=$(".post_box");
    if (postbox.length>0){
      var pt=postbox.offset().top , ph=postbox.height();
      var st = top_val;
      var delta= (st>pt?(st-24*33):0) ;
      var content_end=ph+pt-24*22;
      if (st>content_end){
        delta=content_end-st+24*22;
      }
      $(".col_fixed").css("transform","translateY("+delta+"px)");
      // console.log(delta);
    }


    // //update right side bullet
    // update_bullet(top_val);
}

//subscribe parallax top
scroll.subscribe(top_val=>update_scroll(top_val));

//upadte bullet nav points
function update_bullet(st){
  now_region=null;
  next_region=null;

  var last=null;
  $( ".slide_bullet li").each(function(index,obj){
    var data_link = $( this ).attr("data-link");
    var tar_h=$( data_link ).height();

    if ($( data_link ).offset()){
      if ($( data_link ).offset().top<=st+tar_h/2 &&
        $( data_link ).offset().top>=st-window_height/2){
        $( this ).addClass("active");
        now_region=data_link;
        pre_region=last;

      }else{
        
        $( this ).removeClass("active");
        if (now_region && !next_region){
          next_region=data_link;
        }
      }
      last=data_link;
    }
    
  });
}

//頁面還原初始狀態
function init_element(){

  // $(".percent , .section_title , .section_para").addClass("initial");
  setTimeout(function(){
    update_scroll(0);
  },50);
 

}


//載入執行
$( window ).ready(function(){
  //
  if (location.href.indexOf("#")!=-1){
    $("#select_contact").val(location.href.split("#")[1]);
  }
  // //加上初始化
  init_element()
  //initial bg parallax
  

  //調整字體大小
  // $(".func_size").click(function(){
  //   var el=$(this);
  //   if (!app.big_font){
  //     app.big_font=true;
  //     $(".question_list").css("font-size","18px");
  //   }else{
  //     app.big_font=false;
  //     $(".question_list").css("font-size");
  //   }
      
  // });
  //回到最上面按鈕
  $(".go_to_topbtn").click(function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  //bullet
  $(".slide_bullet li").click(function(){
    $("html, body").animate({ scrollTop: $($(this).attr("data-link")).offset().top }, "slow");
  });

  // wheelDelta
  var scroll = Rx.Observable.fromEvent(document,'scroll')
  var mousewheel = Rx.Observable.fromEvent(document,'mousewheel')
                                .map(e=>e.wheelDelta );   


  update_bullet(0);
  //snap locker by Rxjs
  if (lock_scroll && window_height>850){
    //filter delta which bigger than thereshold and filter out twice down/up condition
    var source_page_nav=mousewheel.filter(
      delta=>((delta>50 && (direction=='down' || !scrolling))
           || (delta <= -50 && !scrolling && (direction=='up' || !scrolling)))
      ) 
    .map(delta=>(delta>0?'up':'down'))                //map delta to up or down
    .throttleTime(500);                               //filter event by 200ms time span

    source_page_nav.subscribe((direct)=>{             //subscribe the event
      if (router.history.current.fullPath=="/"){
        console.log(direct);
        direction=direct;
        var target_block=(direct=='up')?pre_region:next_region;
        if (target_block)
          $("html, body").animate({ scrollTop: $(target_block).offset().top }, "slow");
      }
    }); 
    //cancel the scrolling boolean after scroll
    source_page_nav.delay(500).subscribe(()=>{
      scrolling=false;
    });

    // $(window).bind('mousewheel', function(event) {
    //   if (router.history.current.fullPath=="/" && window_height>850 ){
    //     event.preventDefault();
    //   }
    // });
}


  //router event

router.afterEach((route) => {
  $( window ).ready();
  if (route.path=="/about" || route.path=="/news" || route.path.indexOf("/news/")!=-1){
    $("nav").addClass("bg_white");
  }else{
    $("nav").removeClass("bg_white");
  }
  // //加上初始化
  if (route.path=="/index"){
    setTimeout(()=>{init_element();},1200);
  } 
  
  });
  
});

// var source = Rx.Observable.interval(100);
// source.subscribe((t)=>{
//   vm.news_time=(vm.news_time+100) % vm.news_change_time;
// });

// source.throttleTime(5000)
//       .subscribe(()=>{
//         vm.news_delta(1);

// });




