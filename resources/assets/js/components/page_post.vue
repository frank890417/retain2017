<template lang="jade">
div.page_post(v-if="newsset")
  .slick(v-if="newsset.carousel")
    section.section_hero(v-if='imgurl' v-for='imgurl in [newsset.cover]')
      //.concat(newsset.carousel)
      .bg.bg_parallax(:style="bg_css(imgurl)") 
      .container.flex
  
  section.section_post
    .container.flex.column
      .top
        .col_left
          h4.info
            router-link(:to="'/news/cata/'+newsset.tag") 研討會訊息
          h4.info(v-text='newsset.date')

          .logos
            i.logo.fa.fa-facebook-square
            i.logo.fa.fa-google-plus-square
            i.logo.fa.fa-linkedin-square
        .col_right
          .post_box
            // h4.tag
              router-link(v-text='newsset.tag' v-bind:to="'/news/cata/'+newsset.tag")
            h1.section_title(v-text='newsset.title')
            p.source 文章來源 
              a(v-html='newsset.author' href="#")
            br
            p(v-html='newsset.content')
            // h5.share 分享文章
              
      .bottom
        .container.flex.row.nav_end(v-if="preset || postset")
          .wrap
            router-link.pre(v-if="preset" ,:to="'/news/n/'+preset.title",:style="bg_css(preset.cover)") 
              h3.guide_text
                span 前一則
                i.fa.fa-angle-left 
              .cover
                h6.date {{preset.date}}
                h3 {{preset.title}}
          .wrap
            router-link.post(v-if="postset",:to="'/news/n/'+postset.title" ,:style="bg_css(postset.cover)") 
              h3.guide_text
                i.fa.fa-angle-right
                span 後一則
              .cover
                h6.date  {{postset.date}}
                h3  {{postset.title}}

      hr
</template>

<script>
import jquery from 'jquery'
window.$=jquery
import slick from 'slick-carousel'
import { mapGetter, mapActions , mapState } from 'vuex'
export default {
    mounted() {
      console.log('post mounted.');
      var vobj=this;
      var loader = setInterval(function(){
        if (vobj.newsset){
          // $('.slick').slick({
          //   autoplay: true,
          //   autoplaySpeed: 5000,
          //   dots: true,
          //   easing: 'ease-in',
          //   prevArrow: '<i class="fa fa-angle-left"></i> ',
          //   nextArrow: '<i class="fa fa-angle-right"></i> '
          // });
          clearInterval(loader);
          console.log("news_slick_loaded");
        }
      },100);
      
      // if (Ts) Ts.reload();
    },
    methods: {
      bg_css(url){
        return {'background-image': 'url('+url.trim().replace(' ','%20')+')'}
      }
    },
    props: ['id','title'],
    computed: {
      news(){
        return this.$t("page_news.news")
      },
      now_id(){
        return ( !isNaN(this.id) && this.id!=-1)?this.id:this.news.findIndex(o=>o.title==this.title)
      },
      //相同類別文章
      same_cata_news(){
        return this.news.filter((o)=>o.tag==this.newsset.tag)
      },
      //相同類別文章-當篇所在id
      same_cata_news_now_id(){
        return this.same_cata_news.findIndex(o=>o==this.newsset)
      },
      //當下新聞
      newsset (){
        var vobj=this;
        if ( !isNaN(this.now_id))
          return this.news?this.news[this.now_id]:null;
        return null
      },
      //上一則新聞(抓同類別文章上一篇 在同類別中的位置-1)
      preset(){
        var vobj=this;
        if ( !isNaN(this.same_cata_news_now_id))
          return this.same_cata_news?this.same_cata_news[this.same_cata_news_now_id-1]:null;
        return null

      },
      //下一則新聞(抓同類別文章下一篇 在同類別中的位置+1)
      postset(){
        var vobj=this;
        if ( !isNaN(this.same_cata_news_now_id))
          return this.same_cata_news?this.same_cata_news[this.same_cata_news_now_id+1]:null;
        return null
        
      }
    }
}
</script>