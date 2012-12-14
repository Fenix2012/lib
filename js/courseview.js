$(function(){
//边栏开关
var w_con= $('.course-view .view-con').width()+47,
	w_sidebar = $('.course-view .view-sidebar').width()+5,
	$con = $('.sidebar-switch').parents('.view-con');
$('.sidebar-switch').toggle(function(){
  $con.animate({'width':'100%'},300);
  $con.siblings('.view-sidebar').animate({'width':'0','opacity':'0'},250,function(){ $(this).hide(); });
  $(this).addClass('sidebar-switch-i');
},function(){
  $con.animate({'width':w_con},300);
  $con.siblings('.view-sidebar').animate({'width':w_sidebar,'opacity':'1'},250,function(){ $(this).show(); });
  $(this).removeClass('sidebar-switch-i');
});

Resize();
$(window).resize(function(){ Resize();	});

function Resize(){
  var pageHeight = document.documentElement.clientHeight;
  //var videoGalleryHeight = $('.video-gallery').height()+78;
 // console.log(pageHeight); 
  var videoGalleryHeight = $('.video-gallery').height();
  //console.log(videoGalleryHeight);
  $('#view-course').height(pageHeight);
  $('#view-video-classroom').height(pageHeight);
  if($('.video-gallery').length == 0){
	$('.view-con').height(pageHeight);
	$('.view-sidebar').height(pageHeight-20);
	$('.view-main').height(pageHeight-200);
  } else {
	$('.view-con').height(pageHeight-videoGalleryHeight-78);
	$('.view-sidebar').height(pageHeight-videoGalleryHeight-20);
	$('.view-main').height(pageHeight-280);
	//$('#view-video-classroom .row-fluid').height(pageHeight-$('.video-gallery').height());
  }


  $('.cview-sidebar-list .note').height(pageHeight-160);
  $('#cview-note .loading-box').height(pageHeight-160);

  	bind_text_submit_process();
	bind_video_link_process();
	bind_pdf_upload_process();
	bind_ppt_upload_process();
}

function complete_item(){
	$.ajax(
			{
				'url' : libSchoolBaseUrl + 'teach/coursepost/usermarkitemcomplete&item=' + libedu_cur_item + '&course=' + libedu_cur_course ,
				'type' : 'post',
				'success' : function() {
					$('.mark-complete').addClass('cview-complete');
					
				},
			}
		  );
}
function bind_pdf_upload_process()
{
	resource_uploader.pdf_file_upload_callback = function( file , data , response ) {
			var json = eval( '(' + data + ')' );
			if ( json.result == 'success' )
			{	
				alert('文档上传成功');
				var input_code = $('<input type="hidden" id="pdf-post-cont">');
				input_code.val( json.save_path );
				$('#form-adddata-pdf').append( input_code );
				input_code = $('<input type="hidden" id="pdf-mid">');
				input_code.val( json.mid );
				$('#form-adddata-pdf').append( input_code );
			}
			else {
				alert('文档上传失败，请重试');
			}
		};
	resource_uploader.pdf_submit_callback = function( data ) {
			var json = eval( '(' + data + ')' );
			if ( json.result == "success" ) { 
				alert( '资料提交成功' );
				$('#modal-add-data').modal('hide');
				CVIEW.GetPostList();
			}else {
				alert('资料提交失败了，请重试');
				$('#modal-add-data').modal('hide');
				CVIEW.GetPostList();				
			}
			$('#form-adddata-pdf .uploading').remove();
			$('#form-adddata-pdf #pdf-post-cont').remove();
			$('#form-adddata-pdf #pdf-mid').remove();
			$('#pdf-post-description').val('');
	};
	resource_uploader.bind_pdf_upload_process();
}
function bind_ppt_upload_process()
{
	resource_uploader.ppt_file_upload_callback = function(file, data, response) {
		var json = eval( '(' + data + ')' );
			if ( json.result == 'success' )
			{
				alert('文档上传成功');
				var input_code = $('<input type="hidden" id="ppt-post-cont">');
				input_code.val( json.save_path );
				$('#form-adddata-ppt').append( input_code );
				input_code = $('<input type="hidden" id="ppt-mid">');
				input_code.val( json.mid );
				$('#form-adddata-ppt').append( input_code );
			}
			else
			{
				alert('文档上传失败，请重试');
			}
	};
	resource_uploader.ppt_submit_callback = function(data) {
		var json = eval( '(' + data + ')' );
		if ( json.result == "success" ) { 
					alert( '资料提交成功' );
					$('#modal-add-data').modal('hide');
					CVIEW.GetPostList();
		}else {
					alert('资料提交失败了，请重试');
					$('#modal-add-data').modal('hide');
					CVIEW.GetPostList();				
		}
		$('#form-adddata-ppt .uploading').remove();
		$('#form-adddata-ppt #ppt-post-cont').remove();
		$('#form-adddata-ppt #ppt-mid').remove();
		$('#ppt-post-description').val('');
	
	};
	resource_uploader.bind_ppt_upload_process();
}
function bind_video_link_process()
{
	resource_uploader.video_link_submit_callback = function(data){
		var json = eval( '(' + data + ')' );
		if ( json.result == "success" ) {
			alert( '保存视频链接成功' );
			$('#post-description-textarea').val('');
			$('#video-link').val('');
			$('#modal-add-data').modal('hide');
			CVIEW.GetPostList();
		}
		else {
			alert('保存视频链接失败了，请重试');
			$('#modal-add-data').modal('hide');
			CVIEW.GetPostList();
		}
		return false;
	};
	resource_uploader.bind_video_link_process();
}
function bind_text_submit_process()
{
	resource_uploader.text_submit_callback = function(data) {
		var json = eval( '(' + data + ')' );
			if ( json.result == "success" ) {
				alert( '保存文本成功' );
				$('#modal-add-data').modal('hide');
				CVIEW.GetPostList();
			}
			else {
				alert('保存文本失败了，请重试');
				$('#modal-add-data').modal('hide');
				CVIEW.GetPostList();
			}
			return false;

	};
	resource_uploader.bind_text_submit_process();
}
var CVIEW = {
	_loadNoteEditFormCode : function() {
		var url = libSchoolBaseUrl + 'teach/note/getaddnoteformcode';
		$('#cview-note').load( url , null , function(){

			 $('.btn-achieve.btn').unbind( 'click' );		  
		  	 $('.btn-achieve.btn').on('click' , function(){
		  	 	 $.ajax(	{
								'url'     : libSchoolBaseUrl  + 'teach/note/createnote&course=' + libedu_cur_course + '&item=' + libedu_cur_item ,
								'type'    : 'post',
								'data'    : $('#add_note_form').serialize() ,
								'success' : function(data) {
									if ( data != "" ) {	
										   var json = eval( '(' + data + ')' );
									   		if ( json['result'] == "success" )
									   		{
										   		alert("添加笔记成功");									   
									   		}
								 	   		CVIEW.GetNote();
									}
								},
							});	
			  	return false;
		  	} );
		} ) ;
	},
	_loadQuestionEditFormCode : function() {
		var url = (libSchoolBaseUrl + 'teach/question/getquestionform') ;
		$('#cview-question').load( url , null , function() {
			$('#add_question_form').append( $('<input type="hidden" name="Question[item]">').val( libedu_cur_item  ) );
			$('#add_question_form .btn-publish').unbind('click');
			$('#add_question_form .btn-publish').on('click' , function(){				  
				  $.ajax(	{
								'url'     : libSchoolBaseUrl  + 'teach/question/create',
								'type'    : 'post',
								'beforeSend' : function(){
									 $('#cview-question .cview-sidebar-hd').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
								},
								'data'    : $('#add_question_form').serialize() ,
								'success' : function(data) {
												if ( data != "" ) {	
													if ( data == "success" ) {
															alert("添加问题成功");									   
													}else {
															alert('添加问题失败');										   
													}
													CVIEW.GetQuestion();
												}
								}
							}
					); 	
					return false;			
			});	
		});
	},
  	GetNote : function(){
		$('#cview-note .cview-sidebar-hd').next().remove();	
		var loading_img_code = '<div class="loading-box"><img src="images/loading.gif" alt="" /></div>';
		
		$.ajax({
		  'type' : 'GET',
		  'url'  : libSchoolBaseUrl + 'teach/note/loadnotes&item=' + libedu_cur_item + '&course=' + libedu_cur_course ,
		  'beforeSend' : function(){
			 				$('#cview-note .cview-sidebar-hd').after( loading_img_code );
		  				},
		  'success' : function( data ){
			  	var json = eval( '(' + data + ')' );
			  	 //拼接笔记首页html
			  	var json = eval( '(' + data + ')' );
			  	var html = '';
			  	html+='<div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>笔记</span><button class="btn-add-note btn" id="btn-addnote" href="#">';
			  	html += '<i class="icon-plus"></i>添加笔记</button></div><div class="cview-sidebar-list"><ul class="note">';
			  	$.each( json , function( index , val ){
				  html += '<li data-nid="' + val['note_id'] ;
				  html += '"><span class="cview-item-name"><i class="icon-sidebar-item"></i>';
				  //html += '<a href="#" data-nid="' + val['note_id'] + '">';
				  html += val['note_title'] ;
				  html += '<span class="arrow-right"></span></span>';
				  html += '<p><span class="cview-sidebar-time">';
				  html += val['note_uptime']; 
				  html += '</span></p></li>';
			  	});
			  	html+='</ul></div>';	
			  	$('#cview-note').html(html);
		  	},
		});
	},
	AddNote : function(obj){
		this._loadNoteEditFormCode();
	},
	ViewNote : function(obj){
		if(obj.hasClass('go-back')){
			  CVIEW.GetNote();
		}
		else {
		//obj.text('返回').addClass('go-back');
			obj.parents('.cview-sidebar-list').prev('.cview-sidebar-hd').next('.cview-sidebar-list').remove();
			$.ajax({
					'type' : 'GET',
					'url' : libSchoolBaseUrl + 'teach/note/getNoteContent&note_id=' +  $(obj).attr('data-nid'),
					'beforeSend' : function(){
						$('#cview-note .cview-sidebar-hd').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
					},
					success : function(data){
							var json = eval( '(' + data + ')' );
							//拼接查看笔记html
							var html = '';
							html += '<div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>查看笔记</span>';
							html += '<button class="go-back btn-add-note btn" href="#">返回</button></div><div class="cview-sidebar-detail clearfix">';
							html += '<div class="fL"><h5>';
							html += '<span id="cur_note_title">';
							html += json['note_title'];
							html += '</span>';
							html += '</h5><span class="cview-sidebar-time">';
							html += json['note_uptime'] ;
							html += '</span> </div> <div class="fR"> <div class="cres-opt"> <a class="btn-preview btn" id="btn-editnote" href="#">编辑</a><a class="btn-play btn" id="btn-delnote" href="#">删除</a> </div> </div> </div>';
							html += '<div class="cview-note-con"> <p>';
							html += json['note_content'];
							html += '</p></div>';		 
							$('#cview-note').html(html);
							$('#btn-delnote').attr( 'data-nid' , obj.attr('data-nid') );
							$('#btn-editnote').attr( 'data-nid' , obj.attr('data-nid') );
					},
			});
		}
	},
	DelNote : function( this_obj ){
		//这里是删除笔记ajax
		var nid =  this_obj.attr('data-nid');
		$.ajax({
				'url' : libSchoolBaseUrl + 'teach/note/delnotecontent',
				'type' : 'post',
				'data' : { note_id : nid },
				'beforeSend' : function(){
						 $('#cview-note .cview-sidebar-hd').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
				},
				'success' : function(data){
					var json = eval( '(' + data + ')' );
					if ( json.result == "success" )
					{
						alert('删除笔记成功');					
					}		
					CVIEW.GetNote();
				}
			 }	 
		);
		//CVIEW.GetNote();
	},
	EditNote : function( this_obj ){
		//这里是编辑笔记ajax
		var note_con = $('.cview-note-con').text();
		var note_title = $('#cur_note_title').text();
		var html = this._getNoteEditFormCode();
		$('#cview-note').html( html );
		
		$('#note_content').val( note_con );
		$('#note_title').val( note_title );
		$('#add_note_form').append('<input style="display:none" name="note[id]" value="' + this_obj.attr('data-nid') + '" />');
		
		$('.btn-achieve.btn').unbind('click');
		$('.btn-achieve.btn').on('click' , function(){
			  $.ajax(	{
				  			'url' : libSchoolBaseUrl  + 'teach/note/updatenote',
				  			'type'    : 'post',
				  			'data'    : $('#add_note_form').serialize() ,
				  			'success' : function(data) {
								if ( data != "" ) {	
									var json = eval( '(' + data + ')' );
									if ( json['result'] == "success" )
									{
										alert("更新笔记成功");
									}
									CVIEW.ViewNote( this_obj );
								}
				  			}
					    }
			  );
			  return false;
			
		});
	},
	AddQuestion : function( obj ) {

		CVIEW._loadQuestionEditFormCode();		  
		//obj.text('返回').addClass('go-back');		
	},
	GetClassStudentTaskRecord : function( taskid , userid , task_name , cid ) {
		$.ajax({
			'url' : libSchoolBaseUrl + 'teach/task/loadusertaskrecord&uid=' + userid + '&task=' + taskid ,
			'beforeSend' : function(){
				$('#cview-task .cview-sidebar-hd').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
			},
			'success' : function(data){
				var json = eval( '(' + data + ')' );
				var html = '<div class="cview-sidebar-hd"><span id="view_user_task_title"><i class="icon-arrowdown"></i>';
				html += json.name;
				html += '的作业</span>';
				html += '<button class="btn" href="#" id="return_view_task_btn">返回</button></div>';
				html += '<div class="cview-sidebar-detail clearfix"  id="task_user_info"><div class="cview-utask-avatar">';
				html += '<img src="images/top-nav-avatar.png" alt="" />';
				html += '</div><h5>';
				html += json.name; 
				html += '</h5><span>学号：<em>';
				html += json.school_unique_id;
				html += '</em></span></div>';
				html += '<div class="cview-utask-list"><div class="cview-utask-list-hd clearfix"><span class="cview-sidebar-time">2012-09-12  12:00</span>';
				html += '<h5><i class="icon-sidebar-item"></i>';
				html += task_name;
				html += '</h5></div><ul class="cview-utask-list-bd">';
				$.each( json.submit_record , function(i,val){
					html += '<li class="clearfix"><div class="fL"><h5>';
					html += val['title'];
					html += '</h5>';
					html += '<span class="cview-sidebar-time">';
					html += val['submit_time'];
					html += '</span></div><div class="fR"><div class="cres-opt">';
					html += '<a class="btn-preview btn" href="#">预览</a><a class="btn-play btn" data-sid="';
					html += val['submit_id'] + '"';
					html += ' href="#">播放</a></div></div></li>';					
				}  );
				html += ' </ul></div>';
				$('#cview-task').html(html);
				$('.btn-play').live( 'click' , function(){
					$.ajax(
							{
								'url' : libSchoolBaseUrl + 'teach/task/loadtasksubmitrecordrsc&sid=' + $(this).attr('data-sid'),
								'success' : function(data) {
									var json = eval( '(' + data + ')' );
									$('.view-main').html( json.submit_content );
								}
							}
						);					
				});
				$('#return_view_task_btn').live('click' , function(){
					CVIEW.ViewTask( taskid )
				})
			},
		});
	},
	_load_class_student_task_record : function( cid , taskid , task_name )
	{
		$('#task_course_student_table').children('tbody').html('');
		$.ajax({
			'url'     : libSchoolBaseUrl + 'teach/task/loadtaskrecordbyclass&cid=' + cid + '&task=' + taskid,
			'beforeSend' : function(){
				//$('#task_course_student_table').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
				$('#task_course_student_table').children('tbody').html('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
			},
			'success' : function( data ) {
				var json = eval( '(' + data + ')' );
				var astr = "";
				$.each( json , function(i,val){
					astr += '<tr data-tid="' + taskid + '" data-uid="' + val.id + '"><td>' + val.school_unique_id + '</td><td>' + val.name + '</td>';
					if ( val.task_status == 0 )
					{
						astr += '<td class="uncommitted">未提交<span class="arrow-right"></span></td></tr>';
					}
					else
					{
						astr += '<td>已提交<span class="arrow-right"></span></td></tr>';
					}
				} );
				$('#task_course_student_table').children('tbody').html( astr );
				$('#task_course_student_table tbody tr').each( function(){
					$(this).on('click' , function(e){
						CVIEW.GetClassStudentTaskRecord( $(this).attr('data-tid') , $(this).attr('data-uid') ,
							 task_name , cid );
					});			
				} );
			} ,		
		});
	},
	_load_task_info : function( tid )
	{
		if ( typeof tid == 'undefined' ) {
			return ;
		}
		$.ajax(
				{
					'url'     : libSchoolBaseUrl + 'teach/task/loadtaskinfo&task=' + tid ,
					'beforeSend' : function(){
						$('#cview-task .cview-sidebar-hd').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
					},
					'success' : function(data) {
						var json = eval( '(' + data + ')' );
						html = '<div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>' + json.name + '</span>';
						html += '<button class="btn" href="#" id="return_index_task_btn">返回</button></div><div class="cview-sidebar-detail clearfix">';
						html += '<div class="fL"><h5>';
						html += json.name + '</h5>';
						html += '<span class="cview-sidebar-time">';
						html += json.update_time + '</span>';
						html += '</div><div class="fR"><div class="cres-opt"><a class="btn-preview btn" href="#">预览</a>';
						html += '<a class="btn-play btn" href="#">播放</a></div></div></div><div class="cview-sidebar-bd">';
						html += '<select id="task_course_classes" name="">';
						var first_class_id = 0;
						$.each( json.course_class , function( i , val ) {
							html += '<option value="13">' + val.name + '</opton>';
							if ( i == 0 ) {
								first_class_id = val.cid;
							}
							++ i;
						} );
						html += '</select>';
						html += '<table class="table-bordered table-condensed table" id="task_course_student_table"><thead><tr>';
						html += '<th>学号</th><th>姓名</th><th>作业</th></tr>';
						html += '</thead><tbody></tbody></table></div>';
						
						$('#cview-task').html(html);
						CVIEW._load_class_student_task_record( first_class_id , tid , json.name );
					}
				}
		);
	},
	ViewTask : function( taskid , this_obj ) {
		var tid = taskid;
		if ( typeof this_obj != 'undefined' )
		{
			alert( this_obj.attr('data-tid') );
			this_obj.parents('.cview-sidebar-list').prev('.cview-sidebar-hd').next('.cview-sidebar-list').remove();
			this._load_task_info( this_obj.attr('data-tid') );
		}	
		else 
		{
			this._load_task_info( tid );
		
		}	
		$('#return_index_task_btn').live( 'click' , function(){
			CVIEW.GetTaskList();
		});
	},
	GetTaskList : function() {
		
		$('#cview-task .cview-sidebar-hd').next().remove();		
		$.ajax({
		  type : 'GET',
		  url  : libSchoolBaseUrl + 'teach/task/loadtasks&item=' + libedu_cur_item + '&course=' + libedu_cur_course ,
		  beforeSend : function(){
			 $('#cview-note .cview-sidebar-hd').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
		  },
		  success : function(data){
			  var json = eval( '(' + data + ')' );
			  var html = '';
			  html += '<div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>全部作业(<em>';
			  html += json.length ;
			  html += '</em>)</span> <button class="btn" href="#"><i class="icon-plus"></i>布置作业 </button></div>';
			  html += '<div class="cview-sidebar-list"><ul class="task">';
			  $.each( json , function( index , val ){
				  html += '<li class="task_element" data-tid="' + val['task_id'] + '">';
				  html += '<span class="cview-item-name"><i class="icon-sidebar-item"></i>';
				  html += val['task_name'];
				  html += '<span class="arrow-right"></span></span><p class="clearfix">';
				  html += val['task_item_des'] + '<span class="cview-sidebar-time">';
				  html += val['task_uptime'] + '</span></p></li>'
			  });
			  html+='</ul></div>';	
			  $('#cview-task').html(html);
		  }
		});			
	},
	_get_single_post_code : function( type , rsc_name , rsc_desc , author_name , liked_users  ) {
		var code = '<div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>查看资料</span><button class="go-back btn" href="#">返回</button></div>';
		code += '<div class="cres-page"><div class="cres-con">';
		switch ( parseInt(type) )
		{
		case 1:
			code += '<div class="cres-ppt">';
			break;
		case 2:
			code += '<div class="cres-video">';
			break;
		case 3:
			code += '<div class="cres-text">';
			break;
		case 4:
			code += '<div class="cres-pdf">';
			break;			
		}		
		code += '<div class="cres-pic"></div>';
		code += '<p>' + rsc_name + '</p>';
		code += '<p>' + author_name + '</p>';
		code += '</div></div><div class="cres-opt"><a class="btn-preview btn" href="#"><i class="icon-preview"></i>预览</a>';
		code += '<a class="btn-play btn" href="#">播放<i class="icon-play"></i></a> </div>';
		code += ' <p class="cres-intro">' + rsc_desc + '</p><div class="cres-liked">';
		code += '<div class="cres-liked-hd"><p>喜欢该资料的人(<em>';
		code += liked_users.length;
		code += '</em>)</p></div><ul class="cres-liked-bd clearfix">';
		$.each( liked_users , function(i,val){
			code += '<li><a href="#" target="_blank"><img src="';
			code += val['avatar_url'] + '" alt="userName" width="60" height="60"><div>';
			code += val['user_name'] + '</div></a></li>';			
		})
		code += '</ul></div></div>';
		return code;
	},
	_get_post_resource_list_code : function( course_teacher_plist , course_student_plist , course_other_teacher_plist ){
		var cres_icon = ['cview-res-ppt' , 'cview-res-video', 'cview-res-text' , 'cview-res-pdf'];
		var html = '<div class="cview-res-wrap" id="post_view_res"><div class="cview-res"><div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>本课程老师的资料(<em>';
		html += course_teacher_plist.length + '</em>)</span><button class="btn" href="#">查看全部</button></div><ul class="cview-res-bd clearfix">';
		$.each( course_teacher_plist , function( i , val ){
			html += '<li class="' + cres_icon[ val['post_type']-1 ] + '" data-pid="' + val['post_id'] + '" data-type="' + val['post_type'] + '">';
			html += '<p>' + val['post_title'] + '</p>';
			html += '<p>' + val['author_name'] + '</p>';
			html += '</li>';
		});		
		html += '</ul></div>';
		html += ' <div class="cview-res"><div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>';
		html += '学生共建的资料(<em>';
		html += course_student_plist.length + '</em>)</span><button class="btn" href="#">查看全部</button></div>';
		html += '<ul class="cview-res-bd clearfix">';
		$.each( course_student_plist , function(i , val){
			html += '<li class="' + cres_icon[ val['post_type']-1 ] + '" data-pid="' + val['post_id'] + '" data-type="' + val['post_type'] + '">';
			html += '<p>' + val['post_title'] + '</p>';
			html += '<p>' + val['author_name'] + '</p>';
			html += '</li>';
		});
		html += '</ul></div>';
		html += '<div class="cview-res"><div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>其他老师的资料(<em>';
		html += course_other_teacher_plist.length + '</em>)</span>';
		html += '<button class="btn" href="#">查看全部</button></div><ul class="cview-res-bd clearfix">';
		$.each( course_other_teacher_plist , function(i , val) {
			html += '<li class="' + cres_icon[ val['post_type']-1 ] + '" data-pid="' + val['post_id'] + '" data-type="' + val['post_type'] + '">';
			html += '<p>' + val['post_title'] + '</p>';
			html += '<p>' + val['author_name'] + '</p>';
			html += '</li>';
		} );
		html += '</ul></div>';
		html += '</div><a class="btn-cview-sidebar btn" data-toggle="modal" href="#modal-add-data"><i class="icon-add-res"></i>添加课程资料</a></div>';
		return html;
	},
	GetPostList : function() {
		$.ajax(
				{
					  'type' : 'GET',
					  'url'  : libSchoolBaseUrl + 'teach/coursepost/loadpostlist&item=' + libedu_cur_item + '&course=' + libedu_cur_course ,
					  'beforeSend' : function(){
						 $('#cview-resource .cview-sidebar-hd').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
					  },	
					  'success' : function( data ){
						  var json = eval( '(' + data + ')' );
						  $('#cview-resource').html( CVIEW._get_post_resource_list_code( json.course_teacher , json.course_student , json.course_third_teacher ) );
						  //取消喜欢操作和资源的联系
						  $('.mark-like').attr('data-rid','');
						  $('.mark-like').removeClass( 'cview-like' );
						  $('.mark-like').children('em').text('0');
					  }
				});
	},
	_append_qa_list : function( json ) {
		var qstr = '<div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>提交问题</span>';
		qstr += '<button id="btn-add-question" class="btn" href="#"><i class="icon-plus"></i>提交问题</button>';
		qstr += '</div><div class="cview-sidebar-list"><ul class="question">';
		$.each( json , function( i , val ){
			var li_str = '<li data-qid="' + val['id'] + '">';
			qstr += li_str + '<span class="cview-item-name"><i class="icon-sidebar-item"></i>';
			qstr += val['title'] + '<span class="arrow-right"></span></span>';
			qstr += '<p class="clearfix"><span class="answer">答案(<em>';
			qstr += val['numberofznswers'] + '</em>)</span><span class="addask">追问(<em>';
			qstr += val['numberofzws'] + '</em>)</span><span class="cview-sidebar-time">';
			qstr += val['last_operation_time'] + '</span></p></li>';
			
		} );
		qstr += '</div></ul>';
		return qstr;
	},
	_append_question_detail : function( json ) {
		var code = '<div class="cview-sidebar-hd"><span><i class="icon-arrowdown"></i>问题详情</span>';
		code += '<button class="btn go-back" href="#">返回</button></div>';
		code += '<div class="cview-uask-bd">';
		code += '<div class="cview-uask-question">';
		code += '<h5>' + json.question['title'] + '</h5>';
		code += '<p>' + json.question['details'] + '</p>';
		code += '<div class="btn-group" data-toggle="buttons-radio">';
		code += '<button class="btn-cview-answer btn btn-primary">回答(<em>' + json.question['numberofanswers'] + '</em>)</button>';
		code += '<button class="btn-cview-addask btn btn-primary">追问(<em>' + json.question['numberofzw'] + '</em>)</button>';
		code += '</div></div>';	
		code += ' <div class="comment-box">';
		code += '<form class="input-form"><textarea class="input-xlarge" id="answer-details" rows="3" placeholder="我来回答"></textarea>';
		code += '<button id="add-answer-btn" type="submit" class="btn-large btn">回答</button></form>';
		code += '<ul class="cview-uask-answer">';
		$.each( json.answers , function( i , val ) {
			code += '<li><div class="cview-uanswer-hd"><span class="cview-uanswer-user">' + val['real_name'] + '</span>';
			code += '<span class="cview-sidebar-time">' + val['create_time'] + '</span></div>';
			code += '<p>' + val['details'] + '</p>';
			code += '<span class="btn-addask btn btn-mini">追问(<em>' + val['numberofzw'] + '</em>)</span> </li>';
		} );
		
		code += '</ul>';
		code += '</div>';
		code += '</div>';
		return code;
	},
	bind_load_ans_btn : function( qid ) {
		
		 $('#cview-question .cview-uask-question .btn-cview-answer').on( 'click' , function() {
	    		CVIEW.GetAnswersOfQuestion( qid );
		});
	},
	bind_load_zws_btn : function( qid ) {
	    $('#cview-question .cview-uask-question .btn-cview-addask').on( 'click' , function() {
	    	$.ajax({
	    		'url' : libSchoolBaseUrl + 'teach/question/ajaxgetquestionandsubelementsjsonbyqid&qid=' + qid, 
	    		'beforeSend' : function(){
						 $('#cview-question .cview-uask-answer').html('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
			 	},
			 	'success' : function( data ){
			 		var json = eval( '(' + data + ')' );
			 		var hcode = '';
			 		$.each( json.zws , function(i,val){
			 			hcode += '<li> <div class="cview-uanswer-hd"><span class="cview-uanswer-user">';
			 			hcode += val['real_name'];
						hcode += '</span>';
					    hcode += '<span class="cview-sidebar-time">' + val['create_time'] + '</span></div>';
						hcode += '<p>' + val['details'] + '</p>';
						hcode += '<span class="btn-answer btn btn-mini">回答(<em>' + val['numberofanswers'] + '</em>)</span> </li>';
			 		});
			 		$('#cview-question .cview-uask-answer').html( hcode ); 
			 	},
	    	});
	    	//ajax end
		});
	},
	GetAnswersOfQuestion : function( qid )
	{
		$.ajax(
				{
					'url' :  libSchoolBaseUrl + 'teach/question/ajaxgetanswersjsonbyqid&qid=' + qid ,
					'beforeSend' : function(){
						 $('.comment-box ul.cview-uask-answer').html('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
			 		},
					'success' : function(data) {
						var json = eval( '(' + data + ')' );
						var code = '';
						$.each( json , function(i,val){
							code += '<li><div class="cview-uanswer-hd"><span class="cview-uanswer-user">' 
										+ val['owner'] + '</span>';
							code += '<span class="cview-sidebar-time">' + val['atime'] + '</span></div>';
							code += '<p>' + val['details'] + '</p>';
							code += '<span class="btn-addask btn btn-mini">追问(<em>' + '0' + '</em>)</span> </li>';
						});
						$('.comment-box ul.cview-uask-answer').html( code );
						$('.cview-uask-question .btn-group .btn-cview-answer em').text( json.length );
						
					}
				});
	},
	GetQuestionDetail : function( qid )
	{
		$.ajax({
			'url'  : libSchoolBaseUrl + 'teach/question/getsidebarquestionform&qid=' + qid,
			'beforeSend' : function(){
				 $('#cview-question').html('');
				 $('#cview-question .cview-sidebar-hd').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
			 },
			'success' : function(data) {
				 $('#cview-question').html( data );
				 $('#add-answer-btn').live( 'click' , function(){
					 var data = {'Answer': { 'type' : 2 , 'details' : $('#new-answer-box-details').val() } };
					 $.ajax({
						 'url' : libSchoolBaseUrl + 'teach/question/answer&qid=' + qid ,
						 'type' : 'post',
						 'data' : $.param( data ),
						 'success' : function( data ){
							 if ( data == "success" )
							 {
								 alert('回答成功');
								 //$('#new-answer-box-details').val('');
								 $('#new-answer-box-details').setCode('');
								 CVIEW.GetAnswersOfQuestion( qid );								 
							 }
							 else
							 {
								 alert( '回答失败' );
							 }							 
						 }
						 
					 });
					 return false;
				 } );
				 //绑定一下追问按钮
				 CVIEW.bind_load_ans_btn( qid );
				 CVIEW.bind_load_zws_btn( qid );
				 //绑定追问按钮事件
			},
		});
	},
	GetQuestion : function() {
		$.ajax(
				{
					'type' : 'GET',
					'url'  : libSchoolBaseUrl + 'teach/question/ajaxgetlatestqeustionjsonbyitemid&iid=' + libedu_cur_item,
					 'beforeSend' : function(){
						 $('#cview-question .cview-sidebar-hd').after('<div class="loading-box"><img src="images/loading.gif" alt="" /></div>');
					  },
					  'success' : function( data ) {
						  var json = eval( '(' + data + ')' );						
						  $('#cview-question').html( CVIEW._append_qa_list( json ) );
						  $('#cview-question .question li').each( function( i , val ){
							  $(val).on( 'click' , function(){ 
								  CVIEW.GetQuestionDetail( $(this).attr('data-qid') ); 
							  } )
						  });
					  }
				}
		);
	},
	_play_pdf : function( json ) {
		if ( json.convert_complete == 0 )
		{	
			$('.view-main').html( json.post_content );
		}	
		else
		{
			$('.view-main').attr('id' , 'play-post-con');
			$('.view-main').FlexPaperViewer(
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
	GetPostContentToPlay: function( pid ) {
		$.ajax({
			'url' : libSchoolBaseUrl + 'teach/coursepost/loadpost&pid=' + pid,
			'success' : function( data ) {
				var json = eval( '(' + data + ')' );
				if ( json.post_type == 4 )
				{
					//play pdf
					CVIEW._play_pdf( json );					
				}
				else {
						$('.view-main').html( json.post_content );
				}

			},
		});

	}
}
// 加载课程资料
$('#post_view_res .cview-res ul li').live('click' , function(e){
	var post_id   = $(this).attr('data-pid');
	var post_type = $(this).attr('data-type');
	$.ajax(
			{
				'url' : libSchoolBaseUrl + 'teach/coursepost/loadpost&pid=' + post_id,
				'success' : function(data) {
					var json = eval( '(' + data + ')' );
					$('#cview-resource').html( CVIEW._get_single_post_code( json.post_type , json.post_title , json.post_desc , json.author_name , 
							                              json.like_post_users  ) );
					$('#cview-resource .btn-play').on( 'click' , function(){
						CVIEW.GetPostContentToPlay( post_id );
					});
					if ( json.is_my_favorite > 0 )
					{
						$('.mark-like').addClass('cview-like');
					}
					else 
					{
						$('.mark-like').removeClass('cview-like');
					}
					$('.mark-like').attr('data-rid' , post_id );
					$('.mark-like').attr('data-type' , json.post_type );
					$('.mark-like').children('em').text( json.like_post_users.length );

				}
			}
		);
	
} );
//笔记Tab
$('.cview-sidebar-nav .note').live('click',function(){ CVIEW.GetNote(); });

//作业Tab
$('.cview-sidebar-nav .task').live('click' , function(){ CVIEW.GetTaskList();} );
//课程资料Tab
$('.cview-sidebar-nav .resource').live( 'click' , function(){ CVIEW.GetPostList(); } );
//问答Tab 
$('.cview-sidebar-nav .question').live( 'click'  , function(){ CVIEW.GetQuestion(); } );

//查看作业
$('#cview-task .task li').live('click' , function(){ CVIEW.ViewTask( $(this).attr('data-tid') ); } );
//添加笔记
$('#btn-addnote').live('click',function(){ CVIEW.AddNote($(this)); });
//添加提问
$('#btn-add-question').live( 'click' , function(){ CVIEW.AddQuestion( $(this) ); } );
//查看笔记
$('#cview-note .note li').live('click',function(){ CVIEW.ViewNote($(this)); });
//删除笔记
$('#btn-delnote').live('click',function(){ CVIEW.DelNote( $(this) ); });
//编辑笔记
$('#btn-editnote').live('click',function(){ CVIEW.EditNote( $(this) ); });
$('#cview-note .go-back').live('click' , function(){ CVIEW.GetNote(); } );
$('#cview-resource .go-back').live( 'click' , function(){ CVIEW.GetPostList(); } );
$('#cview-question .go-back').live( 'click' , function() { CVIEW.GetQuestion(); } );
//绑定点击完成本节的功能。
$('.mark-complete').live('click' , function(){
	complete_item();	
} );
$('.mark-like').live('click' , function(){
	var rid = $(this).attr('data-rid');
	var type = $(this).attr('data-type');
	var dolike = true;
	if ( $(this).hasClass('cview-like') ) {
		dolike = false;
	}
	if ( rid )
	{
		var url = '';
		if ( dolike ) {
			url = libSchoolBaseUrl + 'user/libuser/dofavor';
		}else {
			url = libSchoolBaseUrl + 'user/libuser/unfavor';
		}
		$.ajax( {
			'url' : url ,
			'type' : 'post',
			'data' : { 'rsc_id' : rid , 'type' : type },
			'success' : function(data) {
				var json = eval('(' + data + ')');
				if ( dolike ) {
					$('.mark-like').addClass('cview-like');
				}else {
					$('.mark-like').removeClass('cview-like');
				}
				$('.mark-like').children('em').text( json.like_cnt );
				if ( dolike )  {
						alert('喜欢成功');
				}else {
					alert('取消喜欢');
				}
			},
		} );
	}
});

//----------------------------------------
});
