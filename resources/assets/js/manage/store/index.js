import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//---------------------
// 編輯器設定
const mce_settings = {
  toolbar: [ 'undo redo | bullist numlist | link image | print preview media fullpage | forecolor backcolor emoticons | pastetext pasteword | code'],
  toolbar_news: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | print preview media fullpage | forecolor backcolor emoticons | pastetext pasteword link image | uploadpic uploadpic_url | code',
  other: {
    plugins: ['paste', 'link', 'autoresize','lists', 'advlist','code'],
    advlist_bullet_styles: "circle"
  }
}

const store = new Vuex.Store({
  state: {
    locale: window.locale,
    lang: window.lang,
    mce_settings
  },
  mutations: {
    
  },
  actions: {

  }
})
export default store