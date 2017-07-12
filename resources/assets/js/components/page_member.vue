<template lang="jade">
div.page_about
  section.section_member#section_member(v-for="team in $t('page_about.teams')", v-if="team.members.length")
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
          console.log('member mounted.')
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
      },
      computed: {
        ...mapState(['about_logs']),
        
      }

  }
</script>