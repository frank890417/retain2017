<template lang="jade">
div.page_about
  section.section_hero
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
        .btn_full.green(v-if="$t('page_about.btn.show')")
          div.icon_inline_wrapper
            .icon_play_circle
          div {{$t("page_about.btn.label")}}


      .col_right

        .timelog.active(v-for="y in ['2020','2019','2018','2017','2016','2015']", v-if="get_yearlog(y).length>0 || y=='2015'")
          h4.title {{y}}
          ul
            li(v-for= "log in get_yearlog(y)")
              span.month {{log.month}}
              span.content {{log.content}} 
            li

  section.section_blocks
    .container.flex.full
      .block(v-for="b in $t('page_about.blocks')")
        .infos
          h3.block_title {{b.title}}
          p.block_para(v-html="b.content")
      

  section.section_member#section_member(v-for="team in $t('page_about.teams')")
    h2.section_title {{team.title}}
    .container

      //.person_box.big.container.flex
        .btn_expand.cross
        .col_left
          .cover
        .col_right
          
          h5.name 院長
            span.bigger_text | 黃成鴻
          p 鴻海集團近年來不斷為旗下所有辛勤付出的員工與親友們，創造最專業的健康管理專家，因此成立康聯預防醫學，提供360度專業照護
          h5.title 專長
          ul
            li 內科疾病之診療與治療
            li 健檢報告之判讀與解說
            li 血液病及各種惡行腫瘤諮詢、診斷及整合性化療（化學治療，標靶治療與賀爾蒙治療規劃與建議）
            li 疼痛鬨質及症狀緩和醫療
            li 老人腫瘤學，泌尿道及消化道腫瘤整合性治療
          h5.title 學歷
          ul
            li 台北醫學院醫學系畢業
            li 長庚大學臨床醫學研究所碩士班推廣教育分子生物學學分班及格
        .experience
          div
            h5.title 經歷
            ul
              li 台北國泰醫院外科住院醫師
              li 高雄長庚醫院放射診斷科住院醫師、總住院醫師、主
              li 治醫師
              li 美國加州大學聖地牙哥校區(UCSD) 醫學院骨關放射學研究員
              li 長庚醫院放射診斷科臨床助理教授級主治醫師
              li 中臺醫專放射技術科，大仁藥專藥學科、護理科兼任講師
      .person_area
        .person_box.small.container.flex(v-for="member in team.members")
          .btn_expand.cross
          .col_left
            .cover(:style="`background-image: url('${member.cover}')`")
          .col_right
            
            h5.name {{member.role}}
              span.bigger_text | {{member.name}}
            div(v-html="member.card_front")
          
          .experience
            div(v-html="member.card_back")
              //h5.title 經歷
              //ul
                li 台北國泰醫院外科住院醫師
              

</template>

<script>
  import { mapGetter, mapActions , mapState } from 'vuex'
  export default {
      data() {return {
        sel_year: "year_2016"
      }},
      mounted() {
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
          return this.computed_tearlog.filter(o=>o.year==year)
        }
      },
      computed: {
        ...mapState(['about_logs']),
        computed_tearlog(){
          return this.$t("page_about.yearlog")
                 .map( o=>({
                  year: o.year ,
                  month: o.date.split("/")[0], 
                  day: o.date.split("/")[1] ,
                  content: o.content ,
                  link: o.link ,

                 }) )
                 .sort((a,b)=>{
                   return (a.year >b.year) ||
                         (a.year ==b.year && a.month>b.month)  ||
                         (a.year ==b.year && a.month==b.month && a.day>b.day)
        
                 })

        }
      }

  }
</script>