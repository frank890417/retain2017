//components

// Vue.component('slick', Slick);
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// Vue.component('example', require('./components/Example.vue'));
// Vue.component('Navbar', require('../components/Navbar.vue'));

var manage_nav = Vue.component('manage_nav', require('../components/manage_nav.vue'));
var manage_index = Vue.component('manage_index', require('../components/manage_index.vue'));
var manage_product = Vue.component('manage_product', require('../components/manage_product.vue'));
var manage_tern = Vue.component('manage_tern', require('../components/manage_tern.vue'));
var manage_about = Vue.component('manage_about', require('../components/manage_about.vue'));
// var page_member = Vue.component('page_member', require('../components/page_member.vue'));
var manage_news = Vue.component('manage_news', require('../components/manage_news.vue'));
var manage_team = Vue.component('manage_team', require('../components/manage_team.vue'));
// var page_product = Vue.component('page_product', require('../components/page_product.vue'));
// var page_tech = Vue.component('page_tech', require('../components/page_tech.vue'));
// var page_post = Vue.component('page_post', require('../components/page_post.vue'));
var manage_job = Vue.component('manage_job', require('../components/manage_job.vue'));
var manage_contact = Vue.component('manage_contact', require('../components/manage_contact.vue'));
// var page_tern = Vue.component('page_tern', require('../components/page_tern.vue'));

// var section_footer = Vue.component('section_footer', require('../components/section_footer.vue'));
// var section_solutions = Vue.component('section_solutions', require('../components/section_solutions.vue'));
// var section_search = Vue.component('section_search', require('../components/section_search.vue'));
//routes

const routes = [
  { path: '/', component: manage_index },
  { path: '/about', component: manage_about },
  { path: '/news', component: manage_news },
  { path: '/product', component: manage_product },
  { path: '/tern', component: manage_tern},
  { path: '/nav', component: manage_nav},
  { path: '/contact', component: manage_contact},
  { path: '/team', component: manage_team},
  { path: '/job', component: manage_job},


  // { path: '/about', component: page_about },
  // { path: '/member', component: page_member },
  // { path: '/team', component: page_about },
  // { path: '/tech', component: page_tech },
  // { path: '/solution/:id', component: page_product , props: true},
  // { path: '/solution/0', alias: '/solution'},
  // { path: '/news', component: page_news },
  // { path: '/news/:id', component: page_post , props: true},
  // { path: '/job', component: page_job },
  // { path: '/contact', component: page_contact },
  // { path: '/tern', component: page_tern },
  // { path: '/search', component: section_search }
];

const router = new VueRouter({
  routes,
  mode: "hash"
})

router.beforeEach((to, from, next) => {
  console.log(to);
  var waittime=600;
  if (to.path==from.path){
    waittime=50;
  }
  if (to.path=="/about" && to.hash=="#section_about_log"){

    setTimeout(function(){
      $("html, body").animate({ scrollTop: $(".section_log").offset().top-100  }, "slow");
    },waittime);
  }else{
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  if (window.store.state.remind_save_when_exit){
    if (confirm("離開將會喪失所有未儲存變更" )){
      window.store.state.remind_save_when_exit=false
      next();
    }else{
      return 
    }
  }
  next();
});

router.afterEach(route => {
  console.log(route)
  vm.now_route=route
})



export default router