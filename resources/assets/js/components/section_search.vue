<template lang="jade">
div.section_search
  .navbar-search
    .container.flex.column
      .input_area
        i.fa.fa-search
        input(v-model="filter",v-on:click="show_search = true" placeholder="請輸入關鍵字(例 幹細胞 / 尊榮)... ")
        i.fa.fa-times(v-on:click="hide_search")
      transition(name="fade")
        ul.search_list(v-if="has_match && show_search")
          li(v-for='match in matches' v-if="match.data.length")
            .cata {{match.type}}
            ul.match_list
              li(v-for='d in match.data' ,v-on:click="show_search=false")
                router-link(:to="d.link")
                  .match
                    h5(v-html="d.title")
                    p(v-html="d.content")
          li.search_count
            span 總共有 
            span.color_theme {{match_count}} 
            span 項結果

    
</template>

<script>
  import { mapGetter, mapActions , mapState ,mapMutations} from 'vuex'
  export default {
      data() {
        return {
          filter: "",
          show_search: true
        }
      },
      mounted() {
          console.log('section_search mounted.');
      },
      methods: {
        ...mapMutations(['toggle_search']),
        hide_search(){
          this.toggle_search();
        },
        turn_match(obj){
          var vobj=this;
          return obj.map(
                    (obj)=>{
                      obj.content=obj.content.replace(new RegExp("<.*?>","g"),"");
                      
                      return obj;
                    }
                  )
                  .filter((obj)=>(
                    (obj).content.indexOf(vobj.filter)!=-1 && vobj.filter!=""
                  ))
                  .map(
                    (obj)=>{
                      var st=obj.content.indexOf(vobj.filter)-10>=0?(obj.content.indexOf(vobj.filter)-10):0;
                      var ed=obj.content.indexOf(vobj.filter)+30<obj.content.length?(obj.content.indexOf(vobj.filter)+30):obj.content.indexOf(vobj.filter);
                      obj.content=(obj).content.substr(st,ed-st);
                      return obj;
                    }
                  )
                  .map(
                    (obj)=>{
                      var m=obj.content.match(new RegExp(vobj.filter,"i"));
                      if (m[0]){
                        console.log(m);
                        var highlight_content=obj.content.replace(m[0],"<span class='highlight'>"+m[0]+"</span>");

                        obj.content=highlight_content+"...";
                      }
                      return obj;
                    }
                  );
        }
      },
      computed: {
        matches (){
          var vobj=this;
          return [{
            type: "新聞",
            data: this.turn_match( this.$t("page_news.news")
                  .map(
                    (obj)=>(
                      {
                         id: obj.id,
                         title: obj.title,
                         content: obj.title+obj.content,
                         link: "/news/n/"+obj.title
                      }
                    )
                  ))
                  
          },{
            type: "產品方案",
            data: this.turn_match( this.$t("page_product.products")
                  .map(
                    (obj)=>(
                      {
                         id: obj.id,
                         title: obj.name,
                         content: obj.name+obj.description+obj.schedule+(obj.programs?obj.programs.map((t)=>(t.name+t.description+t.client+(t.contents?t.contents.map(c=>c.name+" - "+c.description).join("  "):''))):[]).join("   "),
                         link: "/solution/"+obj.id
                      }
                    )
                  ))
                  
          },{
            type: "常見問題",
            data: this.turn_match( this.$t("footer.section_question.questions")
                  .map(
                    (obj)=>(
                      {
                         id: obj.id,
                         title: obj.question,
                         content: obj.question+obj.answer,
                         link: "/contact"
                      }
                    )
                  ))
                  
          }];
        },
        has_match(){
          var patt = new RegExp("[a-zA-Z]{1}");
          return this.match_count && !(this.filter.length==1 && patt.test(""+this.filter));
        },
        match_count(){
          return this.matches.map(obj=>obj.data.length).reduce((a,b)=>(a+b));
        },
        ...mapState(['products','news','techs','questions'])
      }
  }
</script>


<style scoped lang="sass">
// color variables
$color_theme: #3FBFBB;
$color_white: #fff;
$color_grey: #555;
$color_grey_light: #777;
$color_grey_dark: #333;
$color_grey_bg: #f4f5f5;
  
  input{
    outline: none;
    background-color: lighten($color_theme,43);
    border-radius: 3px;
    padding: 10px
  }
  .color_theme{
    color: $color_theme;
  }
  .navbar-search{
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 500;

    .input_area{
      width: 100%;
    }
  }
  .search_list{
    width: 100%;
    padding: 24px 0px 0px 0px;
    background-color: #FFF;
    box-shadow: 0px 0px 12px rgba(black,0.1);
    max-height: 70vh;
    overflow-y: scroll;
  }
  .search_list > li{
    display: flex;
    flex-direction: column;
    padding: 10px 0px 0px 0px;
    transition: 0.5s;


    h5{
      margin-bottom: 10px
    }
    h5+p{
      font-size: 14px;
      opacity: 0.8;
    }
    .cata{
      padding-left: 20px;
      color: $color_theme;
      margin-bottom: 15px;
    }
    
    p{
      line-height: 22px;
      letter-spacing: 2px;
    }

    &:last{
      border: none
    }

   
    &.search_count{
      display: block;
      padding: 15px ;
      padding-left: 20px;
      flex-direction: row;
      border:none;
    }
  }
  .match_list{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;

    li{
      padding: 15px 20px;
      transition: 0.5s;
      border-bottom: solid 1px #ddd;

      &:hover{
        background-color: rgba($color_theme,0.1);

      }
    }

    li,.match{
      width: 100%;
      display: block;

    }
  }

</style>

