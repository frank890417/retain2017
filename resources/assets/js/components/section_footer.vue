<template lang='jade'>
div.footer
  section.detail_footer
    .container.flex
      .go_to_topbtn.at_top
        img(src="/img/icon_arrow_up.svg")
      .col_address
        h5 公司資訊
        p 台北, 台灣
        br
        p 台北市忠孝東路一段54號5樓<br>+886.2.5579-0123
        hr
        img.social_icon.fb(src="http://www.greenvalefarm.com.au/wp-content/themes/greenvale/images/fb-icon.png")
        img.social_icon(src="https://cdn4.iconfinder.com/data/icons/picons-social/57/40-google-plus-3-128.png")

      .col_question
        h5 常見問題
        ul.question_list
          li(v-for='(qa,id) in questions.slice(0,3)' v-bind:class="qa_state[id].open ?'open':''"  @click="toggle(id)")
            .icon.icon_minus(v-bind:class="qa_state[id].open ?'':'icon_plus'")
            .question {{qa.question}}
            p.answer {{qa.answer}}
          
          li 
            router-link(to="/contact#questions").more 更多問題...

      .col_corp
        h5.text-left 合作夥伴
        .slicklogo2
          .item
            img.company_icon(src="/img/index/temp_cor_logo-01.png" style="width: 100%")
          .item
            img.company_icon(src="/img/index/temp_cor_logo-02.png" style="width: 100%")
         
  footer
    .container.flex
      .info Copyright 2017 © 睿田生技 Retain Biotech, All right reserved.
      ul.footer_nav
        li
          router-link(to="/job") 人才招募
        li
          a(href="#") 會員登入
        li
         router-link(to="/tern") 各項聲明
        li
          router-link(to="/contact") 聯絡我們


</template>
<script>
    import { mapGetter, mapActions , mapState } from 'vuex';
    export default {
        mounted() {
            console.log('footer mounted.');
            $('.slicklogo2').slick({
              autoplay: true,
              autoplaySpeed: 3000,
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: true,
              vertical: true,
              dots: true,
              easing: 'ease-in'
            });
            // if (Ts) Ts.reload();
        },data(){
          return {
            qa_state: new Array(5).fill({}).map((d,i)=>({open: i==0}))
          };
        },
        methods: {
          toggle (id){
            this.qa_state.forEach((op,index)=>{
              if (index==id) {
                op.open = !op.open;
              }else{ 
                op.open = false;
              }
            });
          }
        },
        computed: mapState(['questions'])
    }

</script>