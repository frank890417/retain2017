<template lang="jade">
div.page_about
  section.section_hero
    video_fullplayer(
        :youtube_url = "$t('page_about.video')",
        :player_height="500",
        :status="video_playing",
        @ended = "video_playing=false"
        )
    .container.full.flex
      .col_left.bg_parallax
      .col_right
    .container.container_content.flex
      .col_left          
        h1 {{$t("page_about.title")}}
        h4.section_eng {{$t("page_about.eng")}}
        h4.section_feature {{$t("page_about.feature")}} 

        p(v-html="$t('page_about.content')")
        hr.short.left
        .btn_full.green(v-if="$t('page_about.btn.show')", @click="video_playing=true")
          div.icon_inline_wrapper
            .icon_play_circle
          div {{$t("page_about.btn.label")}}


      .col_right

        .timelog(
                   v-for="(y,yid) in years",
                   v-if="get_yearlog(y).length>0 || y=='2015'",
                   :class = "{active: toggle_status[yid].status}",
                   @click = "toggle_status[yid].status = get_yearlog(y).length>0?(!toggle_status[yid].status):false")
          h4.title {{y}}
          ul
            li(v-for= "log in get_yearlog(y)")
              span.month {{log.month}}
              span.content {{log.content}} 
            li(v-if="get_yearlog(y).length==0")

  section.section_blocks
    .container.flex.full
      .block(v-for="b in $t('page_about.blocks')")
        .infos
          h3.block_title {{b.title}}
          p.block_para(v-html="b.content")
      


</template>

<script>
import video_fullplayer from './video_fullplayer'
import { mapGetter, mapActions , mapState } from 'vuex'
export default {
    data() {return {
      sel_year: "year_2016",
      years: ['2020','2019','2018','2017','2016','2015'],
      toggle_status: Array.from({length: 10},(d,i)=>({status: i>3})),
      video_playing: false
    }},
    mounted() {
       this.toggle_status[5].status=false
        console.log('about mounted.')
        $(".btn_expand").click(function(){
          console.log(this);
          $(this).parent().toggleClass("active");
        });
        if (window.location.hash=="#section_member"){
          $("html,body").animate({scrollTop: $("#section_member").offset().top-100});
        }
    },
    methods: {
      to_href: function(obj) {
        console.log(this);
        if (obj.news_id!=1){
          this.$route.router.go("/news/"+obj.news_id);
        }
      },
      get_yearlog(year){
        return this.computed_yearlog.filter(o=>o.year==year).sort((a,b)=>b.month-a.month)
      }
    },
    computed: {
      ...mapState(['about_logs']),
      computed_yearlog(){
        return this.$t("page_about.yearlog")
               .map( o=>({
                year: o.year ,
                month: o.date.split("/")[0], 
                day: o.date.split("/")[1] ,
                content: o.content ,
                link: o.link ,

               }) )
               .sort((a,b)=>{
                 return (b.year -a.year) ||
                       (a.year ==b.year && b.month-a.month)  ||
                       (a.year ==b.year && a.month==b.month && b.day-a.day)
      
               })

      }
    },
    components: {
      video_fullplayer
    }

}
</script>