<template lang="jade">
div
  transition(name="fade")
    .fullnav(v-if="open_full")
      .close_btn(@click="toggle_open", :class="{open: open_full}")
      .container
        img.headerimg(src="/img/Retain.png")
        ul.functions
          li.function.func_lang
            a(href="#")
            div.lang_options
              li(v-for = "l in lang")
                router-link(to="#") {{l.name}}
          li.function.func_size(@click='toggle_size')
            img.icon_big(src="/img/icon_word_big.svg", v-show="!big_font")
            img.icon_small(src="/img/icon_word_small.svg", v-show="big_font")
        //所有區域點擊都可以切換漢堡
        ul.main_list(@click="toggle_open(250)")
          li(v-for="main_tag in maked_nav_structure")
            //沒有連結的主選單
            h4(v-if="main_tag.link=='#'")
              span {{main_tag.tag}}
            h4(v-else)
              router-link(v-if="",:to="main_tag.link" ) {{main_tag.tag}}
            //子項目
            ul.sub_list(v-if="main_tag.childs && main_tag.childs.length>0")
              li(v-for="sub_tag in main_tag.childs")
                router-link( :to="sub_tag.link") {{sub_tag.tag}}

  nav.navbar(:class="{search: search,at_top: scrollTop<=0}")
    .container
      .row
        div.nav-leftpart
          //logo          
          .navbar-header.col-sm-3
            router-link.navbar-brand(to="/")
              img.logo(src="/img/Retain.png")
          .navbar-search-input
            section_search

          // 使用 nav_structure自動產生選單
          ul.navbar-nav.navbar-left.text-left
            li(v-for = "main_tag in maked_nav_structure"
               v-if = "!main_tag.hide_navbar")

              //選擇性產生router-link或a(#)
              a(v-if = "main_tag.link=='#'",href = "#") {{main_tag.tag}}

              router-link(:to = "main_tag.link" v-if = "main_tag.link!='#'") {{main_tag.tag}}

              //子選單
              ul.subnav(v-if = "main_tag.childs && main_tag.childs.length>0")
                .container.flex
                  div.options
                    li(v-for = "(sub_tag,sub_id) in main_tag.childs")
                      router-link(:to = "sub_tag.link") {{sub_tag.tag}}

        //右半部語言跟功能選單
        ul.nav.navbar-nav.navbar-right
          li.function.func_lang
            a(href="#")
              span {{langtext}}
              i.fa.fa-angle-down 
            ul.lang_subnav
              .container
                div.options
                  li(v-for = "l in langs")
                    a(:href="l.link") {{l.name}}
          li.function.func_search
            i.fa.fa-search(@click="toggle_search")
          li.function.func_size(@click='toggle_size')
            img.icon_big(src="/img/icon_word_big.svg", v-show="!big_font")
            img.icon_small(src="/img/icon_word_small.svg", v-show="big_font")

          li.nav_open.func_burger(@click="toggle_open(0)")
            i.fa.fa-bars

</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        mounted() {
            console.log('navbar mounted.');

            //update subnav position
            
            this.place_sub_nav();
            window.place_sub_nav=this.place_sub_nav;
            $(window).resize(this.place_sub_nav);

            
        },
        data(){
          return {
            open_full: false,
            open_lang: false,
            langs: [
              { 
                name: "繁",
                link: "/zh"
              },
              {
                name: "简",
                link: "/cn"
              },
              {
                name: "EN",
                link: "/en"
              }]
          }
        },
        watch:{
          scrollTop(){
            this.place_sub_nav();
            if (this.scrollTop<=0){
              setInterval(function(){
                
                this.place_sub_nav();
              },500);
            }
          }

        },
        methods:{
          toggle_open(sec){
            setTimeout(()=>{
              this.open_full=!this.open_full;
            },sec)
          },
          place_sub_nav(){
            $(".navbar-nav > li").each(function(index,obj){
              // console.log(index);
              var li_width=$(obj).width();
              var container=$(obj).children(".subnav").children(".container");
              var content=container.children(".options");
              // var align_obj=$(obj);
              var align_obj=$(".navbar-nav > li:first");
              
              container.css("padding-left",(align_obj.offset().left)+"px");
              container.css("margin-left","0px");
              container.css("white-space","nowrap");

              if (content.width()>600){
                container.css("padding-left","calc(50vw - "+li_width+"px)");
                content.css("transform","translateX(-50%)")
              }
            });
          },
          ...mapMutations(['toggle_size','toggle_search'])
        },
        computed: {
          ...mapState(["solutions","big_font","search","scrollTop","lang"]),

          maked_nav_structure(){
            return this.$t("nav_structure")
        },
        langtext (){
          switch(window.locale){
            case "cn":
              return "簡"
            case "zh":
              return "繁"
            case "en":
              return "EN"
          }
        }
      }
  }
</script>
