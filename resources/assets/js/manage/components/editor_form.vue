<template lang='jade'>
.editor_form(:class="level==-1?'panel ':' '+level==-1?'panel-primary ':' '+('level_'+level+' ')+('type_'+dataset_type)")
  .panel-heading(v-if="level==-1") {{panel_heading}}
  div(:class="{'panel-body': level==-1}")
    div(v-for="(data,key) in dataset", 
        v-if="key_info(key).as!='_hidden' && !key_info(key).hidden ",
        :draggable="(dataset instanceof Array) && !array_open[key].status",
        @dragover.prevent="dragover_array", 
        @dragstart="dragstart(key)",
        @drop="drop(key,dataset)",
        )
      .editor_label(v-if="(level!=0) || (typeof data != 'object') ",
            @click="array_open[key].status=!array_open[key].status",
            :class="{curp: (typeof array_open[key]) != 'undefined' }")
        
        span(v-if="dataset instanceof Array", :style="{opacity: array_open[key].status?0.2:1}") 
          i.fa.fa-bars(style="cursor: all-scroll")  
        span(v-if="dataset instanceof Array")
          |  {{ key_info(key).as+1 }}. 
          | {{ data.title || data.name || data.label || data.tag || data.content || data.text || data.question}}
        span(v-if="!(dataset instanceof Array)") 
          | {{ key_info(key).as }}
        span(v-if="schema") 
          | ({{schema}})
        span 
          | {{ array_open[key]?(array_open[key].status?'▲':'▼'):''  }}
        span 
        i.fa.fa-trash.pull-right(@click="splice_array(dataset,key)",
                                 v-if="dataset instanceof Array",
                                 title="拖曳以調換順序")
      transition(name="fade")
        div.editor_inputs(v-show="(array_open[key]?array_open[key].status:false) || !Array.isArray(dataset)")

          //** object editor recursive
          div.container-fluid(v-if="typeof data == 'object' && !Array.isArray(data)")
            .row(v-if="!noextend")
              div(
                    :class="{'col-sm-2': level==0,'col-sm-12': level==1}", 
                    v-if="level==0")
                h3 {{ key_info(key).as}}
              div(:class="{'col-sm-10': level==0,'col-sm-12': level==1}")
                editor_form(
                      :dataset="dataset[key]", 
                      :level="level+1", 
                      :schema="key")
          
          //** array editor recursive
          div.container-fluid(v-else-if="Array.isArray(data)")
            .row(v-if="!noextend" )
              div.col-sm-12(v-if="level==0")
                h3 {{ key_info(key).as}}
              div.col-sm-12
                editor_form(
                      :dataset="dataset[key]", 
                      :level="level+1", 
                      :schema="key")

          //** content tinymce editor
          tiny-mce(
                :id = "'tinymce_'+parseInt(Math.random()*10000000)" , 
                v-model="dataset[key]",
                :other-props="mce_settings.other",  
                :toolbar="mce_settings.mce_toolbar", 
                v-else-if="has_option(key_info(key).options,'mce')")

          //** multi picture editor
          carousel_editor(:carousel_data="dataset[key]",
                          :update_obj="{obj: dataset,tagkey: key}",
                          v-else-if="has_option(key_info(key).options,'multi_pic')")

          //** single picture editor
          carousel_editor(
                :carousel_data="[dataset[key]]",
                :allow_multi="false", 
                :update_obj="{obj: dataset,tagkey: key}", 
                v-else-if="has_option(key_info(key).options,'single_pic')")

          //** btn editor
          div(v-else-if="key == 'btn'")
            .col-sm-4
              editor_form(
                    :dataset="dataset[key]", 
                    :level="level+1", 
                    :schema="key")

          //** boolean editor
          input(
                type="checkbox",
                v-model="dataset[key]", 
                v-else-if="typeof data == 'boolean'")

          //** other long string editor
          textarea.form-control(
                v-model="dataset[key]" , 
                v-else-if="typeof data == 'string' && data.length>40")

          //** other short string editor
          input.form-control(
                v-model="dataset[key]" , 
                v-else)
          button.btn.btn-danger(
                v-if="dataset instanceof Array",
                @click="splice_array(dataset,key)") - 刪除資料
      hr(v-if="dataset instanceof Array")

    button.btn.btn-defalut.form-control.btn_add_new_data(v-if="dataset instanceof Array",@click="dataset.push(get_schema(schema));array_open[dataset.length-1].status=true") + 加入新資料 ({{schema}})
