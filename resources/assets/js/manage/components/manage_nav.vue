<template lang="jade">
div.container-fluid(v-if="site_data")
  .row
    .col-sm-12
      h1 導覽列設定 
      button.btn.btn-danger.pull-right(@click="save_website_info(site_data)") 儲存變更
  .panel.panel-primary
    .panel-heading 導覽列設定
    .panel-body
      .row(v-if="site_data")
        .col-sm-4(v-for="(route,id) in site_data.nav_structure")
          .form-group
            h3 {{id+1}}. {{route.tag}} 
              .btn.btn-default(@click="site_data.nav_structure.splice(id,1)") 刪除
            editor_form(:dataset="route" , :level="0")
  
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

  .curp
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

