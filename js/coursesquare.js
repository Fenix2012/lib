$(function(){
//美化select
$("#select-course").sSelect();
$("#select-grade").sSelect();
//增加序号和FREE图标
$('.row-fluid .span3').each(function(i){
  if(i < 3){
 	$(this).find('ul li:eq(0)').append('<span class="csquare-rank"></span>');
  }
});
$('li.free').append('<span class="csquare-free"></span>');
//大图轮播
var len = $('.pic_list li').length;
var page = 1;
$(".thumb li").click(function(){
  page =   $(".thumb li").index(this);
  PicScroll(page);
});	
$('.pic_list').hover(function(){
  if(_PicScroll){
	clearInterval(_PicScroll);
  }
},function(){
	_PicScroll = setInterval(function(){
	if(page == len){ page = 0; }
	PicScroll(page);
	page++; 
  }, 3000);
});
var _PicScroll = setInterval(function(){
	PicScroll(page);	
	page++;
	if(page == len){ page = 0;}
},3000);
function PicScroll(page){
  $('.pic_list li').eq(page).fadeIn().siblings().fadeOut();
  //$('.pic_list li').eq(page).fadeOut();
  $('.thumb li span').eq(page).addClass('cur')
  $('.thumb li span').eq(page).parent('li').siblings('li').find('span').removeClass('cur');
  //console.log(page);
  $('.recommend').height($('.pic_list img').eq(page).height());
  $(window).resize(function() {
	$('.recommend').height($('.pic_list img').eq(page).height());
  });
}
//-------------------------------
});
//初始化焦点图高度
$('.pic_list img').eq(0).load(function(){ imgHeight = this.height; $('.recommend').height(imgHeight).show(); });
