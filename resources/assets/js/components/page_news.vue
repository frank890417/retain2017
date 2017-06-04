<template lang="jade">
div.page_news
  section.section_hero
    .container.full.flex
      .col_left
        transition-group(name="fade", mode="out-in")
          div(v-for="(headnews,news_id) in news", :key='headnews', v-if="news_id == head_id")
            h1.title 
              router-link(to="/news/1") {{headnews.title}}
            p {{headnews.content.replace(/\<.*?\>/g,"").slice(0,100)+"..."}}
      .col_right
        ul 
          li(v-for="(a_news,newsid) in news.slice(0,3)", :class="{active: head_id==newsid}", v-on:mouseover=" change_head(newsid)")
            .date {{a_news.date.slice(-5) }}
            .circle
            h4.title {{a_news.title}}
          // li
            .date 10.17
            .circle
            h4.title 幹細胞領域投入多年的豐富臨床經驗
          // li
            .date 8.5
            .circle
            h4.title  永齡健康基金會共同合資的第一家生技公司
    

  section.section_news
    .container.full.flex
      .catabar
        ul.catalist
          li(v-for="cata in catas", :class="{ active :filter == cata }" , @click="filter=cata") {{cata}}
      .area_news
        router-link(:to="'/news/'+a_news.id" v-for="a_news in news.slice(0,6)").news_box
          i.fa.fa-search  
          .date {{a_news.date.slice(-5) }}
          h5.title {{a_news.title}}
          .icon_more
          p.describe {{a_news.content.replace(/\<.*?\>/g,"").slice(0,50)+"..."}}
        
  // section.section_news
    .container.flex.top_out
      ul.nav_line_split.text-center

        li(@click='filter=cata' v-for="cata in catas" v-bind:class='filter==cata?"active":""') {{cata}}
        
    transition-group(name="fade-delay")
      .container.flex(  v-for='cata in catas' v-bind:key="cata" v-if="cata==filter" tag="div")
        .news_box.section_para(v-for='(a_news,id) in filtered_news' v-bind:class="(filter=='全部新聞')?(is_double(id)?'size_2':''):''")
          .cover(:style="bg_css(a_news.cover)") 
          .info
            h5.date {{a_news.date}}
            h3.title {{a_news.title}}
            p {{a_news.content.replace(/<[^>]*>/g, '').substr(0,(is_double(id)&&filter=="全部新聞")?90:45)+'...'}}
          router-link(:to="'/news/'+a_news.id").btn.btn-transparent.ab_center 瞭解更多
    .container.flex
      ul.nav_line_split.text-center.page_nav
        li 上一頁
        li.active 1
        li ...
        li 下一頁
      hr.footer_line
</template>

<script>
import jquery from 'jquery'
window.$=jquery
import slick from 'slick-carousel'
import { mapGetter, mapActions , mapState } from 'vuex'
export default {
    mounted() {
      console.log('news mounted.');
      var vobj=this;
      var loader = setInterval(function(){
        if (vobj.news.length>0){
          $('.slick').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            easing: 'ease-in',
            prevArrow: '<i class="fa fa-angle-left"></i> ',
            nextArrow: '<i class="fa fa-angle-right"></i> '
          });
          clearInterval(loader);
          // vobj.news_delta();
          console.log("news_slick_loaded");
        }
      },100);
      if (this.cataname){
        this.filter=this.cataname;
      }
      // if (Ts) Ts.reload();
    },
    data() {
      return {
        filter: "全部消息",
        head_id: 0,
        catas: ["全部消息","睿田活動","研討會訊息","醫學新知","友善聯結"]
      }
    },
    computed: {
      ...mapState(['news']),
      filtered_news(){
        return this.news.filter(item=>( item.tag == this.filter || this.filter=="全部新聞"));
      },
    },watch: {
      cataname(){
        this.filter=(this.cataname=="全部新聞")?"全部新聞":this.cataname;
      }
    },methods: {
      change_head(id){
        this.head_id=id;
      },
      is_double(id){
        return [0,6,10].indexOf(id)!=-1;
      },bg_css(url){
        return {'background-image': 'url('+url.trim().replace(' ','%20')+')'}
      }
    },
    props: ["cataname"]
}
</script>