$(function(){
$('#modal-preview-data').on('shown', function () { PreviewData(); })
//资料&笔记等的删除
$('#mod-course').find('.cdetail-data-list li span').live('click',function(event){  
  event.stopPropagation();
  if ( confirm('是否确认删除此课程资料?') )
  {
      var pid = $(event.target).attr('data-pid');
      $.ajax({
        'url' : libSchoolBaseUrl + 'teach/coursepost/delete&post_id=' + pid ,
        'type' : 'post',
        'success' : function(data){
           try {
               var json = eval( '(' + data + ')' );
               if ( json.result == 'success' )
              {
                alert('删除成功');
                $('#mod-course').find('.cdetail-data-list li[data-pid=' + json.pid + ']').remove();
              }
            }catch(e) {
              alert('删除失败，请稍后重试');
            }
      }

    });
    }
 });

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


//select美化
$('select').sSelect();
$('select.select-small').next('.dropselectbox').find('h4').css({'width':'125px','background-position':'108px center'});
$('select.select-small').next('.dropselectbox').find('ul').css({'width':'125px'});
//课程打分
doGrade($('.course-rating-ul'));
//----------------------------------------
});
var libedu_resource_manager = 
{
	play_pdf : function(json , area_element) {
		if ( json.convert_complete == 0 ) {	
			area_element.html( json.post_content );
		}	
		else
		{
			area_element.attr('id' , 'play-post-con');
			area_element.FlexPaperViewer(
					{ config : {
		                SWFFile : json.post_content,
		                Scale : 0.6,
		                ZoomTransition : 'easeOut',
		                ZoomTime : 0.5,
		                ZoomInterval : 0.2,
		                FitPageOnLoad : true,
		                FitWidthOnLoad : false,
		                FullScreenAsMaxWindow : false,
		                ProgressiveLoading : false,
		                MinZoomSize : 0.2,
		                MaxZoomSize : 5,
		                SearchMatchAll : false,
		                InitViewMode : 'Portrait',
		                RenderingOrder : 'flash,html',
		                StartAtPage : '',
		                ViewModeToolsVisible : true,
		                ZoomToolsVisible : true,
		                NavToolsVisible : true,
		                CursorToolsVisible : true,
		                SearchToolsVisible : true,
		                WMode : 'window',
		                localeChain: 'en_US'
		            }}
			);
		}
	},
}
function PreviewData(){

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
function closeAlert(){
  $('#alert').modal('hide');
}
function insetAlert(ALERT_SETTING){
  var alertHtml = '';
  alertHtml += '<div class="hide fade modal" id="alert"> <div class="modal-body">';
  if(ALERT_SETTING.is_moment){
	  alertHtml += '<p class="alert-con-moment alert-con"><span class="alert-con-msg"><i class="icon-mark"></i>'+ALERT_SETTING.alert_con_msg+'</span>';	
  } else {
	  alertHtml += '<p class="alert-con"> <span class="alert-con-msg"><i class="icon-mark"></i>'+ALERT_SETTING.alert_con_msg+'</span>';	
	  if(ALERT_SETTING.is_aside){
		alertHtml += '<span class="alert-con-aside" data-dismiss="modal">'+ALERT_SETTING.is_aside+'</span>';
	  } 
	  alertHtml += '</p> <p class="alert-operate">';
	  if(ALERT_SETTING.is_confirm){
		  alertHtml += '<a href="javascript:;" class="btn-darkblue btn btn-double" id="btn-confirm" data-dismiss="modal">确定</a>';	
	  }
	  if(ALERT_SETTING.is_cancel){
		alertHtml += ' <a href="javascript:;" class="btn-darkblue btn btn-double" id="btn-cancel" data-dismiss="modal">取消</a>';  
	  } 
  }
  alertHtml += '</p> </div> </div>';
  $('body').append(alertHtml);
}
function doGrade(obj){
  	var index,
		differ,
		score;
	obj.each(function(){
		obj.find('li').on({
			mouseover: function (){
				$(this).prevAll().removeClass().addClass('rating-one');
				index = $(this).index()+1;
			},
			mousemove: function (e){
				differ = parseFloat(e.pageX - $(e.target).offset().left);
				if(differ < 9){
					$(this).removeClass().addClass('rating-half');
					score = (index-1)*2+1;
				} else {
					$(this).removeClass().addClass('rating-one');
		  			score = index*2;
				}
				$(this).attr({'title' : score+'分' , 'data-score' : score});
			},
			click : function(){
				//这里是打分ajax请求
				//打分成功后解绑所有的事件并且移除course-rating-ul
				$(this).unbind();
				$(this).siblings().unbind();
				$(this).parent('ul').unbind();
				$(this).parent('ul').removeClass('course-rating-ul');

				alert($(this).attr('data-score'));	
			}
		});
		obj.on('mouseout',function(){ $(this).find('li').removeClass(); });
	});
}
