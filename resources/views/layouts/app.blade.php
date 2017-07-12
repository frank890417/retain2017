<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{$metas["meta_title"]}}</title>
    <meta property="og:title" content="{{$metas['meta_title']}}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="{{$metas['meta_cover']}}">
    <meta property="og:description" content="{{$metas['meta_description']}}">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/overwrite/master.css') }}" rel="stylesheet">
    <!-- Scripts -->
    <script>
      window.Laravel = {!! json_encode([
      'csrfToken' => csrf_token(),
      ]) !!};
    </script>
  </head>
  <body class="lang_{{$lang}} lang_all ">
    <div id="app" :class="{big_font: big_font}">
      <navbar></navbar>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.path"></router-view>
      </transition>
      <section_footer></section_footer>
    </div>
    @yield('blade_pass_variables')
    {{-- Script BEFORE app.js --}}
    @yield('require_js')
    <script>
      window.locale="{{$lang}}";
      window.lang={};
      window.lang.{{$lang}}={!! $lang_pack !!};
      document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +':35729/livereload.js?snipver=1"></' + 'script>');
      
    </script>
    <script async src="/js/app.js"></script>
    {{-- Script AFTER app.js --}}
    @yield('require_js_after')
  </body>
</html>