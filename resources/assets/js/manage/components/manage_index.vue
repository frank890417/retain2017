<template lang="jade">
div.container
  .row
    .col-sm-12
      h1 Index manage  
  .panel.panel-primary
    .panel-heading 導覽列設定
    .panel-body
      .row(v-if="site_data")
        .col-sm-4(v-for="(route,id) in site_data.nav_structure")
          .form-group
            h3 {{id+1}}. {{route.tag}}
            editor_form(:dataset="route" , :level="0")
            // .form-inline
            //   label 標題
            //   input.form-control(v-model="route.tag")
            // .form-inline
            //   label 連結
            //   input.form-control(v-model="route.link")
            // .form-inline
            //   label 隱藏
            //   input.form-control(type="checkbox" ,v-model="route.hide_navbar")
            //.form-inline
              label 子連結
              input.form-control(v-model="route.childs")
    
    .panel.panel-primary
      .panel-heading 導覽列設定
      .panel-body 首頁編輯
        .col-sm-12
          .row
            .col-sm-12
              h2 首頁編輯
          .row(v-for="sec in [site_data.page_index.section_hero]")
            .col-sm-2
              h3 首頁區域
            .col-sm-10
              .form-group
                editor_form(:dataset="sec" , :level="0")
          .row(v-for="sec in [site_data.page_index.section_1]")
            editor_form(:dataset="sec" , :level="0")
          .row(v-for="sec in [site_data.page_index.section_2]")
            .col-sm-2
              h3 左右卡片介紹
            .col-sm-10
              editor_form(:dataset="sec" , :level="0")
          .row(v-for="sec in [site_data.page_index.section_3]")
            .col-sm-2
              h3 介紹-1
            .col-sm-10
              editor_form(:dataset="sec" , :level="0")
          .row(v-for="sec in [site_data.page_index.section_4]")
            .col-sm-2
              h3 介紹-2
            .col-sm-10
              editor_form(:dataset="sec" , :level="0")
          .row(v-for="sec in [site_data.page_index.section_5]")
            .col-sm-2
              h3 介紹-3
            .col-sm-10
              editor_form(:dataset="sec" , :level="0")


  
  .row
    .col-sm-12
      .form-group
        h3 123
        
  pre {{ site_data }}

    
</template>

<script>
import Vue from 'vue'
import {mapState,mapMutation} from 'vuex'
  export default {
    data(){
      return {
        site_data: null
      }
    },
    mounted(){
      this.site_data=JSON.parse(JSON.stringify(this.lang)) ;
    },
    computed: {
      ...mapState(['lang'])
    }
  }

</script>

<style lang="sass?indentedSyntax">
  label
    min-width: 50px
    margin-top: 10px
  input[type="checkbox"]
    font-size: 40px
    margin-left: 10px

</style>

