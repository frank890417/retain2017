<template lang="jade">
div.page_contact
  section.section_hero
    .container.flex
      .col_left
        h1.section_title 聯絡我們
        h4.section_eng Contact us
        p.section_para 服務專線  
          span.color_theme +886.2.55967898
          span <br>服務時間  
          span.color_theme 週一 ~ 週五 10:00 ~ 17:00<br><br>
          span 若您有任何疑問、服務需求等，歡迎與我們聯絡，我們將竭誠為您服務。
  section.section_form
    .container.flex
      .col_left
        h4 連絡信箱
        .form-group
          label 姓名
          input(placeholder="請輸入姓名")
        .form-group
          label 信箱
          input(placeholder="請輸入聯絡信箱")
        .form-group
          label 諮詢
          select#select_contact(placeholder="請選擇諮詢項目")
            option(value="") 請選擇諮詢項目
            option(value="1") 鴻海三心專案
            option(value="2") 企業尊榮專案
            option(value="3") 海外服務專案

        .form-group
          label 諮詢內容
          .right
            textarea.form-control(rows=1 placeholder="訊息...")
            .btn.btn-primary.btn-submit 
              span 送出
              i.fa.fa-angle-right
      .col_right#questions
        h4 常見問題
        ul.question_list(v-if="questions.length>0")
          li(v-for='(qa,id) in questions' v-bind:class="qa_state[id].open ?'open':''"  @click="toggle(id)")
            .icon.icon_minus(v-bind:class="qa_state[id].open ?'':'icon_plus'")
            .question {{qa.question}}
            p.answer {{qa.answer}}   
    .container
      hr.footer_line
    
  

</template>

<script>
    import { mapGetter, mapActions , mapState } from 'vuex'
    export default {
        mounted() {
            console.log('contact mounted.');

            //text area auto expand
            var textarea = document.querySelector('textarea');

            textarea.addEventListener('keydown', autosize);
                         
            function autosize(){
              var el = this;
              setTimeout(function(){
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + (el.scrollHeight+5) + 'px';
              },0);
            }
            if (window.location.hash){
            $("html,body").animate({scrollTop: $(window.location.hash).offset().top-100});
          }
        },
        data(){
          return {
            qa_state: new Array(20).fill({}).map((d,i)=>({open: i==0}))
          };
        },
        computed: mapState(['questions']),
        methods: {
          toggle (id){
            var item=this.qa_state.filter((d,i)=>i==id)[0];
            item.open = !item.open;
          }
        }
    }
</script>