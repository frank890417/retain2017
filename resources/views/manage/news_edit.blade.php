@extends('layouts.app_manage')
@section('content')
<div class="row">
  <div class="col-lg-12">
    <div class="row">
      <ol class="breadcrumb">
        <li><a href="#">
            <svg class="glyph stroked home">
              <use xlink:href="#stroked-home"></use>
            </svg></a></li>
        <li> <a href=" {{url('manage/news')}} ">新聞管理</a></li>
        <li class="active">新聞編輯-{!! isset($news)?$news->title:"" !!}</li>
      </ol>
    </div>
    @yield('content')
  </div>
  <div class="col-lg-12">
    <h1 class="page-header">新聞管理</h1>
  </div>
</div>
<form action="{{ (isset($news))?(url('manage/news/'.$news->id)):(url('manage/news/')) }}" method="post" class="row">
  <div class="col-sm-9">
    <div class="panel panel-primary">
      <div class="panel-heading">編輯新聞</div>
      <div class="panel-body">
        <input type="hidden" name="_method" value="{{ (isset($news))?'put':'post' }}"/>
        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
        <div class="form-group">
          <label for="title">標題</label>
          <input id="title" name="title" value="{!! isset($news)?$news->title:"" !!}" class="form-control"/>
        </div>
        <div class="form-group">
          <label for="date">日期</label>
          <input id="date" name="date" value="{!! isset($news)?$news->date:"" !!}" class="form-control"/>
        </div>
        <div class="form-group">
          <label for="description">短描述(80字以內)</label>
          <textarea id="description" name="description" rows="3" class="form-control">{!! isset($news)?$news->description:'' !!}</textarea>
        </div>
        <div class="form-group">
          <label for="content">內文</label>
          <div style="display:none;" class="btn btn-default btn-md btn-dropzone">上傳圖片</div>
          <textarea id="content" name="content" rows="10" class="form-control">{!! isset($news)?$news->content:'' !!}</textarea>
        </div>
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="panel panel-default">
      <div class="panel-heading">新聞設定</div>
      <div class="panel-body">
        <div class="form-group">
          <label for="tag">標籤</label>
          <select id="tag" name="tag" class="form-control">
            <option value="重要通知">重要通知</option>
            <option value="活動快訊">活動快訊</option>
            <option value="投資相關">投資相關</option>
          </select>
        </div>
        <div class="form-group">
          <label for="cover">封面圖片</label>
          <div class="row">
            <div class="col-sm-12"><img src="{!! isset($news)?$news->cover:"" !!}" width="100%" class="cover_preview"/></div>
            <div class="col-sm-12">
              {{-- input#cover.form-control(name='cover', style='width: 80%; display: inline-block', value!='{!! isset($news)?$news->cover:"" !!}') --}}<br/>
              <div style=" display: inline-block" class="btn btn-default btn-md btn-dropzone-cover">上傳圖片</div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="form-group">
          <button type="submit" class="btn btn-danger btn-md">儲存修改</button>
        </div>
      </div>
    </div>
  </div>
  <script>
    if (!window.data_storage){
      window.data_storage={};
    }
    window.require_js={};
    window.require_js.dropzone=true;
    window.require_js.tinymce=true;
  </script>
  <script></script>
</form>
@endsection
@section('require_js')
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.3/tinymce.min.js"></script>
@endsection
@section('require_js_after')
  <script>$("#tag").val("{{isset($news)?($news->tag):''}}");</script>
@endsection