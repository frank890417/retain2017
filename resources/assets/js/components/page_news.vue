<template lang="jade">
div.page_news
  section.section_hero
    .container.full.flex
      .col_left
        h1.title 永齡基金會玩具義診 搜出8種有害塑化劑
        p 睿田生技集結產、學、研三方資源投入，為台灣大學與永齡健康基金會共同合資的第一家生技公司，整合了台灣大學的研發實力、台成幹細胞治療中心在幹細胞領域投入多年的豐富臨床經驗

      .col_right
        ul 
          li.active
            .date 12.05
            .circle
            h4.title 永齡基金會玩具義診
          li
            .date 10.17
            .circle
            h4.title 幹細胞領域投入多年的豐富臨床經驗
          li
            .date 8.5
            .circle
            h4.title  永齡健康基金會共同合資的第一家生技公司
    

  section.section_news
    .container.full.flex
      .catabar
        ul.catalist
          li 全部消息
          li.active 睿田活動
          li 研討會訊息
          li 醫學新知
          li 友善聯結
      .area_news
        .news_box
          i.fa.fa-search  
          .date 05.21
          h5.title 成為細胞儲存及細胞治療創新研發雙引擎知識界領導品牌
          .icon_more
          p.describe 睿田生技集結產、學、研三方資源投入，為台灣大學與永齡健康基金會共同合資的第一家生技公司，整合了台灣大學的研發實力、台成幹細胞治療中心在幹細胞領域投入多年的豐富臨床經驗
        .news_box
          i.fa.fa-search  
          .date 05.21
          h5.title 成為細胞儲存及細胞治療創新研發雙引擎知識界領導品牌
          .icon_more
          p.describe 睿田生技集結產、學、研三方資源投入，為台灣大學與永齡健康基金會共同合資的第一家生技公司，整合了台灣大學的研發實力、台成幹細胞治療中心在幹細胞領域投入多年的豐富臨床經驗
        .news_box
          i.fa.fa-search  
          .date 05.21
          h5.title 成為細胞儲存及細胞治療創新研發雙引擎知識界領導品牌
          .icon_more
          p.describe 睿田生技集結產、學、研三方資源投入，為台灣大學與永齡健康基金會共同合資的第一家生技公司，整合了台灣大學的研發實力、台成幹細胞治療中心在幹細胞領域投入多年的豐富臨床經驗
        .news_box
          i.fa.fa-search  
          .date 05.21
          h5.title 成為細胞儲存及細胞治療創新研發雙引擎知識界領導品牌
          .icon_more
          p.describe 睿田生技集結產、學、研三方資源投入，為台灣大學與永齡健康基金會共同合資的第一家生技公司，整合了台灣大學的研發實力、台成幹細胞治療中心在幹細胞領域投入多年的豐富臨床經驗
        .news_box
          i.fa.fa-search  
          .date 05.21
          h5.title 成為細胞儲存及細胞治療創新研發雙引擎知識界領導品牌
          .icon_more
          p.describe 睿田生技集結產、學、研三方資源投入，為台灣大學與永齡健康基金會共同合資的第一家生技公司，整合了台灣大學的研發實力、台成幹細胞治療中心在幹細胞領域投入多年的豐富臨床經驗
        .news_box
          i.fa.fa-search  
          .date 05.21
          h5.title 成為細胞儲存及細胞治療創新研發雙引擎知識界領導品牌
          .icon_more
          p.describe 睿田生技集結產、學、研三方資源投入，為台灣大學與永齡健康基金會共同合資的第一家生技公司，整合了台灣大學的研發實力、台成幹細胞治療中心在幹細胞領域投入多年的豐富臨床經驗
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
      this.filter=this.cataname;
      if (Ts) Ts.reload();
    },
    data() {
      return {
        filter: "全部新聞",
        catas: ["全部新聞","睿軒活動","新聞快訊","食安新知","友善連結"]
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
      
      is_double(id){
        return [0,6,10].indexOf(id)!=-1;
      },bg_css(url){
        return {'background-image': 'url('+url.trim().replace(' ','%20')+')'}
      }
    },
    props: ["cataname"]
}
</script>