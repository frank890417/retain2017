<template lang="jade">
div.container-fluid(v-if="site_data")
  .row
    .col-sm-12
      h1 首頁編輯
      button.btn.btn-danger.pull-right(@click="save_website_info(site_data)") 儲存變更
  .row
    .panel.panel-primary
      .panel-heading 首頁編輯
      .panel-body 
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
          .row(v-for="sec in [site_data.page_index.section_6]")
            .col-sm-2
              h3 介紹-4
            .col-sm-10
              editor_form(:dataset="sec" , :level="0")
  
  .row
    .col-sm-12
      button.btn.btn-danger.pull-right(@click="save_website_info(site_data)") 儲存變更
      
</template>

<script>
import Vue from 'vue'
import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return {
        site_data: null,
      }
    },
    mounted(){
      this.site_data=null
      this.site_data=JSON.parse(JSON.stringify(this.lang)) ;
      this.cancel_remind_save()
    },
    watch: {
      site_data: {
        handler: function (val, oldVal) {
          console.log("old",oldVal)
          if (oldVal)
            this.remind_save()
        },
        deep: true
      }
      
    },
    computed: {
      ...mapState(['lang'])
    },
    methods: {
      ...mapMutations(['save_website_info','remind_save','cancel_remind_save'])
    }
  }

</script>

<style lang="sass?indentedSyntax">
  .editor_label
    min-width: 50px
    margin-top: 10px
    margin-bottom: 10px
  input
    margin-bottom: 10px
  input[type="checkbox"]
    font-size: 40px
    margin-left: 10px
  textarea
    min-height: 100px

  .curp
    cursor: pointer
    *
      cursor: pointer

  .fade-enter-active,.fade-leave-active
    transition: .5s

  .fade-enter,.fade-leave-to
    opacity: 0
    max-height: 0px
    overflow: hidden
  .fade-enter-to,.fade-leave
    opacity: 1
    max-height: 2500px
  


</style>

