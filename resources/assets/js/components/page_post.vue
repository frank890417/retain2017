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
            router-link.pre(v-if="preset" ,:to="'/news/'+(parseInt(id)-1)",:style="bg_css(preset.cover)") 
              h3.guide_text
                span 前一則
                i.fa.fa-angle-left 
              .cover
                h6.date {{preset.date}}
                h3 {{preset.title}}
          .wrap
            router-link.post(v-if="postset",:to="'/news/'+(parseInt(id)+1)" ,:style="bg_css(postset.cover)") 
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
    props: ['id'],
    computed: {
      news(){
        return this.$t("page_news.news")
      },
      newsset (){
        var vobj=this;
        return this.news?this.news[parseInt(this.id)]:null;
      },
      preset(){
        var vobj=this;
        return this.news?this.news[parseInt(this.id)-1]:null;

      },
      postset(){
        var vobj=this;
        return this.news?this.news[parseInt(this.id)+1]:null;
        
      }
    }
}
</script>