<template lang="jade">
div.page_solution
  section.section_hero
    .container.flex
      .col_left
        h1.section_title 產品方案與研發
        h4.section_eng premium solutions
        p.section_para 睿田生技公司客服專員將會提供您完整的資訊與諮詢服務，待您完全了解儲存過程後，將會安排儲存前的健康評估。
        
        button 服務流程介紹
      .col_right
        ul
          li 高品質尊榮服務
          li 國際認證
          li 專業服務
          li 量身定做
  section.section_solution
    .main_info
      .container.flex
        .cover(:style="bg_css('/img/product/3.jpg')")
        .info
          h3.title 鴻海三心專案
          .description 睿田提供國際認證品質之際包檢驗、運送與儲存服務
        .btn_expand.cross
  section.section_solution.active
    .main_info
      .container.flex
        .cover(:style="bg_css('/img/product/3.jpg')")
        .info
          h3.title 企業尊榮專案
          .description 睿田提供國際認證品質之際包檢驗、運送與儲存服務
        .btn_expand.cross
    .container
      ul.program_list
        li 
          .tag 
            span A
          h4.program_title 健康早鳥組合方案
          .btn_expand
            i.fa.fa-angle-down

        li 
          .tag 
            span B
          h4.program_title 資深好鳥組合方案
          .btn_expand
            i.fa.fa-angle-down
        li.active 
          .tag 
            span C
          h4.program_title 父親節方案
          .btn_expand
            i.fa.fa-angle-down
          .program_box
            .top.container.flex
              .col_left
                h5.program_sub_title 方案介紹
                p 細胞的健康狀況隨著年紀增長、生活型態、工作壓力而受影響，也就是俗稱的老化現象。老化並不可怕，可怕的是因為老化而衍生出的疾病，例如:神經細胞退化造成的阿茲默症…等。我們無法阻止時間前進、也無法停止老化、但是我們將年輕的細胞凍存，保持細胞狀態在儲存的當下，在未來有需要的時候能有多一項工具可以使用。
              
                h5.program_sub_title 建議對象
                p 細胞的健康狀況隨著年紀增長、生活型態、工作壓力而受影響，也就是俗稱的老化現象。老化並不可怕，可怕的是因為老化而衍生出的疾病，例如:神經細胞退化造成的阿茲默症…等。
              .col_right
                h5.program_sub_title 方案內容
                ul.service_type
                  li 
                    .toggle_part 免疫細胞儲存
                    .info_part
                      p 細胞的健康狀況隨著年紀增長、生活型態、工作壓力而受影響，也就是俗稱的老化現象。老化並不可怕，可怕的是因為老化而衍生出的疾病，例如:神經細胞退化造成的阿茲默症…等。我們無法阻止時間前進、也無法停止老化
                    .btn_expand
                  li.active
                    .toggle_part 幹細胞儲存
                    .info_part
                      p 細胞的健康狀況隨著年紀增長、生活型態、工作壓力而受影響，也就是俗稱的老化現象。老化並不可怕，可怕的是因為老化而衍生出的疾病，例如:神經細胞退化造成的阿茲默症…等。我們無法阻止時間前進、也無法停止老化
                    .btn_more 了解更多
                  li 
                    .toggle_part健康假期
            .more_info 預約及諮詢本方案內容，請直撥客服中心 0800-080688
        li 
          .tag 
            span D
          h4.program_title 美麗無限方案
          .btn_expand
            i.fa.fa-angle-down

  section.section_solution
    .main_info
      .container.flex
        .cover(:style="bg_css('/img/product/3.jpg')")
        .info
          h3.title 海外服務專案
          .description 睿田提供國際認證品質之際包檢驗、運送與儲存服務
        .btn_expand.cross


  
</template>

<script>
    import { mapGetter, mapActions , mapState } from 'vuex'
    export default {
        data(){
          return {
            timer_list: []
          }
        },
        methods: {
          bg_css(url){
            return {
              'background-image': "url("+url+")"
            }
          }
        },
        mounted() {
            
        },beforeDestroy() {
        },
        props: ['id'],
        computed: mapState(['solutions'])
    }
</script>