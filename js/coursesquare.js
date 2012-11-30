
$(function(){
  //大图轮播
 	//$('.recommend').height($('.pic_list img').eq(0).height());
	//console.log($('.pic_list img').eq(0).height());
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

  //Tab切换
	//$('.lib_tab li').click(function(){TabSelect('.lib_tab li', '.show_con', 'cur', $(this))});
	//$('.lib_tab li').eq(0).trigger('click');

	$('.show .box_hd li').click(function(){TabSelect('.show .box_hd li', '.show_con', 'cur', $(this))});
	$('.show .box_hd li').eq(0).trigger('click');
	function TabSelect(tab,con,addClass,obj){
		var jQuery_self = obj;
		var jQuery_nav = jQuery(tab);
		jQuery_nav.removeClass(addClass),
		jQuery_self.addClass(addClass);
		var jQuery_index = jQuery_nav.index(jQuery_self);
		var jQuery_con = jQuery(con);
		jQuery_con.hide(),
		jQuery_con.eq(jQuery_index).show();
	}
  //首页箭头	
 	$('.show_item').hover(function(){
		$(this).find('.btn_pointer').show();
	},function(){
		$(this).find('.btn_pointer').hide();
	});

  //翻页
 	function PageScroll(page,btn,offset){
	  var num = 1;
	  //var len  = page.length;
	  if(btn.hasClass('btn_next')){
		page.animate({'left':'-'+offset*num+'px'});
		num++;
	  } else {
		num--;
		page.animate({'left':offset*num+'px'});
	  }
	} 
	$('.show .btn_pointer').live('click',function(){
	  	var _page = $(this).siblings('.show_item_con').find('.show_item_scroll');
		PageScroll(_page,$(this),'786');
	});
  //资源检索翻页
	//$('.btn_next').live('click',function(){
	//	$(this).siblings('.show_item_scroll').animate({'left':'-745px'},1000);
	//})
	$('.resource_next').live('click',function(){
		$('.resource_inner').animate({'left':'-810px'},1000);
	})

  //大图轮播
  //    var len  = $(".pic_list li").length;
  //	var page = 1;
  //	$(".thumb li").click(function(){
  //	  page =   $(".thumb li").index(this);
  //	  PicScroll(page);
  //	});	
  //	$('.pic_list').hover(function(){
  //	  if(_PicScroll){
  //		clearInterval(_PicScroll);
  //	  }
  //	},function(){
  //		_PicScroll = setInterval(function(){
  //		if(page == len){ page = 0; }
  //		PicScroll(page);
  //		page++; 
  //	  }, 3000);
  //	});
  //	var _PicScroll = setInterval(function(){
  //	  PicScroll(page);
  //	  page++; 
  //	  if(page == len){ page = 0; }
  //	}, 3000);
  //	function PicScroll(page){
  //	  $('.pic_list li').animate({'left':'-'+1100*page+'px'});
  //	  $('.thumb li span').eq(page).addClass('cur')
  //	  $('.thumb li span').eq(page).parent('li').siblings('li').find('span').removeClass('cur');
  //	}
//-------------------------------
});
