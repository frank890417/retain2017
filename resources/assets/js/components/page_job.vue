<template lang="jade">
div.page_job
  section.section_hero.bg_parallax
    .container.flex
      .col_left
        h1.section_title {{$t('page_job.title')}}
        h4.section_eng {{$t('page_job.eng')}}
        p.section_para(v-html="$t('page_job.content')") 
        //hr


  section.section_job

    .container.flex.row.wrap
      .job_box(v-for="job in $t('page_job.jobs')")
        .job_box_inner
          h4.title {{job.title}}
          p {{job.requirement}}
          .cover.flex.column 
            p(v-html="job.content")
            // a.btn.btn-transparent(href="https://www.104.com.tw/job/?jobno=4s08f&jobsource=n104bank1") 更多資訊
            a.logo_link_wrapper(:href="job.link", v-if="job.link && job.link!=''")
              img.logo_link(src="/img/logo_link.svg")

      .row
        .col-sm-12
         
      hr


</template>

<script>
    import { mapGetter, mapActions , mapState } from 'vuex'
    export default {
        mounted() {
            console.log('jobs')
        },
    }
</script>