<template lang="jade">
div.container-fluid

  .col-lg-12
    h1.page-header 網站資訊
      .btn.btn-danger.pull-right(@click="save_website_info(site_data)") 儲存更新

  .row(v-if="site_data")
    .col-lg-6
      .panel.panel-primary
        .panel-heading 網站資訊
        .panel-body
          .form-group
            label 公司地址與資料
            div(v-for="(loc,id) in site_data.footer.section_company.locations")
              .col-sm-2
                h4 {{id+1}}-{{loc.location}}
              .col-sm-10
                .form-inline
                  label 位置
                  input.form-control(v-model="loc.location")
                .form-inline
                  label 縣市
                  input.form-control(v-model="loc.county")
                .form-inline
                  label 電話
                  input.form-control(v-model="loc.phone")
                .form-inline
                  label 地址
                  input.form-control(v-model="loc.address",style="width: 80%")
              button.btn.btn-secondary(@click="site_data.footer.section_company.locations.splice(id,1)") - 刪除位置({{loc.location}})
          br
          button.btn.btn-default(@click="site_data.footer.section_company.locations.push({name: '',icon: ''})") + 新增位置
    
    .col-lg-6
      .panel.panel-primary
        .panel-heading 社群連結
        .panel-body
          .form-group
            .col-sm-12
              span 預覽:
                a(v-for="social in site_data.footer.section_company.social" ,:href="social.url?social.url:'#'", v-if="social.url && social.url!=''", target="_blank")
                  i.social_icon(v-if="social.icon.indexOf('fa.')==0" ,:class="social.icon.indexOf('fa.')==0?[social.icon.split('fa.')[1],'fa']:[]", style="color: black;padding: 5px;")
                  img.social_icon(v-else, :src="social.icon")
              hr
              label 平台編輯
              select(v-model="now_social_id")
                option(v-for="(s,id) in site_data.footer.section_company.social" , :value = "id") {{s.name}}
              br
            div(v-for="(social,id) in [site_data.footer.section_company.social[now_social_id]]")
              .col-sm-2
                h4 {{social.name}}
                //button.btn.btn-secondary(@click="site_data.footer.section_company.social.splice(id,1)") -
              .col-sm-10
                .form-group
                  label 名稱
                  input.form-control(v-model="social.name")
                .form-group
                  
                  label icon
                  input.form-control(v-model="social.icon")

                .form-group
                  label 連結
                  input.form-control(v-model="social.url")
                hr

    .col-lg-6
      .panel.panel-primary
        .panel-heading 合作夥伴
        .panel-body
          .form-group
            label 合作夥伴資料
            editor_form(:dataset="site_data.footer.section_partner.partners" , :schema="'partners'")
            //div(v-for="(partner,id) in site_data.footer.section_partner.partners")
              .form-inline
                label 名稱
                input.form-control(v-model="partner.name")
                label icon
                //input.form-control(v-model="partner.icon", style="width: 40%")
                input(v-model="partner.icon")
                carousel_editor(:carousel_data="[partner.icon]",:allow_multi="false", :update_obj="{obj: partner,tagkey: 'icon'}")
                button.btn.btn-secondary(@click="site_data.footer.section_partner.partners.splice(id,1)") - 刪除 {{partner.name}}
              hr
            br
            button.btn.btn-default(@click="site_data.footer.section_partner.partners.push({name: '',icon: ''})") + 新增夥伴
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
        now_social_id: 0
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
  .editor_label
    min-width: 50px
    margin-top: 10px
    margin-bottom: 10px
  input
    margin-bottom: 10px
  input[type="checkbox"]
    font-size: 40px
    margin-left: 10px
  textarea
    min-height: 100px

  .curp
    cursor: pointer
    *
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

