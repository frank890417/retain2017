<template lang="jade">
div.page_index
  section.page_index_main.bg_parallax
    .video_container
      video(src="https://www.w3schools.com/html/mov_bbb.mp4" controls)
      .btn_video_close
        i.fa.fa-cross
    .container.index_slogan_area
      h1 
        span.brown 儲於
        span 健康
        .title_span
        span 用於
        span.theme 未來
      
      h3.page_header_eng Preserve in good health  apply in the future

      
      div.play_btn(data-target=".page_index_main")
        i.fa.fa-play
      h6 了解我們的服務

    // .container.news_container
      .slick
        .news.color_white(v-for='(a_news,id) in news')          
          .col_infos
            .texts
              h4 {{a_news.title}}
              h5 {{a_news.date}}
              p {{a_news.content.replace(/<[^>]*>/g, '').substr(0,70)+'...'}}
            .btns
              router-link.btn.btn-default.btn-primary-lighter.btn_more(:to="'/news/'+a_news.id") 了解更多
              a.btn.btn-default.btn-transparent.btn_next(@click="news_delta" ) 下一則  > 
          
          .col_img(:style="bg_css(a_news.cover)")
      .timeline
        .value

  section.page_index_info
    .left
      .infos
        h2 認識幹細胞
        h4 what is stem cells?
      p 睿田生技客服專員將會提供您完整的資訊與諮詢服務，待您完全了解儲存過程後，將會安排儲存前的健康評估，確認健康狀態後即與您安排簽約、醫師約診與細胞抽取時間。
    .right
      .infos
        h2 認識免疫細胞?
        h4 what is immune cells?
      p 睿田生技客服專員將會提供您完整的資訊與諮詢服務，待您完全了解儲存過程後，將會安排儲存前的健康評估，確認健康狀態後即與您安排簽約、醫師約診與細胞抽取時間。

  section.page_index_grow
    img.cover.cover3(src="/img/index/2c.jpg")
    img.cover.cover2(src="/img/index/2b.png")
    img.cover.cover1(src="/img/index/2a.png")
    
    canvas.wave
    .container.flex
      .col_left
      .col_right
        h3.section_title 儲存生命泉源
        h4.section_feature 當高齡化社會已成事實，我們將面臨威脅的不再只有死亡，還有疾病帶來的慢性威脅，
          span.brown 預先儲存健康，是您最好的對策！ 

        p.section_para.text-left 細胞的健康狀況隨著年紀增長、生活型態、工作壓力而受影響，也就是俗稱的老化現象。老化並不可怕，可怕的是因為老化而衍生出的疾病，例如:神經細胞退化造成的阿茲默症…等。我們無法阻止時間前進、也無法停止老化、但是我們將年輕的細胞凍存，保持細胞狀態在儲存的當下，在未來有需要的時候能有多一項工具可以使用。
        router-link.btn-underline(to='#h') 
          span.brown 了解更多

  section.page_index_flow.bg_parallax
    .video_container
      video(src="https://www.w3schools.com/html/mov_bbb.mp4" controls)
      .btn_video_close
        span
          i.fa.fa-cross
    .container.flex
      .col_left
        h3.section_title 細緻的服務流程
        h4.section_feature 睿田生技客服專員將會提供您完整的資訊與諮詢服務。 
        p.section_para.text-left 待您完全了解儲存過程後，將會安排儲存前的健康評估，確認健康狀態後即與您安排簽約、醫師約診與細胞抽取時間。專員將會提供您完整的資訊與諮詢服務，待您完全了解儲存過程後，確認健康狀態後即與您安排簽約、醫師約診與細胞抽取時間。
        router-link.btn-underline.white(to='#h')
         span 了解更多
      .col_right
        .revive_box
          h1 REVIVE
          h4 服務流程介紹
          .play_btn(data-target=".page_index_flow")
            i.fa.fa-play
          .other ▩ 睿田生技細胞儲存服務流程

  section.page_index_team
    .container.flex.full
      .col_left
        .pic_left
      .col_right
    .container.flex.content
      .col_left
        h3.section_title 頂尖菁英團隊
        h4.section_feature
          span.theme 串聯產、學、研三方資源投入的專業團隊! 
        p.section_para 睿田生技為臺灣大學與永齡健康基金會共同合資的第一家產學新創公司。我們整合了臺灣大學的研發實力、台成幹細胞治療中心於幹細胞領域多年的豐富臨床經驗，及永齡健康基金會長期在預防醫學與癌症治療領域投注的強大資源，並搭配立立達診所的六星級高端健康管理規劃方案，提供客戶最為專業與完善的細胞儲存管理服務！
        router-link.btn-underline.black(to='#') 
          span 了解更多

      .col_right
        ul
          li
            img(src="/img/index/4c.jpg")
            h5.title 永齡健康基金會
          li
            img(src="/img/index/4d.jpg")
            h5.title 台灣大學
          li
            img(src="/img/index/4e.jpg")
            h5.title 台成幹細胞<br>治療中心
          li
            img(src="/img/index/4f.jpg")
            h5.title 立達診所



  section.page_index_service
    .container.flex.full
      .col_left
        .out_pic.slick
          .item.item1
          .item.item2

        .slick_caption
          .title 創新的科技、貼心的服務
          .next
            i.fa.fa-angle-right
      .col_right
    .container.flex
      .col_left
      .col_right

        h3.section_title 高品質尊榮服務
        h4.section_feature 
          span.brown 創新的科技 、 貼心的服務 、 人性化的專業是睿田生技三大核心價值 
        p.section_para 細胞的健康狀況隨著年紀增長、生活型態、工作壓力而受影響，也就是俗稱的老化現象。老化並不可怕。<br>以融合「創新的科技」、「貼心的服務」、「人性化的專業」三大核心價值，致力為客戶提供精確有效率，充滿溫馨感動的個人化健康管理中心，讓您在舒適、寧靜且隠密的環境下完成珍貴的細胞儲存！ 
        .btns
          div.inline_container
            router-link.btn-underline(to='tech') 
              span 了解更多
          div.inline_container
            router-link.btn-underline.brown_bg(to='tech') 
              span 聯繫我們
  section.page_index_compaign.bg_parallax
    .container.flex.column
      h1.section_title DREAMER
      h3.section_feature
        span.brown 生命品質  由您決定
      h4.section_para 在生命的過程中，也許會有些無法預期的事情發生，唯有多一分準備才會有多一分的勝算！防患於未然，讓我們一起迎向這個未知的未來
      span
        router-link.btn-underline.brown_bg(to='#') 
          span 預約專人諮詢

  // section_solutions

  section.page_index_sponsor(style="display: none")
    .container.flex.slicklogo1
      .item
        img.sponsorlogo(src="/img/cor_logo/cor_logo-01.png" style="opacity: 0")
      .item
        img.sponsorlogo(src="/img/cor_logo/cor_logo-01.png")
      .item
        img.sponsorlogo(src="/img/cor_logo/cor_logo-02.png")
      .item
        img.sponsorlogo(src="/img/cor_logo/cor_logo-01.png" style="opacity: 0")
</template>

<script>
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
              var video=$($(this).attr("data-target")+" video")[0];
              target.addClass("playmovie");
              video.currentTime=0;
              video.play();
              function cancel_video(e){
                console.log("end!");
                target.removeClass("playmovie");
              }
              video.addEventListener('ended',cancel_video,false);

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

            $('.out_pic').slick({
              autoplay: true,
              autoplaySpeed: 3000,
              slidesToShow: 4,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
              easing: 'ease-in'
            });

            

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
        computed: Vuex.mapState(['news']),
        beforeDestroy() {
          clearInterval(this.timer);
        }
    }
</script>