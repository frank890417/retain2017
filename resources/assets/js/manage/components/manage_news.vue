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
      .btn.btn-default(@click="createNews") 新增新聞
      vue_lazy_table(:table_data="site_data.page_news.news",
                     :rows="tableRows",
                     :deleteMethod="deleteNews",
                     :editMethod="editNews")
      //table.table
        thead
          th #
          th 標題
          th 編輯
          th 刪除
        tbody
          tr(v-for="(n,nid) in site_data.page_news.news")
            td {{nid+1}}
            td {{n.title}}
            td
              router-link.btn.btn-default(:to="'/news/'+nid") 編輯
            td
              .btn.btn-danger(@click="deleteNews(nid)") 刪除
      // editor_form(:dataset="site_data.page_news.news" , :level="1", :schema="'news'",
                   :overwrite="[{key: 'tag',as: '新聞類別', content: {type: 'select',data: site_data.page_news.catas.map(o=>o.tag)}}]" , :prepand_key="'date'" )
  
  .row
    .col-sm-12
      button.btn.btn-danger.pull-right(@click="save_website_info(site_data)") 儲存變更
    
      
</template>


<script>
import Vue from 'vue'
import vue_lazy_table from './vue_lazy_table'
import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return {
        site_data: null,
        tableRows: [
          "id -> #",
          "tag -> 類別",
          "title -> 標題",
          "cover -> __hide",
          "content -> __hide",
          "created_at -> __hide",
          "updated_at -> __hide",
          "carousel -> __hide",
          "author_link -> __hide",
          "author -> 轉載"
        ]
      }
    },
    mounted(){
      this.site_data=null
      this.site_data=JSON.parse(JSON.stringify(this.lang)) ;
      this.cancel_remind_save()
    },
    computed: {
      ...mapState(['lang']),
     
    },
    methods: {
      ...mapMutations(['save_website_info','save_website_info_silent','remind_save','cancel_remind_save'])
      ,
      deleteNews(nid){
        if (confirm("確認要刪除這則新聞嗎(無法復原)？")){
          this.site_data.page_news.news.splice(nid,1);
          this.save_website_info_silent(this.site_data)
        }
      },
      editNews(nid){
        this.$router.push('/news/'+nid)
      },
      createNews(){
        let template = {
            tag: "",
            date: "",
            title: "",
            cover: "",
            author: "",
            content: "",
            created_at: "",
            updated_at: "",
            carousel: [],
            author_link: "",
          };
        let nid = this.site_data.page_news.news.push(template)-1
        this.save_website_info_silent(this.site_data)
        this.editNews(nid)

      }
    },
    components: {
      vue_lazy_table
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

