<template lang="jade">
div.page_contact
  section.section_hero
    .container.flex
      .col_left
        h1.section_title {{$t('page_contact.title')}}
        h4.section_eng {{$t('page_contact.eng')}}
        p.section_para(v-html="$t('page_contact.content')")
  section.section_form
    .container.flex
      .col_left
        h4 {{$t('page_contact.section_form.title')}}
        .form-group
          label {{$t('page_contact.section_form.label_name')}}
          input(:placeholder="$t('page_contact.section_form.place_holder_name')")
        .form-group
          label {{$t('page_contact.section_form.label_mail')}}
          input(:placeholder="$t('page_contact.section_form.place_holder_mail')")
        .form-group
          label {{$t('page_contact.section_form.label_item')}}
          select#select_contact(:placeholder="$t('page_contact.section_form.place_holder_item')")
            option(v-for="(p,id) in $t('page_product.products')" ,:value="id") {{p.name}} 
            option(value="-1") {{$t('page_contact.section_form.option_none')}}

        .form-group
          label {{$t('page_contact.section_form.label_item')}}
          .right
            textarea.form-control(rows=1 ,:placeholder="$t('page_contact.section_form.place_holder_content')")
            .btn.btn-primary.btn-submit 
              span {{$t('page_contact.section_form.btn_send')}}
              i.fa.fa-angle-right
      .col_right#questions
        h4 {{$t('footer.section_question.title')}}
        ul.question_list(v-if="$t('footer.section_question.questions').length>0")
          li(v-for="(qa,id) in $t('footer.section_question.questions')" ,:class="{open: qa_state[id].open}"  @click="toggle(id)")
            .icon.icon_minus(:class="{icon_plus:  !qa_state[id].open}" )
            .question {{qa.question}}
            p.answer(v-html="qa.answer")   
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
        computed: mapState([]),
        methods: {
          toggle (id){
            var item=this.qa_state.filter((d,i)=>i==id)[0];
            item.open = !item.open;
          }
        }
    }
</script>