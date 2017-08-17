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
    advlist_bullet_styles: "circle",
    content_style: ".brown{color: #BDB175 } .theme{color: #3FBFBB}"
  }
}

const store = new Vuex.Store({
  state: {
    locale: window.locale,
    lang: window.lang,
    mce_settings,
    remind_save_when_exit: false
  },
  mutations: {
    save_website_info(state,updated_info){
      console.log(updated_info);
      console.log("save "+state.locale)
      state.lang=JSON.parse(JSON.stringify(updated_info))
      axios.post("/api/websiteinfo/key/"+state.locale,{update: JSON.stringify(updated_info)} ).then(
        (res)=>{
          state.remind_save_when_exit=false;
          if (res.data.status=="ok"){
            alert("儲存完成！")
          }

        }
      )
    },
    save_website_info_silent(state,updated_info){
      console.log(updated_info);
      console.log("save "+state.locale)
      state.lang=JSON.parse(JSON.stringify(updated_info))
      axios.post("/api/websiteinfo/key/"+state.locale,{update: JSON.stringify(updated_info)} ).then(
        (res)=>{
          state.remind_save_when_exit=false;
          if (res.data.status=="ok"){
          }

        }
      )
    },
    
    remind_save(state){
      // state.remind_save_when_exit=true
    },
    cancel_remind_save(state){
      state.remind_save_when_exit=false
    }
  },
  actions: {

  }
})
export default store