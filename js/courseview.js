$(function(){
//边栏开关
var w_main = $('.course-view .main').width();
var w_sidebar = $('.course-view .sidebar').width();
$('.sidebar-switch').toggle(function(){
  $(this).parents('.main').animate({'width':'100%'},300);
  $(this).parents('.main').siblings('.sidebar').animate({'width':'0','opacity':'0'},250);
  $(this).addClass('sidebar-switch-i');
},function(){
  $(this).parents('.main').animate({'width':w_main},300);
  $(this).parents('.main').siblings('.sidebar').animate({'width':w_sidebar,'opacity':'1'},250);
  $(this).removeClass('sidebar-switch-i');
});
//滚动条美化
//$(".cview-sidebar-list ul.note").jscroll({ W:"12px"//设置滚动条宽度
//  ,BgUrl:""//设置滚动条背景图片地址
//  ,Bg:"#ccc"//设置滚动条背景图片position,颜色等
//  ,Bar:{  Pos:"bottom"//设置滚动条初始化位置在底部
//		  ,Bd:{Out:"#000",Hover:"red"}//设置滚动滚轴边框颜色：鼠标离开(默认)，经过
//		  ,Bg:{Out:"green",Hover:"#fff",Focus:"orange"}}//设置滚动条滚轴背景：鼠标离开(默认)，经过，点击
//  ,Btn:{  btn:false//是否显示上下按钮 false为不显示
//		  ,uBg:{Out:"black",Hover:"#fff",Focus:"orange"}//设置上按钮背景：鼠标离开(默认)，经过，点击
//		  ,dBg:{Out:"black",Hover:"#fff",Focus:"orange"}}//设置下按钮背景：鼠标离开(默认)，经过，点击
//  ,Fn:function(){}//滚动时候触发的方法
//});
//页面高度调整
function Resize(){
  var pageHeight = document.documentElement.clientHeight;
  $('.course-view').height(pageHeight);
  $('.course-view .main').height(pageHeight);
  $('.course-view .sidebar').height(pageHeight-20);
  $('.course-view .main .cview-con').height(pageHeight-200);
  $('.cview-sidebar-list .note').height(pageHeight-160);
  $('#cview-note .loading-box').height(pageHeight-160);
  //$('#cview-note .loading-box').load(function(){alert(44);});
  //$('.cview-sidebar-con').height(h-96);
  //$('.cview-res-wrap').height(h-154);
  //$('.cview-res-bd.all').height(h-208);

}
Resize();
$(window).resize(function(){
	Resize();	
});

var CVIEW = {
  	GetNote : function(){
		$('#cview-note .cview-sidebar-hd').next().remove();
		$.ajax({
		  type : 'GET',
		  url : ' ',
		  beforeSend : function(){
			 $('#cview-note .cview-sidebar-hd').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
		  },
		  success : function(data){
			  alert('加载笔记成功');	
			  //拼接笔记首页html
			  var html = '';
			  html+='<div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>笔记</span><button class="btn-add-note btn" id="btn-addnote" href="#"><i class="icon-plus"></i>添加笔记</button></div><div class="cview-sidebar-list"><ul class="note">';
			  //<li><span class="cview-item-name"><i class="icon-sidebar-item"></i><a href="#" target="_blank">笔记</a><span class="arrow-right"></span></span><p><span class="cview-sidebar-time">2012-09-12  12:00</span></p></li>
			  html+='</ul></div>';		 
			  $('#cview-note').html(html);
		  }
		});
	},
	AddNote : function(obj){
		if(obj.hasClass('go-back')){
		  CVIEW.GetNote();
		} else {
		  obj.text('返回').addClass('go-back');
		  obj.prev('span').html('<i class="icon-arrowdown"></i>写笔记');
		  obj.parents('.cview-sidebar-hd').next('.cview-sidebar-list').remove();
		  obj.parents('.cview-sidebar-hd').after(' <div class="cview-sidebar-form"> <form> <input type="text" class="input-xlarge" id="input01" placeholder="输入标题"/> <textarea class="input-xlarge" id="textarea" rows="3" placeholder="输入问题"></textarea> <p class="cview-note-opt clearfix"> <span>查看权限</span>： <button type="submit" class="btn-achieve btn">完成</button> <button type="submit" class="btn-noteauth btn">公开</button> </p> </form> </div>	');
		}
	},
	ViewNote : function(obj){
		//obj.text('返回').addClass('go-back');
		obj.parents('.cview-sidebar-list').prev('.cview-sidebar-hd').next('.cview-sidebar-list').remove();
		$.ajax({
		  type : 'GET',
		  url : ' ',
		  beforeSend : function(){
			 $('#cview-note .cview-sidebar-hd').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
		  },
		  success : function(data){
			  alert('查看笔记成功');	
			  //拼接查看笔记html
			  var html = '';
			  html+='<div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>查看笔记</span><button class="go-back btn-add-note btn" href="#">返回</button></div><div class="cview-sidebar-detail clearfix"><div class="fL"><h5>';
			  html+="笔记名";
			  html+='</h5><span class="cview-sidebar-time">';
			  html+="2012-09-12  12:00";
			  html+='</span> </div> <div class="fR"> <div class="cres-opt"> <a class="btn-preview btn" id="btn-editnote" href="#">编辑</a><a class="btn-play btn" id="btn-delnote" href="#">删除</a> </div> </div> </div> <div class="cview-note-con"> <p>';
			  html+="这里是笔记正文这里是笔记正文这里是笔记正文这里是笔记正文";
			  html+='</p></div>';		 
			  $('#cview-note').html(html);
		  },
		});
	},
	DelNote : function(){
		//这里是删除笔记ajax
		alert('删除笔记成功');		  
		CVIEW.GetNote();
	},
	EditNote : function(){
		//这里是编辑笔记ajax
		alert('编辑编辑');		  
		CVIEW.AddNote();
	}
}
//笔记Tab
$('.cview-sidebar-nav .note').live('click',function(){ CVIEW.GetNote(); });
//添加笔记
$('#btn-addnote').live('click',function(){ CVIEW.AddNote($(this)); });
//查看笔记
$('#cview-note .note li').live('click',function(){ CVIEW.ViewNote($(this)); });
//删除笔记
$('#btn-delnote').live('click',function(){ CVIEW.DelNote(); });
//编辑笔记
$('#btn-editnote').live('click',function(){ CVIEW.EditNote(); });
//----------------------------------------
});
