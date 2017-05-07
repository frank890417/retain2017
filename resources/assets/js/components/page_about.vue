<template lang="jade">
div.page_about
  section.section_hero
    .container.full.flex
      .col_left.bg_parallax
      .col_right
    .container.container_content.flex
      .col_left          
        h1 關於睿田
        h4.section_eng about Retain Biotech
        h4.section_feature 當高齡化社會已成事實，我們將面臨威脅的不再只有死亡，預先儲存健康，是您最好的對策！ 

        p 睿田生技集結產、學、研三方資源投入，為台灣大學與永齡健康基金會共同合資的第一家生技公司，整合了台灣大學的研發實力、台成幹細胞治療中心在幹細胞領域投入多年的豐富臨床經驗、以及永齡健康基金會長期以來在預防醫學與癌症治療領域投注的龐大資源。<br><br>睿田生技從預防醫學的角度出發，由前期的幹細胞、免疫細胞儲存與高端健康管理，全方面做到個人化的健康管理，以逹到精準醫療的目標！
        hr.short.left
        .btn_full.green 認識睿田


      .col_right

        .timelog.active 
          h4.title 2017
          li.active 
            span.month 12
            span.content 一個沒有疾病的新世界
          li 
            span.month 03
            span.content 成為細胞儲存及細胞治療創新研發雙引擎之世界領導品牌
          li 
            span.month 01
            span.content 永齡健康基金會長期以來再預防醫學與癌症治療領域
        .timelog
          h4.title 2016
          li
        .timelog
          h4.title 2015
          li
        .timelog
          h4.title 2014
          li
  

  section.section_blocks
    .container.flex.full
      .block
        .infos
          h3.block_title 理念
          p.block_para 提供高附加價值之個人化細胞儲存商業服務, 以期未來應用於免疫與再生臨床之精準醫療來造福人群。
      .block
        .infos
          h3.block_title 願景
          p.block_para 成為細胞儲存及細胞治療創新研發雙引擎之世界領導品牌。
      .block
        .infos
          h3.block_title 核心價值
          p.block_para 1. 誠信 : 堅持以誠待人、信用至上<br>2. 品質 : 強調追求卓越、精益求精<br>3. 專業 : 強化人員訓練、結合醫療團隊<br>4. 創新 : 重視技術開發、管理服務之創新

  section.section_member
    h2.section_title 董監事
    .container

      .person_box.big.container.flex
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
        .person_box.small.container.flex(v-for="i in 4")
          .btn_expand.cross
          .col_left
            .cover(:style="'background-image: url(\"/img/about/4.jpg\")'")
          .col_right
            
            h5.name 醫師
              span.bigger_text | 李岳庭
            h5.title 專長
            ul
              li 內科疾病之診療與治療
              li 健檢報告之判讀
              li 血液病及整合性化療
            h5.title 學歷
            ul
              li 台北醫學院醫學系畢業
              li 長庚大學臨床醫學研究所碩士
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
      },
      methods: {
        to_href: function(obj) {
          console.log(this);
          if (obj.news_id!=1){
            this$route.router.go("/news/"+obj.news_id);
          }
        }
      },
      computed: Vuex.mapState(['about_logs'])

  }
</script>