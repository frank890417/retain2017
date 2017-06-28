<template lang="jade">
div.page_solution
  section.section_hero.bg_parallax
    .container.flex
      .col_left
        h1.section_title 產品方案與研發
        h4.section_eng premium solutions
        p.section_para 睿田生技公司客服專員將會提供您完整的資訊與諮詢服務，待您完全了解儲存過程後，將會安排儲存前的健康評估。
        
        .btn_full.brown 
          div.icon_inline_wrapper
            .icon_play_circle
          div 服務流程介紹
      .col_right

        ul.hero_right_list
          li(v-for="sinfo in service_infos")
            .btn_expand.plus
            h4 {{sinfo.title}}
            .detail {{sinfo.content}}

  section.section_solution(v-for="(product,product_id) in products",:class="'section_solution_'+product_id")
    .main_info(@click="toggleActive('.section_solution_'+product_id)")
      .container.flex
        .cover(:style="bg_css(product.cover)")
        .info
          h3.title {{product.name}}
          .description(v-html="product.description")
        .btn_expand.cross.btn_soluton_expand(:class="{no_content: product.programs.length==0}")
    .container.program_list_container(v-if="product.type !='text'")
      ul.program_list

        li(v-for="(program,prog_id) in product.programs" ,
          :class="'program_'+prog_id",
          @click="toggleActive('.program_'+prog_id)")
          .tag 
            span {{program.tag}}
          h4.program_title {{program.name}}
          .btn_expand.btn_program_expand(:class="{no_content: !program.description}")
            i.fa.fa-angle-down
          .program_box(:class="'program_box_'+prog_id" , v-if="program.description")
            .top.container.flex
              .col_left
                h5.program_sub_title 方案介紹
                p(v-html="program.description")
              
                h5.program_sub_title 建議對象
                p(v-html="program.client")
              .col_right
                h5.program_sub_title 方案內容
                ul.service_type
                  li(v-for="content in program.contents")
                    .toggle_part {{content.name}}
                      .btn_expand.cross
                    .info_part
                      p(v-html="content.description")
            .more_info 預約及諮詢本方案內容，請直撥客服中心 0800-080688

  section.section_other
    .program_text_container
      .container
        h4 {{product_other.title}}
        ul
          li(v-for="t in product_other.content")
            i.fa.fa-info-circle
            span {{t}}
  
</template>

<script>
    import { mapGetter, mapActions , mapState } from 'vuex'
    export default {
        data(){
          return {
            timer_list: []
          }
        },
        methods: {
          bg_css(url){
            return {
              'background-image': "url("+url+")"
            }
          },
          toggleActive(el){
            console.log(el);
            $(el).toggleClass("active");

          }
        },
        mounted() {
          
          $(".hero_right_list li").click(function(){
            $(".hero_right_list li").removeClass("active");
            $(this).toggleClass("active");
          });
          $(".service_type .btn_expand").click(function(){
            $(this).closest("li").toggleClass('active');
          });
          $(".hero_right_list li:first-child").toggleClass("active");
        },beforeDestroy() {
        },
        props: ['id'],
        computed: mapState(['solutions','products','service_infos','product_other'])
    }
</script>