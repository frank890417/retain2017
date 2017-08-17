<template lang="jade">
div.container-fluid(v-if="site_data.page_news.news[id]")
  .row
    .col-lg-12
      ol.breadcrumb
        li
          a(href='#')
            svg.glyph.stroked.home
              use(xlink:href='#stroked-home')
        li 
          router-link(to="/news") 新聞管理
        li.active 新聞編輯-{{site_data.page_news.news[id].title}}
  .row
    .col-sm-12
      h1 新聞編輯 - {{site_data.page_news.news[id].title}}
      button.btn.btn-danger.pull-right(@click="save_website_info(site_data)") 儲存變更

  .row
    br
    .panel.panel-primary.col-sm-4
      .panel-heading 文章設定
      editor_form(:dataset="site_data.page_news.news[id]" , :level="1", :schema="'news'",
                    :overwrite="[{key: 'tag',as: '新聞類別', content: {type: 'select',data: site_data.page_news.catas.map(o=>o.tag)}}]" , :prepand_key="'date'",:hidden="['content']" )
    
    .panel.panel-primary.col-sm-8
      .panel-heading 內文編輯
      editor_form(:dataset="site_data.page_news.news[id]" , :level="1", :schema="'news'",
                    :overwrite="[{key: 'tag',as: '新聞類別', content: {type: 'select',data: site_data.page_news.catas.map(o=>o.tag)}}]" , :prepand_key="'date'" ,:shown="['content']")
  
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
    props: ["id"],
    mounted(){
      this.site_data=null
      this.site_data=JSON.parse(JSON.stringify(this.lang)) ;
      this.cancel_remind_save()
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

