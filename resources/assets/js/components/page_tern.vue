<template lang="jade">
div.page_tern
  section.section_hero.bg_parallax_about.flex.column
    .container.grid_sz_mx_8_7
      h1.section_title {{$t('page_tern.title')}}
      h4.section_eng {{$t('page_tern.eng')}}
      h4.section_feature {{$t('page_tern.content')}}
      
      ul
        li(v-for="(tern,tid) in $t('page_tern.terns')" ,:class="{active: item_status[tid].open}")
          .title(@click="toggle_open(tid)")
            .btn_expand.cross(:class="{active: item_status[tid].open}")
            span {{tern.title}}
          div.tern_content(v-html="tern.content")
</template>

<script>
  import { mapGetter, mapActions , mapState } from 'vuex'
  export default {
      data() {return {
        sel_year: "year_2016",
        item_status: Array.from({length: 7},()=>({open: true}) ),
        
      }},
      mounted() {
          console.log('tern mounted.')
          // if (Ts) Ts.reload();
      },
      methods: {
        toggle_open(id){
          this.item_status[id].open=!this.item_status[id].open
        }
      },
      computed: mapState(['about_logs'])

  }
</script>