$(function(){
//课程大纲资料预览
$('.cdetail-data-list li').live('click',function(){ $('#modal-preview-data').modal(); });
$('#modal-preview-data').on('shown', function () { PreviewData(); })

//课程查看资料预览
$('#view-course .btn-preview').live('click',function(){
  $(this).next('.popover').css('left','2px');
  $(this).next('.popover').find('.arrow').css('margin-left','-15%');
});
$('.btn-preview').popover({
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
//----------------------------------------
});
function PreviewData(){
	//alert('ajax加载资料预览数据');

    //return '<object width="100%" height="100%"><param name="movie" value="http://www.tudou.com/v/qCQKhudHLMo"><param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="always"> <param name="wmode" value="opaque"><embed src="http://www.tudou.com/v/qCQKhudHLMo" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque" width="100%" height="85%"></object>';
   return '<div class="sidebar-preview-data-text"><p>原因很清楚，当我们的调控都是以短期行为为目标的时候，通常会发生后遗症，一定是错的。中国最重要的是政府任届期，他会要求在短期市场中出现一个符合他心中要求的结果，他不会去管后期或者我们叫做长效机制而产生的结果。如果用市场经济的办法调控市场的话，可能对长远来说会让市场机制更加健全，让这只看不见的手发挥巨大作用。而我们的调控基本上是破坏市场经济机理，就是把市场经济的机制破坏的越严重越好，这样就可以按照他们的要求，今天这样，明天那样。就是我想让这个猪肉价格高点就高点，想让猪肉价格低点就低点。计划经济时代，毛主席有一个“论十大关系”，其中讲了一个总供给和总需求之间的关系。但是，到了市场经济，我突然发现没有这个概念了，不管总需求和总供给之间有什么差别，反正就是我说了算，我想让它高它就高点，我想让它低就是低点。从从从从从从从从从从从从从从从2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的2003年以后大部分是打压的。结果2008年经济危机之后我们出现了鼓励或者是振兴，弄把它弄上来了。从往下调到往上调，这几次都可以看到，2007年是往下调，是“两防”。</p></div>';
}
