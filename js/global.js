$(function(){
$('#modal-preview-data').on('shown', function () { PreviewData(); })
//资料&笔记等的删除
/*ALERT参数说明
  alert_con_msg : '是否确认删除该课程资料',//设置alert内容 
  alert_type : 'confirmation',//notice(√),error(x),warning(!),confirmation(?)
  is_aside: ''//是否有aside,没有留空
*/
$('#mod-course').find('.cdetail-data-list li span').live('click',function(event){
	event.stopPropagation();
	insetAlert('confirmation','是否确认删除此课程资料');
	$('#alert').delegate('#btn-confirm','click',function(){ 
		var pid = $(event.target).attr('data-pid');
		$.ajax({
		  'url' : libSchoolBaseUrl + 'teach/coursepost/delete&post_id=' + pid ,
		  'type' : 'post',
		  'success' : function(data){
			 try {
				 var json = eval( '(' + data + ')' );
				 if ( json.result == 'success' )
				{
				  //alert('删除成功');
				  insetAlert('notice','删除成功');
				  $('#mod-course').find('.cdetail-data-list li[data-pid=' + json.pid + ']').remove();
				}
			  }catch(e) {
				alert('删除失败，请稍后重试');
				insetAlert('notice','删除失败，请稍后重试',false,false,'');
			  }
		}
		});
	})
});

//进入课程
$('.ucenter-content-course dl:not(.ucontent-add)').hover(function(){
  //e.stopPropagation();
  var _href = $(this).find('dt a').attr('href');
  $(this).find('dt').append('<a class="ucourse-hover"></a><a class="ucourse-hover-span">进入课程<i class="icon-arrow-white"></i></a>');
  $(this).find('dt .ucourse-hover').animate({opacity:'0.3'},100);
  $(this).find('dt .ucourse-hover-span').animate({left:'0'},100);

  $('.ucourse-hover').attr('href',_href);
  $('.ucourse-hover-span').attr('href',_href);

},function(){
  $(this).find('dt .ucourse-hover, dt .ucourse-hover-span').remove();
});
//师生动态展开收起
$('.ucenter-feeds-unfold').live('click',function(){
  	//var _height = $(this).siblings().find('.ucenter-feeds-text').height()+$(this).siblings().find('.ucenter-feeds-img').height();
  	var _height = $(this).siblings('.ufeeds-detail-foldarea').height();
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
//var dataLen = $('.cdetail-data-list').length;
//var dataPage = 1;
//$(".dthumb li").click(function(){
//  dataPage =   $(".dthumb li").index(this);
//  DataScroll(dataPage);
//});	

$('.dthumb').live('click',function(e){
	//e.preventDefault();
	//e.stopPropagation();
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
//编辑大纲
var outline = {
	chapterHtml : function(cid){
		  return '<div class="item"><h6 data-cid="'+(cid+1)+'" data-level="1"><span class="item-num">第'+(cid+1)+'章</span><input class="item-input" id="" name="" type="text" placeholder="输入本章名" /></h6><div class="create" id="section-create" title="创建新的节"><i class="icon-setcourse-plus"></i>创建新的节</div></div>';
	},
	sectionHtml : function(sid){
		return '<div class="item"><h6 data-sid="'+(sid+1)+'" data-level="2"><span class="item-num">第'+(sid+1)+'节</span><input class="item-input" id="" name="" type="text" placeholder="输入本节名" /></h6><div class="create" id="sub-section-create" title="创建新的小节"><i class="icon-setcourse-plus"></i>创建新的小节</div></div>';			  
	},
	subSectionHtml : function(ssid){
		return '<div class="item"><h6 data-ssid="'+(ssid+1)+'" data-level="3"><span class="item-num">第'+(ssid+1)+'小节</span><input class="item-input" id="" name="" type="text" placeholder="输入本小节名" /></h6></div>';
	},
	createJson : function(level,itemContent){
		 switch(level){
			 case '1' : 
				 chapterObj.name = itemContent;
				 outlineData.chapter.push(chapterObj);
				 //console.log(outlineData);
			 break;
			 case '2' :
				 sectionObj.name = itemContent;
				 chapterObj.section.push(sectionObj);
				 //console.log(outlineData);
			 break;
			 case '3' :
				 sectionObj.sub.push(itemContent);
				 console.log(outlineData);
			 break;
		 }
	},
	save : function(){
		//完成按钮触发，ajax向后台发送数据outlineData
		$.ajax({
			type : 'POST',
			url : '',
			success : function(){
				//console.log(itemContent);		
			}
		});	
	},
	init : function() {
		outlineData = { chapter : [] };
		chapterObj = { name : '', section : [] };
		sectionObj = { name : '', sub : [] };
		//章节id
		cid = 0;
		sid = 0;
		ssid = 0;
	}
}

outline.init();

$('#edit-outline').delegate('#chapter-create','click',function(){
		$(this).before(outline.chapterHtml(cid));
		cid++;
		sid =0;
		ssid =0;
});

$('#edit-outline').delegate('#section-create','click',function(){
		$(this).before(outline.sectionHtml(sid));
		sid++;
		ssid =0;
});
$('#edit-outline').delegate('#sub-section-create','click',function(){
		$(this).before(outline.subSectionHtml(ssid));
		ssid++;
});
$('#edit-outline').delegate('.item-input','blur',function(){
	//input值
	var itemContent = $(this).val();
	//层级
	var level = $(this).parent('h6').attr('data-level');
	outline.createJson(level,itemContent);
	$(this).replaceWith('<p>'+itemContent+'</p>');
});

/*$('#select-grade').change(function(){
  /*ajax获取选中年级下的班级list
  $('#choose-class .controls').append('xxx');
});*/

//select美化
if($('select').length != 0){
  $('select').sSelect();
  $('select.select-small').next('.dropselectbox').find('h4').css({'width':'125px','background-position':'108px center'});
  $('select.select-small').next('.dropselectbox').find('ul').css({'width':'125px'});
}
//课程打分
//doGrade($('.course-rating-ul'));
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
	//alert('ajax加载资料预览数据');

    //return '<object width="100%" height="100%"><param name="movie" value="http://www.tudou.com/v/qCQKhudHLMo"><param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="always"> <param name="wmode" value="opaque"><embed src="http://www.tudou.com/v/qCQKhudHLMo" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque" width="100%" height="85%"></object>';
   return '<div class="sidebar-preview-data-text"><p>原因很清楚，当我们的调控都是以短期行为为目标的时候，通常会发生后遗症，一定是错的。中国最重要的是政府任届期，他会要求在短期市场中出现一个符合他心中要求的结果，他不会去管后期或者我们叫做长效机制而产生的结果。如果用市场经济的办法调控市场的话，可能对长远来说会让市场机制更加健全，让这只看不见的手发挥巨大作用。而我们的调控基本上是破坏市场经济机理，就是把市场经济的机制破坏的越严重越好，这样就可以按照他们的要求，今天这样，明天那样。就是我想让这个猪肉价格高点就高点，想让猪肉价格低点就低点。计划经济时代，毛主席有一个“论十大关系”，其中讲了一个总供给和总需求之间的关系。但是，到了市场经济，我突然发现没有这个概念了，不管总需求和总供给之间有什么差别，反正就是我说了算，我想让它高它就高点，我想让它低就是低点。从从从从从从从从从从从从从从从2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的。结果2008年经济危机之后我们出现了鼓励或者是振兴，弄把它弄上来了。从往下调到往上调，这几次都可以看到，2007年是往下调，是“两防”。</p></div>';
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
function closeAlert(){ $('#alert').modal('hide'); }
function insetAlert(alert_type,alert_con_msg,is_aside){
  $('body').find('#alert, .modal-backdrop').remove();
  var alertHtml = '';
  alertHtml += '<div class="hide fade modal" id="alert"> <div class="modal-body">';
  if(alert_type == 'notice'){
	alertHtml += '<p class="alert-con-moment alert-con"><span class="alert-con-msg"><i class="icon-alert-'+alert_type+'"></i>'+alert_con_msg+'</span>';	
	setTimeout(closeAlert,1200); 
  } else {
	  alertHtml += '<p class="alert-con"> <span class="alert-con-msg"><i class="icon-alert-'+alert_type+'"></i>'+alert_con_msg+'</span>';	
	  if(is_aside){ alertHtml += '<span class="alert-con-aside" data-dismiss="modal">'+is_aside+'</span>'; } 
	  alertHtml += '</p> <p class="alert-operate">';
	  if(alert_type == 'error' || alert_type == 'warning' ){
		alertHtml += '<a href="javascript:;" class="btn-darkblue btn btn-double" id="btn-confirm-cancel" data-dismiss="modal" style="width:99%;">确定</a>';	
	  } else {
		alertHtml += '<a href="javascript:;" class="btn-darkblue btn btn-double" id="btn-confirm" data-dismiss="modal">确定</a>';	
		alertHtml += ' <a href="javascript:;" class="btn-darkblue btn btn-double" id="btn-cancel" data-dismiss="modal">取消</a>';  
	  }
  }
  alertHtml += '</p> </div> </div>';
  $('body').append(alertHtml);
  $('#alert').modal('show');
}
