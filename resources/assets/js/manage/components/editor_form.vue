<template lang='jade'>
.editor_form(:class="{'panel': level==-1,'panel-primary': level==-1}")
  .panel-heading(v-if="level==-1") {{panel_heading}}
  div(:class="{'panel-body': level==-1}")
    div(v-for="(data,key) in dataset", v-if="key_info(key).as!='_hidden'")
      label(v-if="(level!=0) || (typeof data != 'object')")

        span(v-if="dataset instanceof Array") {{ key_info(key).as+1 }}. 
        span(v-if="!(dataset instanceof Array)") {{ key_info(key).as }}
        span(v-if="dataset instanceof Array") {{ data.title || data.name || data.label || data.tag }}
        span(v-if="schema") ({{schema}})


      
      div.container-fluid(v-if="typeof data == 'object'")
        .row
          div(:class="{'col-sm-2': level==0,'col-sm-12': level==1}", v-if="level==0")
            h3 {{ key_info(key).as}}
          div(:class="{'col-sm-10': level==0,'col-sm-12': level==1}")
            editor_form(:dataset="dataset[key]", :level="level+1", :schema="key")

      tiny-mce(:id = "'tinymce_'+parseInt(Math.random()*10000000)" , v-model="dataset[key]",
              :other-props="mce_settings.mce_plugin",  :toolbar="mce_settings.mce_toolbar", v-else-if="has_option(key_info(key).options,'mce')")
      div(v-else-if="key == 'btn'")
        .col-sm-4
          editor_form(:dataset="dataset[key]", :level="level+1", :schema="key")

      input(type="checkbox",v-model="dataset[key]", v-else-if="typeof data == 'boolean'")
      input.form-control(v-model="dataset[key]" , v-else)
      button.btn.btn-danger(v-if="dataset instanceof Array",@click="dataset.splice(key,1)") - 刪除資料
      hr(v-if="dataset instanceof Array")
    button.btn.btn-defalut.form-control.btn_add_new_data(v-if="dataset instanceof Array",@click="dataset.push(get_schema(schema))") + 加入新資料 ({{schema}})
</template>

<script>
  import {mapState,mapMutation} from 'vuex'
  export default {
    name: "editor_form",
    props: ['dataset','level','schema','panel_heading'],
    data(){
      return {
        key_alias: [
          "title / 標題",
          "eng / 英文",
          "name / 名稱",
          "as / 顯示文字",
          "feature / 副標 / mce",
          "content / 內容 / mce",
          "carousel / 輪播",
          "btn_more / 按鈕-更多",
          "tag / 標籤",
          "link / 連結",
          "hide_navbar / 於選單隱藏",
          "btn / 按鈕",
          "childs / _hidden",
          "show / 顯示",
          "label / 文字",
          "left / 左側",
          "right / 右側",
          "description / 描述",
          "cover / 封面",
          "products / 方案",
          "programs / 專案",
          "product_inform / 方案提醒"



        ].map(o=>({
          name: o.split(" / ")[0],as: o.split(" / ")[1] , 
          options: o.split(" / ")[2]?o.split(" / ")[2].split(" "):[]  
        })),

        schemadatas: {
          products: {
            name: "",
            description: "",
            cover: "",
            programs: []
          },
          programs: {
            label: "",
            name: "",
            description: "",
            client: "",
            contents: []
          },
          contents: {
            name: "",
            description: "",

          },
          features: {
            title: "",
            content: "",

          },
          team: {
            name: "",
            logo: "",
            link: ""
          }
        }

      }
    },
    mounted() {
      
    },
    computed: {
      ...mapState(['mce_settings']),
    },
    methods:{
      key_info(key){
        let aliasdata = this.key_alias.find(o=>o.name==key)
        return aliasdata? aliasdata : {key,as: key,options: []}
      },
      has_option(obj,key){
        return obj.find(o=>o==key)?true:false
      },
      get_schema(key){
        let schemadata = this.schemadatas[key]
        console.log(schemadata)
        return schemadata ? JSON.parse(JSON.stringify(schemadata)) : {}
      }
    }
  }
</script>

<style lang="sass?indentedSyntax">
  .editor_form
    border: solid 1px #ddd
    padding: 10px
    &.panel
      padding: 0
  .btn_add_new_data
    cursor: pointer
    background-color: #eee
    &:hover
      background-color: #ddd
</style>
