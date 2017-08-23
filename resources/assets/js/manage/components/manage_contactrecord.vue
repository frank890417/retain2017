<template lang="jade">
div.container-fluid
  .row
    .col-sm-12
      h1 聯繫
      
  .panel.panel-primary.col-sm-12
    .panel-heading 聯絡記錄
    .panel-body
      vue_lazy_table(:table_data="crecords",
                     :rows="tableRows")

                            
</template>


<script>
import Vue from 'vue'
import Axios from 'axios'
import vue_lazy_table from './vue_lazy_table'

import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return {
        crecords: [],
        tableRows: [
          "id -> #",
          "name -> 名字",
          "email -> 信箱",
          "ask_item_name -> 詢問項目",
          "phone -> 電話",
          "content -> 聯繫內容",
          "created_at -> 聯繫時間",
          "updated_at -> __hide"
        ]
      }
    },
    mounted(){
      let _this = this
      Axios.get('/api/contactrecord').then((res)=>{
        _this.crecords=res.data
      })
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

