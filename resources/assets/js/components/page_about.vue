<template lang="jade">
div.page_about
  section.section_hero
    .container.full.flex
      .col_left.bg_parallax
      .col_right
    .container.container_content
      .col_left          
        h1 關於睿田
        h4.section_eng about Retain Biotech
        h4.section_feature 當高齡化社會已成事實，我們將面臨威脅的不再只有死亡，預先儲存健康，是您最好的對策！ 

        p 睿田生技集結產、學、研三方資源投入，為台灣大學與永齡健康基金會共同合資的第一家生技公司，整合了台灣大學的研發實力、台成幹細胞治療中心在幹細胞領域投入多年的豐富臨床經驗、以及永齡健康基金會長期以來在預防醫學與癌症治療領域投注的龐大資源。<br><br>睿田生技從預防醫學的角度出發，由前期的幹細胞、免疫細胞儲存與高端健康管理，全方面做到個人化的健康管理，以逹到精準醫療的目標！
        .btn 認識睿田


      .col_right

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
</template>

<script>
  import { mapGetter, mapActions , mapState } from 'vuex'
  export default {
      data() {return {
        sel_year: "year_2016"
      }},
      mounted() {
          console.log('about mounted.')
          if (Ts) Ts.reload();
          // if (document.location.hash=="#section_about_log"){
          //   $("html, body").animate({ scrollTop: $(".section_about_log") }, "slow");
          // }
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