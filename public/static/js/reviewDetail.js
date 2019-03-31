$(function(){
	var $start_list = $("#clk_stars").find("i"),tempcount = 5;
	$start_list.each(function(ind, ele) {
		if(ind <= tempcount){
			$(ele).addClass("focus");
		}
        $(ele).mouseenter(function(){
			$start_list.each(function(index, element) {
				if(index<=ind){
                	$(element).addClass("focus");
				}else{
					$(element).removeClass("focus");
				}
            });
		}).mouseleave(function(){
			$start_list.each(function(index, element) {
				if(index > tempcount){
					if($(element).hasClass("focus")){
                		$(element).removeClass("focus");
					}
				}else{
					$(element).addClass("focus");
				}
            });
		}).click(function(){
			tempcount = ind;
		});
    });
	$("#txt_input").keyup(function(){
		var $txt_count = $("#txt_count"),$this = $(this),length = $this.val().length;
		if(length <= 300){
			$txt_count.text(length);
		}else{
			$this.val($this.val().substr(0,300));
		}
	});

	$('.submit-button').on('click',function(){
		var email = $('input[name="email"]').val();
		var mobile_phone = $('input[name="mobile_phone"]').val();
		var nick_name = $('input[name="nick_name"]').val();
		$.post('user.php?act=ajax_edit_profile',{email:email,mobile_phone:mobile_phone,nick_name:nick_name},function(data){
			if(data.error){
				alert(data.message);
			}else{
				alert('修改成功');
			}
		},'json');
	});

	$('.change-password-submit').on('click',function(){
		var old_password = $('input[name="old_password"]').val();
		var new_password = $('input[name="new_password"]').val();
		var confirm_password = $('input[name="confirm_password"]').val();
		if(confirm_password != new_password){
			alert('两次输入的密码不一样');
			return false;
		}
		if(new_password.length < 6){
			alert('密码长度必须大于6位');
			return false;
		}
		$.post('user.php?act=act_edit_password',{old_password:old_password,new_password:new_password},function(data){
			if(data.error){
				alert(data.message);
			}else{
				if(confirm('修改成功,需要重新登录')){
					window.location.href='/user.php?act=login';
				}else{
					window.location.href='/user.php?act=login';
				}

			}
		},'json');
	});
	
	//晒单提交
	$('.submit-comment').on('click',function(){
		var comment_rank = $('#clk_stars .focus').length;
		var content = $('#txt_input').val();
		var hidden_name = $('#hidden_name:checked').val();
		var images_name = [];
		var goods_id = $('#goods_id').val();
		var order_id = $('#order_id').val();
		$('input[name="images_name[]"]').each(function(){
			images_name.push($(this).val());
		});
		var post_data = {
				comment_rank:comment_rank,
				content:content,
				hidden_name:hidden_name,
				images_name:images_name,
				goods_id:goods_id,
				order_id:order_id
		};
		
		
		$.post('orderbbs.php?act=submit',post_data,function(data){
			if(data.error != 0){
				alert(data.message);
			}else{
				alert(data.message);
			}
			
		},'json');
	});
	$("#add_pic").on("click",function(){
		var $this = $(this);
		if($('input[name="images_name[]"]').length < 5){
			$('#J_img_input').off('change');
			$('#J_img_input').on('change',function(e){
				ajaxFileUpload(e);
			});
			$('#J_img_input').click();
		}else{
			alert('最多可上传5张图片');
		}
		
		
	});
	
	$("body").on("mouseenter mouseleave",".add-pic em.rel",function(event){
		var $this = $(this);
		if(event.type==="mouseenter")
		$this.find("i").slideDown(300);
		else
		$this.find("i").slideUp(300);
	});
	$("body").on("click",".add-pic em.rel i",function(){
		if(confirm("确定删除？")){
			$(this).parent("em").remove();
		}
	});
});

function ajaxFileUpload(_ele)
{
	/*
	$("#loading")
	.ajaxStart(function(){
		$(this).show();
	})
	.ajaxComplete(function(){
		$(this).hide();
	});
*/
	$.ajaxFileUpload
	(
		{
			url:'orderbbs.php?act=upload_img',
			secureuri:false,
			fileElementId:'J_img_input',
			dataType: 'json',
			data:{act:'upload_img'},
			success: function (data, status)
			{
				if(data.error == 0){
					$("#add_pic").before('<em class="dib fl m-r-10 rel"><img src="'+data.img_url+'"><input name="images_name[]" value="'+data.img_url+'" type="hidden"/><i class="dn">删除</i></em>');
					$('#pic_count').html($('input[name="images_name[]"]').length);
				}else{
					alert(data.message);
				}
				
			},
			error: function (data, status, e)
			{
				alert(e);
			}
		}
	);

}