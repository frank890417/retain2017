<template lang="jade">
div.page_index
  section.page_index_main.bg_parallax
    .video_container
      div(v-html="$t('page_index.section_hero.embed_video').replace(/(width=.*?height=.*?\")/,'width=\"100%\" height=\"500px\"')", style="width: 100%;padding: 20vmin;")
      .btn_video_close ✕
    .container.index_slogan_area
      h1 
        span.brown 儲於
        span 健康
        .title_span
        span 用於
        span.theme 未來
      
      h3.page_header_eng {{$t("page_index.section_hero.eng")}}

      
      div.play_btn(data-target=".page_index_main")
        i.fa.fa-play
      h6 {{$t("page_index.section_hero.btn_more")}}
    i.fa.fa-angle-down

  section.page_index_info
    .left
      .infos
        h2 {{$t("page_index.section_1.left.title")}}
        h4 {{$t("page_index.section_1.left.eng")}}
      p(v-html="$t('page_index.section_1.left.content')")
    .right
      .infos
        h2 {{$t("page_index.section_1.right.title")}}
        h4 {{$t("page_index.section_1.right.eng")}}
      p(v-html="$t('page_index.section_1.right.content')")

  section.page_index_grow
    img.cover.cover3(src="/img/index/2c.jpg")
    img.cover.cover2(src="/img/index/2b.png")
    img.cover.cover1(src="/img/index/2a.png")
    
    canvas.wave
    .container.flex
      .col_left
      .col_right
        h3.section_title {{$t('page_index.section_2.title')}}
        h4.section_feature(v-html="$t('page_index.section_2.feature')") 

        p.section_para.text-left(v-html="$t('page_index.section_2.content')") 
 
        router-link.btn-underline(v-if="$t('page_index.section_2.btn.show')",:to="$t('page_index.section_2.btn.link')") 
          span {{$t('page_index.section_2.btn.label')}}

  section.page_index_flow.bg_parallax
    .video_container
      video(src="https://www.w3schools.com/html/mov_bbb.mp4" controls)
      .btn_video_close ✕
        
    .container.flex
      .col_left
        h3.section_title {{$t('page_index.section_3.title')}}
        h4.section_feature(v-html="$t('page_index.section_3.feature')") 
        p.section_para.text-left(v-html="$t('page_index.section_3.content')") 
        router-link.btn-underline.white(v-if="$t('page_index.section_3.btn.show')",:to="$t('page_index.section_3.btn.link')") 
          span {{$t('page_index.section_3.btn.label')}}
      .col_right
        .revive_box
          h1 {{$t('page_index.section_3.revive_box.eng')}}
          h4 {{$t('page_index.section_3.revive_box.title')}}
          .play_btn(data-target=".page_index_flow")
            i.fa.fa-play
          .other {{$t('page_index.section_3.revive_box.info')}}

  section.page_index_team
    .container.flex.full
      .col_left
        .pic_left
      .col_right
    .container.flex.content
      .col_left
        h3.section_title {{$t('page_index.section_4.title')}}
        h4.section_feature(v-html="$t('page_index.section_4.feature')") 
        p.section_para(v-html="$t('page_index.section_4.content')") 
        router-link.btn-underline.black(v-if="$t('page_index.section_4.btn.show')",:to="$t('page_index.section_4.btn.link')") 
          span {{$t('page_index.section_4.btn.label')}}

      .col_right
        ul.slicklogo_team
          li.item(v-for="member in $t('page_index.section_4.team')")
            .team_pic(:style="{'background-image':`url(${member.logo})`}")
            
            h5.title(v-html="member.name")
        

  section.page_index_service
    .container.flex.full
      .col_left
        .out_pic.slick
          .item.item1(v-for="service in $t('page_index.section_5.carousel')", style="{'background-image': 'url('+service.cover+')'}")

        .slick_caption()
          transition-group(name="fade",tag="span")
            .title(v-for="(service,sid) in $t('page_index.section_5.carousel')",
            v-if="sid==0") {{service.text}}
          .next(onclick="$('.out_pic').slick('slickNext');")
            i.fa.fa-angle-right
      .col_right
    .container.flex
      .col_left
      .col_right

        h3.section_title {{$t('page_index.section_5.title')}}
        h4.section_feature(v-html="$t('page_index.section_5.feature')") 
        p.section_para(v-html="$t('page_index.section_5.content')")  
        router-link.btn-underline.brown_bg(v-if="$t('page_index.section_5.btn.show')",:to="$t('page_index.section_5.btn.link')") 
          span {{$t('page_index.section_5.btn.label')}}

  section.page_index_compaign.bg_parallax
    .container.flex.column
      h1.section_title {{$t('page_index.section_6.title')}}
      h3.section_feature(v-html="$t('page_index.section_6.feature')") 
      h4.section_para(v-html="$t('page_index.section_6.content')") 
      span
        router-link.btn-underline.brown_bg(v-if="$t('page_index.section_6.btn.show')",:to="$t('page_index.section_6.btn.link')") 
          span {{$t('page_index.section_6.btn.label')}}

