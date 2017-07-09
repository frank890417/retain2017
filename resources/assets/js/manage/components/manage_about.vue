<template lang="jade">
div.container-fluid
  .row
    .col-sm-12
      h1 關於 
    .col-sm-3
      .panel.panel-primary
        .panel-heading 關於
        .panel-body(v-if="site_data")
          editor_form(:dataset="site_data.page_about" , :level="1", :noextend="true")
    .col-sm-9
        .panel-heading 年表編輯
        .panel-body(v-if="site_data")
          editor_form(:dataset="site_data.page_about.yearlog" , :level="1")
                  

    
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

