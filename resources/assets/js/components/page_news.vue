<template lang="jade">
div.page_news
  section.section_hero
    .container.full.flex
      
      .col_left( :style="{'background-image': 'url('+news[head_id].cover+')'}")
        transition-group(name="fade", mode="out-in")
          div(v-for="(headnews,news_id) in filtered_news", :key='headnews', v-if="news_id == head_id")
            h1.title 
              router-link(:to="'/news/n/'+headnews.title") {{headnews.title}}
            p {{headnews.content.replace(/\<.*?\>/g,"").replace('&nbsp;','').slice(0,100)+"..."}}
            //.btn.btn-default 了解更多
            router-link.btn-underline.white_outline(v-if="$t('page_index.section_5.btn.show')",:to="'/news/n/'+headnews.title") 了解更多
      .col_right(:class="{fullnews: filtered_news.slice(0,5).length>=5 ,at_top:scrollTop<=0}")
        ul
          router-link(v-for="(a_news,newsid) in filtered_news.slice(0,5)", :to="'/news/n/'+a_news.title")
            li.container.flex(:class="{active: head_id==newsid}", 
                              v-on:mouseover=" change_head(newsid)")
              .date {{ a_news.date.slice(-5) }}
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
        ul.catalist(v-if="catas")
          li(v-for="cata in filtered_catas", :class="{ active :filter == cata }" , @click="filter=cata") {{cata.tag}}
      
      transition-group(tag="ul" , name="fade-delay" , mode="out-in").area_news
        router-link(:to="'/news/n/'+a_news.title",
                    v-for="(a_news,id) in filtered_news",
                    :key="a_news",
                    :style="{'background-image':`url(${a_news.cover})`}" ).news_box
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
    metaInfo: {
      title: "最新消息",
      titleTemplate: "%s - 睿田生技 Retain Biotech"
    },
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
        this.filter=this.catas.find(o=>o.tag==this.cataname);
      }
      // if (Ts) Ts.reload();
    },
    data() {
      return {
        filter: {
          tag: ""
        },
        head_id: 0,
        catas: this.$t("page_news.catas"),
        show_num: 7,
        can_load_more: true,
      }
    },
    computed: {
      ...mapState(['scrollTop']),
      news(){
        return this.$t("page_news.news")
      },
      filtered_news(){
        return this.sorted_news.filter(item=>( item.tag == this.filter.tag || this.filter.all));
      },
      sorted_news(){
        return this.news.sort((a,b)=>{
          let a_text = (""+a.date).replace(/-/g,"")
          let b_text = (""+b.date).replace(/-/g,"")
          return parseInt(b_text)-parseInt(a_text)
        })
      },
      filtered_catas(){
        //根據cata包一個物件，filter掉沒有對應新聞的分類後解開物件
        return this.catas.map(cata=>({
          cata: cata,
          newscount: this.sorted_news.filter(item=>( item.tag == cata.tag || cata.all)).length
        }))
        .filter(item=>item.newscount)
        .map(o=>o.cata)
      }
    },watch: {
      cataname(){
        this.filter=this.catas.find(o=>o.all)
      }
    },methods: {
      change_head(id){
        this.head_id=id;
      },
      is_double(id){
        return [0,6,10].indexOf(id)!=-1;
      },bg_css(url){
        return {'background-image': 'url('+url.trim().replace(' ','%20')+')'}
      },
    },
    props: ["cataname"]
}
</script>