<template lang="jade">
div.page_contact
  section.section_hero
    .container.flex
      .col_left
        h1.section_title {{$t('page_contact.title')}}
        h4.section_eng {{$t('page_contact.eng')}}
        p.section_para(v-html="$t('page_contact.content')")
  section.section_form
    form.container.flex#form_contact(v-on:submit.prevent="send_form")
      .col_left
        h4 {{$t('page_contact.section_form.title')}}
        .form-group
          label {{$t('page_contact.section_form.label_name')}}
          input(name="name", :placeholder="$t('page_contact.section_form.place_holder_name')")
        .form-group
          label {{$t('page_contact.section_form.label_mail')}}
          input(name="email", :placeholder="$t('page_contact.section_form.place_holder_mail')")
        .form-group
          label {{$t('page_contact.section_form.label_phone')}}
          input(name="phone", :placeholder="$t('page_contact.section_form.place_holder_phone')")
        .form-group
          label {{$t('page_contact.section_form.label_item')}}
          select#select_contact(name="ask_item_name", :placeholder="$t('page_contact.section_form.place_holder_item')")
            option(v-for="(p,id) in $t('page_product.products')" ,:value="p.name") {{p.name}} 
            option(value="-1") {{$t('page_contact.section_form.option_none')}}

        .form-group
          label {{$t('page_contact.section_form.label_content')}}
          .right
            textarea.form-control(name="content", rows=1 ,:placeholder="$t('page_contact.section_form.place_holder_content')")
            button(type="submit").btn.btn-primary.btn-submit 
              span {{$t('page_contact.section_form.btn_send')}}
              i.fa.fa-angle-right
      .col_right#section_qa
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
        metaInfo: {
          title: "聯絡我們",
          titleTemplate: "%s - 睿田生技 Retain Biotech"
        },
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
            qa_state: new Array(20).fill({}).map((d,i)=>({open: false}))
          };
        },
        computed: mapState([]),
        methods: {
          toggle (id){
            var item=this.qa_state.filter((d,i)=>i==id)[0];
            item.open = !item.open;
          },

          send_form(){
            var vobj=this;
            var send_data_array=$("#form_contact").serializeArray();
            var send_data = {};
            send_data_array.forEach((obj)=>{
              send_data[obj.name]=obj.value
            })
            // var send_data=$("#form_contact").submit();
            console.log(send_data);

            this.sending=true;
            axios.post("/contact_record",send_data).then((res)=>{
              if (res.data.status=="success"){
                alert("傳送成功！")
                setTimeout(()=>{
                  vobj.sending=false;
                },1000)

              }else{

                alert("傳送失敗")
              }
            });

          },
        }
    }
</script>