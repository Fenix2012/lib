$(function(){
//----------------------------------------
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
  $(this).find('dt').append('<a class="ucourse-hover" target="_blank"></a><a class="ucourse-hover-span" target="_blank">进入课程</a>');
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

//----------------------------------------
});

