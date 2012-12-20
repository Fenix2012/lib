$(function(){
//课程大纲资料预览
$('.cdetail-data-list li').live('click',function(){ $('#modal-preview-data').modal(); });
$('#modal-preview-data').on('shown', function () { PreviewData(); })



//课程查看资料预览
$('#cview-resource .btn-preview').live('click',function(){
  $(this).next('.popover').css('left','2px');
  $(this).next('.popover').find('.arrow').css('margin-left','-15%');
});
$('#cview-resource .btn-preview.btn').popover({
	placement : 'bottom',
  	html : true,
  	content : PreviewData
});

//资料&笔记等的删除
$('.cdetail-data-list li span').live('click',function(e){ e.stopPropagation(); Delete(); });
function Delete(){
  /*
  $.ajax({

  });
  */
}
//回答追问
$('.ufeeds-answer').live('click',function(){
  questionAction($(this));
});
$('.ufeeds-addask').live('click',function(){
  questionAction($(this));
});
function questionAction(obj){
	obj.append('<span class="question-arrow"></span>');
	obj.parents('.ucenter-feeds-wrap').siblings('.comment-box').show();
}
//回答追问展开收起
$('.comment-fold').live('click',function(){
	$(this).parents('.comment-box').slideUp('fast');
	$(this).parents('.comment-box').siblings('.ucenter-feeds-wrap').find('.question-arrow').remove();
});
//进入课程
$('.ucenter-content-course dl:not(.ucontent-add)').hover(function(){
  //e.stopPropagation();
  var _href = $(this).find('dt a').attr('href');
  $(this).find('dt').append('<a class="ucourse-hover"></a><a class="ucourse-hover-span" target="_blank">进入课程</a>');
  $(this).find('dt .ucourse-hover').animate({opacity:'0.3'},100);
  $(this).find('dt .ucourse-hover-span').animate({left:'0'},100);

  $('.ucourse-hover').attr('href',_href);
  $('.ucourse-hover-span').attr('href',_href);

},function(){
  $(this).find('dt .ucourse-hover, dt .ucourse-hover-span').remove();
});
//师生动态展开收起
$('.ucenter-feeds-unfold').live('click',function(){
  	var _height = $(this).siblings().find('.ucenter-feeds-text').height()+$(this).siblings().find('.ucenter-feeds-img').height();
	$(this).siblings('.ufeeds-detail-foldarea').animate({'height':_height,'overflow':'visible'},300);
	$(this).removeClass('ucenter-feeds-unfold').addClass('ucenter-feeds-fold').text('收起');
});
$('.ucenter-feeds-fold').live('click',function(){
	$(this).siblings('.ufeeds-detail-foldarea').css({'height':'40px','overflow':'hidden'});
	$(this).removeClass('ucenter-feeds-fold').addClass('ucenter-feeds-unfold').text('显示全部内容');
});
//课程大纲手风琴
$('.accordion-toggle').append('<span class="arrow-gray-right"></span>');
$('.no-data .accordion-toggle').css('cursor','default');
$('.no-data .accordion-toggle').find('.arrow-gray-right').remove();

//课程大纲资料翻页
var dataLen = $('.cdetail-data-list').length;
var dataPage = 1;
$(".dthumb li").click(function(){
  dataPage =   $(".dthumb li").index(this);
  DataScroll(dataPage);
});	
function DataScroll(page){
  $('.cdetail-data-list').eq(page).fadeIn().siblings().fadeOut();
  //$('.pic_list li').eq(page).fadeOut();
  $('.dthumb li span').eq(page).addClass('cur')
  $('.dthumb li span').eq(page).parent('li').siblings('li').find('span').removeClass('cur');
}
$('.cdetail-data-list-wrap').height($(this).find('.cdetail-data-list').height());
//上传本地文件

$('.type-file-file').each(function(i){
  var _value = $(this).attr('data-value');
  var textButton="<input type='button' name='button' id='button' value='"+_value+"' class='type-file-button btn' />";
  $(textButton).insertBefore(this);
});
$('.type-file-button').live('click',function(){
	$(this).next('.type-file-file').trigger('click');
});
//html5进度条
function Progress(obj){
	var _width = obj.val();
	var _textPos = parseInt(100-_width);
	obj.next('span').find('em').text(_width);
	obj.next('span').css({'right':_textPos+'%'});
}
$('progress').change(function(){
  Progress($(this));
});
$('progress').each(function(){
  Progress($(this));
});
//创建课程
SetCourseScroll($('#btn-step-info'),-750,1);
SetCourseScroll($('#btn-step-auth-prev'),0,2,'prev');
SetCourseScroll($('#btn-step-auth-next'),-1500,2);
SetCourseScroll($('#btn-step-outline-prev'),-750,3,'prev');

$('#import-outline li').live('click',function(){
  if($(this).hasClass('cur')){ $(this).removeClass('cur'); }
  else { $(this).addClass('cur').siblings().removeClass('cur'); }
})

$('#modal-set-course .btn-group .btn').click(function(e){ e.stopPropagation(); });

$('#select-grade').change(function(){
  /*ajax获取选中年级下的班级list
	   
   
   */
  $('#choose-class .controls').append('xxx');
});

//select美化
$('select').sSelect();
$('select.select-small').next('.dropselectbox').find('h4').css({'width':'125px','background-position':'108px center'});
$('select.select-small').next('.dropselectbox').find('ul').css({'width':'125px'});


$('select.select-xsmall-right').parent('.dropdown').css({'float':'right'});
$('select.select-xsmall-right').parent('.dropdown').find('h4').css({'width':'125px','height':'28px','line-height':'28px','background-position':'108px center','margin-top':'2px'});
$('select.select-xsmall-right').parent('.dropdown').find('ul').css({'width':'125px'});
//----------------------------------------
});
function PreviewData(){
	//alert('ajax加载资料预览数据');
}
function SetCourseScroll(obj,offset,curStep,pos){
  obj.live('click',function(){
	  var _mb = obj.parents('.modal-body');
	  _mb.find('.form-inner').animate({'left':offset+'px'},300,function(){
	  _mb.find('.set-course-ft:eq('+(curStep-1)+')').addClass('hide');
		  if(pos == 'prev'){
			_mb.find('.btn-group button:eq('+(curStep-1)+')').removeClass('active');
			_mb.find('.set-course-ft:eq('+(curStep-2)+')').removeClass('hide');
		  } else {
			_mb.find('.btn-group button:eq('+curStep+')').addClass('active');
			_mb.find('.set-course-ft:eq('+curStep+')').removeClass('hide');
		  }
	  });
  });
}

