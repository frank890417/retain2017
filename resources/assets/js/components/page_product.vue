<template lang="jade">
div.page_solution
  section.section_hero.bg_parallax
    video_fullplayer(
        :youtube_url = "$t('page_product.video')",
        :player_height="500",
        :status="video_playing",
        @ended = "video_playing=false"
        )
    .container.flex
      .col_left
        h1.section_title {{$t("page_product.title")}}
        h4.section_eng {{$t("page_product.eng")}}
        p.section_para(v-html="$t('page_product.content')")
        
        .btn_full.brown(v-if="$t('page_product.btn.show')", @click="video_playing=true")
          div.icon_inline_wrapper
            .icon_play_circle
          div {{$t("page_product.btn.label")}}
      .col_right

        ul.hero_right_list
          li(v-for="feature in $t('page_product.features')")
            .btn_expand.plus
            h4 {{feature.title}}
            .detail {{feature.content}}

  section.section_solution(v-for="(product,product_id) in $t('page_product.products')",:class="'section_solution_'+product_id")
    .main_info(@click="toggleActive('.section_solution_'+product_id,product.programs.length)",
    :class="{enable: product.programs.length}")
      .container.flex
        .cover(:style="bg_css(product.cover)")
        .info
          h3.title {{product.name}}
          .description(v-html="product.description")
        .btn_expand.cross.btn_soluton_expand(:class="{no_content: product.programs.length==0}")
    .container.program_list_container(v-if="product.type !='text'")
      ul.program_list

        li(v-for="(program,prog_id) in product.programs" ,
          :class="['program_'+prog_id , program.description?'enable':'' ]")
          .program_top.flex( @click="toggleActive('.program_'+prog_id,program.description)")
            .tag
              span {{String.fromCharCode("A".charCodeAt(0)+prog_id)}}
            h4.program_title {{program.name}}
            .btn_expand.btn_program_expand(:class="{no_content: !program.description}")
              i.fa.fa-angle-down
          .program_box(:class="'program_box_'+prog_id" , v-if="program.description")
            .top.container.flex.strech_height
              .col_left
                h5.program_sub_title {{$t("page_product.label_intro")}}
                p(v-html="program.description")
              
                h5.program_sub_title {{$t("page_product.label_target")}}
                p(v-html="program.client")
              .col_right
                h5.program_sub_title {{$t("page_product.label_content")}}
                ul.service_type
                  li(v-for="(content,content_id) in program.contents")
                    .toggle_part 
                      .tag 
                        span {{content_id+1}}
                      span {{content.name}}
                      .btn_expand.cross
                    .info_part
                      p(v-html="content.description")
            .more_info {{$t("page_product.label_more")}}

  section.section_other
    .program_text_container
      .container
        h4 {{$t("page_product.product_inform.title")}}
        ul
          li(v-for="t in $t('page_product.product_inform.informs')")
            i.fa.fa-info-circle
            span {{t.text}}
  
</template>

<script>
import video_fullplayer from './video_fullplayer'
import { mapGetter, mapActions , mapState } from 'vuex'
export default {
    data(){
      return {
        timer_list: [],
        video_playing: false
      }
    },
    components: {
      video_fullplayer
    },
    methods: {
      bg_css(url){
        return {
          'background-image': "url("+url+")"
        }
      },
      toggleActive(el,enable){
        if (enable){
          console.log(el);
          $(el).toggleClass("active");
        }
        

      }
    },
    mounted() {
      
      $(".hero_right_list li").click(function(){
        $(".hero_right_list li").removeClass("active");
        $(this).toggleClass("active");
      });
      $(".service_type .toggle_part").click(function(){
        $(this).closest("li").toggleClass('active');
      });
      $(".hero_right_list li:first-child").toggleClass("active");
    },beforeDestroy() {
    },
    props: ['id'],
    computed: mapState(['solutions','products','service_infos','product_other'])
}
</script>