</template>

<script>
  import {mapState,mapMutation} from 'vuex'
  export default {
    name: "editor_form",
    props: ['dataset','level','schema','panel_heading','noextend','hidden'],
    data(){
      return {
        array_open: Array.from({length: 1000},o=>({status: false}) ),
        dragging_id: -1,
        dragging: false,
        key_alias_raw: [
          "title / 標題",
          "eng / 英文",
          "name / 名稱",
          "as / 顯示文字",
          "feature / 副標 / mce",
          "content / 內容 / mce",
          "carousel / 輪播 / multi_pic",
          "btn_more / 按鈕-更多",
          "tag / 標籤",
          "link / 連結",
          "hide_navbar / 於選單隱藏",
          "btn / 按鈕",
          "childs / _hidden",
          "show / 顯示",
          "label / 標籤",
          "left / 左側",
          "right / 右側",
          "description / 描述 / mce",
          "cover / 封面 / single_pic",
          "products / 方案",
          "programs / 專案",
          "product_inform / 方案提醒",
          "yearlog / 年表管理",
          "blocks / 區塊",
          "teams / 團隊",
          "client / 目標對象",
          "contents / 詳細內容",
          "year / 年份",
          "date / 日期",
          "revive_box / 子區塊",

          "more / 更多",
          "questions / 常見問題",

          "question / 問題",
          "answer / 答案",
          "all / _hidden"



        ],
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
          },
          tern: {
            title: "",
            content: ""
          },
          yearlog: {
            year: null,
            date: null,
            content: "",
            link: ""
          },
          news: {
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
          },
          catas: {
            tag: "",
            all: false
          }
        }

      }
    },
    mounted() {
      
    },
    computed: {
      ...mapState(['mce_settings']),
      dataset_type(){
        if (this.dataset instanceof Array)
          return "array"
        return typeof this.dataset
      },
      key_alias(){
        return this.key_alias_raw.map(o=>({
          name: o.split(" / ")[0],as: o.split(" / ")[1] , 
          options: o.split(" / ")[2]?o.split(" / ")[2].split(" "):[],
          hidden: ((this.hidden || []).find(h=>h==o.split(" / ")[0]))?true:false
        }))
      }
    },
    methods:{
      key_info(key){
        let aliasdata = this.key_alias.find(o=>o.name==key)
        return aliasdata? aliasdata : {key,as: key,options: [],hidden: ((this.hidden || []).find(h=>h==key))?true:false}
      },
      has_option(obj,key){
        return obj.find(o=>o==key)?true:false
      },
      get_schema(key){
        let schemadata = this.schemadatas[key]
        console.log(schemadata)
        return schemadata ? JSON.parse(JSON.stringify(schemadata)) : {}
      },
      dragstart(id){
        this.dragging_id=id;
        console.log(id)
      },
      drop(id,arr){
        console.log(arr)
        let temp=arr[id]
        arr[id]=arr[this.dragging_id]
        arr[this.dragging_id]=temp
        // this.questions.forEach((o,i)=>o.ordernum=i)
        this.$forceUpdate()

      },
      dragover_array(evt){
        
        // console.log(evt)
      },
      splice_array(dataset,key){
        if (confirm("你確定要刪除這筆資料嗎？")){
          dataset.splice(key,1)
        }
      }
    }
  }
</script>

<style lang="sass?indentedSyntax">
  .level_1
  .type_array.level_1,.type_array.level_-1,.type_array.level_0
    div>div>.editor_label
      font-size: 20px
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
  i
    font-size: 35px
    cursor: pointer
</style>
