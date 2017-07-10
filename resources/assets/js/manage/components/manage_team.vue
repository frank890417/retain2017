<template lang="jade">
div.container-fluid
  .row
    .col-sm-12
      h1 經營團隊 
      button.btn.btn-danger.pull-right(@click="save_website_info(site_data)") 儲存變更
    .col-sm-12
      .panel.panel-primary
        .panel-heading 團隊編輯
        .panel-body(v-if="site_data")
          editor_form(:dataset="site_data.page_about.teams" , :level="1", :schema="'teams'")
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

