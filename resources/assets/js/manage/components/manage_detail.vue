<template lang="jade">
div.container-fluid(v-if="site_data")
  .row
    .col-lg-12
      ol.breadcrumb
        li
          a(href='#')
            svg.glyph.stroked.home
              use(xlink:href='#stroked-home')
        li.active
          router-link(to="/news") 雜項管理
  .row
    .col-sm-12
      h1 雜項編輯
      v-json-editor(:data = "site_data",
                                :editable="true",
                                @change="$forceUpdate()")

  .row
    .col-sm-12
      button.btn.btn-danger.pull-right(@click="save_website_info(site_data)") 儲存變更
    
      
</template>


<script>
import Vue from 'vue'
import vue_json_editor_block_view from './vue-json-editor-block-view'

Vue.use(vue_json_editor_block_view);
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
    },
    components: {
      vue_json_editor_block_view
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

