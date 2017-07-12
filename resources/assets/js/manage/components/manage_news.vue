<template lang="jade">
div.container-fluid
  .row
    .col-sm-12
      h1 最新消息 
      button.btn.btn-danger.pull-right(@click="save_website_info(site_data)") 儲存變更
  .panel.panel-primary.col-sm-3
    .panel-heading 類別
    .panel-body(v-if="site_data")
      editor_form( :dataset="site_data.page_news.catas" , 
                   :level="1", 
                   :schema="'catas'" , 
                   :hidden="['all']")
  .panel.panel-primary.col-sm-9
    .panel-heading 新聞
    .panel-body(v-if="site_data")
      editor_form(:dataset="site_data.page_news.news" , :level="1", :schema="'news'",
                   :overwrite="[{key: 'tag',as: '新聞類別', content: {type: 'select',data: site_data.page_news.catas.map(o=>o.tag)}}]" )
  
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
  label
    min-width: 50px
    margin-top: 10px
  input[type="checkbox"]
    font-size: 40px
    margin-left: 10px

</style>

