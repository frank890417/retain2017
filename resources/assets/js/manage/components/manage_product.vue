<template lang="jade">
div.container
  .row
    .col-sm-12
      h1 Product manage  
  .panel.panel-primary
    .panel-heading 方案設定
    .panel-body
      //.row(v-if="site_data")
      //  editor_form(:dataset="site_data.page_product" , :level="0")
      .row
        editor_form(:dataset="site_data.page_product.products" , :level="-1", panel_heading="'方案編輯'")

  
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

