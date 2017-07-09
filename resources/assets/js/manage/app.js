
import $ from 'jquery'
import Dropzone from 'dropzone'

require('../bootstrap')
require('tinymce/themes/modern/theme')

import tinymce from 'tinymce'
import 'tinymce/plugins/paste/plugin'
import 'tinymce/plugins/link/plugin'
import 'tinymce/plugins/autoresize/plugin'
import 'tinymce/plugins/advlist/plugin'
import 'tinymce/plugins/lists/plugin'
import 'tinymce/plugins/code/plugin'

import TinyMCE from 'tinymce-vue-2'

// import solution_selector from './components/solution_selector'
import carousel_editor from './components/carousel_editor'
import default_pic_selector from './components/default_pic_selector'
import editor_form from './components/editor_form'
// import draggable from 'vuedraggable'
import vue_json_editor_block_view from './components/vue-json-editor-block-view'

Vue.use(vue_json_editor_block_view);
Vue.component('tiny-mce', TinyMCE)
Vue.component('carousel_editor', carousel_editor)
Vue.component('editor_form',editor_form)
// Vue.component('solution_selector', solution_selector)
Vue.component('df_pic_selector', default_pic_selector)
// Vue.component('draggable', draggable)
// Vue.component('draggable', draggable)
// vue_json_editor_block_view
console.log(vue_json_editor_block_view)





//---------------------
var locale= document.location.host.split(".")[0];
if (["zh","cn","en"].indexOf(locale)==-1){
  locale="zh";
}

import store from './store'
window.store=store

import router from './router'
// $("table").dataTable()
var vm = new Vue({
  el: "#app", 
  store,
  router,
  data: {
    now_route: document.URL.split("/").slice(-1)[0]

  },
  methods:{
    
  },
  mounted(){


  }
})
window.vm=vm

//nav

// $("[data-link]").each((id,obj)=>{
//   console.log($(obj).attr("data-link"))
//   console.log(document.URL.split("/").slice(-1)[0])
//   if ($(obj).attr("data-link")==document.URL.split("/").slice(-1)[0]){ 

//     $(obj).addClass("active")
//   }
// });


//tinymce

if (!window.require_js) window.require_js={};

if (window.require_js.tinymce){
  $(document).ready(function(){
    console.log("Test");
    tinymce.init({
      selector: '#content',
      api_key: 'ngpn9ha5mk1a69lvgt66jzupekxmd86rn8e1iwjtyw3i3m6c',
      images_upload_url: 'postAcceptor.php',
      images_upload_base_path: '/some/basepath',
      images_upload_credentials: true,
      menubar: false,
      setup: function (editor) {
        editor.addButton('uploadpic', {
          text: '上傳圖片',
          icon: false,
          onclick: function () {
            $(".btn-dropzone").click();
          }
        });
        editor.addButton('uploadpic_url', {
          text: '插入圖片(連結網址)',
          icon: false,
          onclick: function () {
            var imgurl = prompt("輸入圖片網址", "插入圖片");
            if(imgurl!="" && imgurl ){
              tinymce.activeEditor.execCommand('mceInsertContent', false, '<img src=\"'+imgurl+'\" style=\"width: 100%;height: auto\"></img>');

            }
          }
        });
      },
      toolbar1: mce_settings.toolbar_news,
      plugins : vm.mce_plugin.plugins,
      theme_advanced_buttons3_add : "pastetext,pasteword,selectall",
      paste_auto_cleanup_on_paste : true,
      paste_preprocess : function(pl, o) {
          // Content string containing the HTML from the clipboard
          // alert(o.content);
          console.log(o.content);
          
          // o.content = $("<p></p>").html(o.content).text();
      },
      paste_postprocess : function(pl, o) {
          // Content DOM node containing the DOM structure of the clipboard
          // alert(o.node.innerHTML);
          o.node.innerHTML = o.node.innerHTML;
      }
    });
  });
}



if (window.require_js.dropzone){
  //初始化Dropzone上傳圖片function
  function gen_dz(classname,callback){  
    var myDropzone = new Dropzone(classname, {
      url: "/dropzone/upload.php",maxFiles: 1
      ,sending: function(){
        // vm.page_status="圖片上傳中<img src='../img/loadingicon_gold.png' class=loadingspin>";
      }
      ,success: function(evt,res){
        callback(evt,res);
      }
    });
    // myDropzone.createThumbnailFromUrl(file, this.ndata.img, callback, crossOrigin);
    // $("#dropfrontimg").dropzone({ url: "http://citi2016.unitedway.org.tw/dropzone/" });
    myDropzone.on("complete", function(file) {
      myDropzone.removeFile(file);
      setTimeout(function(){
        // vm.page_status="圖片上傳完畢";
      },300);
      
    });
  }

  gen_dz(".btn-dropzone",function(evt,res){
     console.log(res);
     
     tinymce.activeEditor.execCommand('mceInsertContent', false, '<img src=\"'+res+'\" style=\"width: 100%;height: auto\"></img>');
  });

  gen_dz(".btn-dropzone-cover",function(evt,res){
     console.log(res);
     
     $("#cover").val(res);
     $(".cover_preview").attr('src',res);
  });

}