</template>

<script>
  import {mapState} from 'vuex'
    export default {
        data () {
          return {
            news_id: 0,
            news_time: 0,
            news_change_time: 4000,
            arrows: false,
            timer: null
          };

        },
        mounted() {

            
            $(".play_btn").click(function(){
              var target=$($(this).attr("data-target"));
              // var video=$($(this).attr("data-target")+" video")[0];
              target.addClass("playmovie");
              // video.currentTime=0;
              // video.play();
              function cancel_video(e){
                console.log("end!");
                target.removeClass("playmovie");
                // video.currentTime=0;
                // video.pause();
              }
              // video.addEventListener('ended',cancel_video,false);
              $($(this).attr("data-target")+" .btn_video_close").click(cancel_video);

            });

            


            var vobj=this;

            // this.timer=setInterval(this.news_delta,this.news_change_time);

            // var loader = setInterval(function(){
            //   if (vobj.news.length>0){
            //     $('.slick').slick({
            //       autoplay: false,
            //       // dots: true,
            //       easing: 'ease-in',
            //       fade: true
            //     });
            //     clearInterval(loader);
            //     vobj.news_delta();
            //     Ts.reload();
            //   }
            // },100);
            
            // console.log("slick integrated");

            // $('.out_pic').slick({
            //   autoplay: true,
            //   autoplaySpeed: 3000,
            //   slidesToShow: 1,
            //   slidesToScroll: 1,
            //   arrows: false,
            //   fade: true,
            //   dots: true,
            //   easing: 'ease-in'
            // });

            // $('.slicklogo_team').slick({
            //   autoplay: true,
            //   autoplaySpeed: 3000,
            //   slidesToShow: 2,
            //   slidesToScroll: -1,
            //   arrows: false,
            //   // rtl: true,
            //   // fade: true,
            //   // dots: true,
            //   easing: 'ease-in'
            // });


            

            // var mCanvasSelector = "canvas.wave";
            // (function waveGenerator(window,mCanvasSelector){
            //   var canvas = document.createElement('canvas');
            //   var windowHeight=window.outerHeight;
            //   canvas.height=windowHeight;
            //   canvas.width=windowHeight;
            //   var ctx = canvas.getContext("2d");
            //   var len = windowHeight;
            //   var panY=150;
            //   var freq=100;
            //   var time=0;
            //   var mirror_list=[];
            //   $(mCanvasSelector).each((index,obj)=>{
            //     mirror_list.push(obj);
            //   });
              
            //   mirror_list.forEach((mCtx)=>{
            //     mCtx.height=300;
            //     mCtx.width=windowHeight;
            //   },20);
              
            //   ctx.strokeWidth=1;
            //   //set timer
            //   setInterval(function(){
            //     ctx.clearRect(0,0,len,300);
            //     ctx.beginPath();
            //     function draw_wave(r,freq,pan,speed){
            //       for(var i=0;i<len;i++){
            //         var deg1=2*Math.PI*((i-1)/freq+pan+time*speed);
            //         var deg2=2*Math.PI*(i/freq+pan+time*speed);
            //         var opacity= Math.pow(Math.E,-Math.abs(i-len*0.75)/(len/8))*0.2;
            //         ctx.strokeStyle="rgba(63,191,187,"+opacity+")";
            //         ctx.beginPath();
            //         ctx.moveTo(i-1,panY+r*Math.sin(deg1));
            //         ctx.lineTo(i,panY+r*Math.sin(deg2));
            //         ctx.stroke();
            //       }
            //     }
            //     draw_wave( 30 , 600 , 0 , 0.0005 );
            //     draw_wave( 30 , 800 , 20 , 0.00075 );
            //     draw_wave( 30 , 1000 , 40 , 0.0009 );

            //     time++;

            //     mirror_list.forEach((mCtx)=>{
            //       var destCtx = mCtx.getContext('2d');
            //       destCtx.clearRect(0,0,len,1000)
            //       destCtx.drawImage(canvas, 0, 0);
            //     },20);
            //   });

            // })(window,mCanvasSelector);




        },
        methods: {
          news_delta: function(){
            $('.slick').slick('slickNext');
            console.log("next");
            $(".value").stop();
            $(".value").animate({width: "0%"},0);
            $(".value").animate({width: "100%"},this.news_change_time,'linear');
            clearInterval(this.timer);
            this.timer=setInterval(this.news_delta,this.news_change_time);
          },
          bg_css(url){
            return {'background-image': 'url('+url.trim().replace(' ','%20')+')'}
          }


        },
        computed: mapState(['news']),
        beforeDestroy() {
          clearInterval(this.timer);
        }
    }
</script>