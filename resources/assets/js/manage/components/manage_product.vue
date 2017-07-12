<template lang="jade">
div.container-fluid(v-if="site_data")
  .row
    .col-sm-12
      h1 產品方案
      button.btn.btn-danger.pull-right(@click="save_website_info(site_data)") 儲存變更
  .col-sm-3
    .panel.panel-primary
      .panel-heading 頁面內容 
      .panel-body
        editor_form(:dataset="site_data.page_product" , :level="1", noextend="true" ,:hidden="['features','products','btn','solution_inform']")
    .panel.panel-primary
      .panel-heading 按鈕 
      .panel-body
        editor_form(:dataset="site_data.page_product.btn" , :level="1")

  .col-sm-9
    editor_form(:dataset="site_data.page_product.features" , :level="-1", panel_heading="特色編輯", :schema="'features'")
    editor_form(:dataset="site_data.page_product.products" , :level="-1", panel_heading="方案編輯", :schema="'products'")
    editor_form(:dataset="site_data.page_product.product_inform.informs" , :level="-1", panel_heading="提醒編輯", :schema="'informs'")
  
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

