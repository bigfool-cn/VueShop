$(function(){
	var $orderOption = $("#order_option");
	$orderOption.find(".open-pop").each(function(ind, ele) {
		var $ele = $(ele);
        $ele.children("a").on("click",function(){
			var $icons = $(this).children("i"),$nextChildren = $(this).next(".child-pop");
			if($icons.hasClass("icon-sub-big")){
				$icons.removeClass("icon-sub-big").addClass("icon-add-big");
				$nextChildren.slideUp();
			}else{
				$icons.removeClass("icon-add-big").addClass("icon-sub-big");
				$nextChildren.slideDown();
			}
		});
		$ele.find(".heads a").on("click",function(){
			var $this = $(this), className = $this.data("param"),$heads = $this.parent(".heads"),$conts = $heads.next(".conts");
			$heads.children("a").removeClass("current").eq($this.index()).addClass("current");
			$conts.children().addClass("dn").eq($this.index()).removeClass("dn");
			if($this.index() == 0){
				$('#ECS_NEEDINV').val('0');
			}else{
				$('#ECS_NEEDINV').val('1');
			}
		});
    });
	
	$("body").on("click",".selectedbox a.text",function(){
		$this = $(this),$icon = $this.find("i"),$others = $this.next(".others");
		if($icon.hasClass("icon-arrowD")){
			$icon.removeClass("icon-arrowD").addClass("icon-arrowU");
			$others.slideDown(200);
		}else{
			$icon.removeClass("icon-arrowU").addClass("icon-arrowD");
			$others.slideUp(200);
		}
	});
	$("body").on("click",".selectedbox .others a.option",function(){
		var $this = $(this),$others = $this.parent(".others"),$icon = $this.parents(".selectedbox").find("i"),text = $this.html(),$selected = $this.parents(".selectedbox").find("span.selected");
		$selected.html(text);
		$('#inv_content').val(text);
		$others.hide();
		$icon.removeClass("icon-arrowU").addClass("icon-arrowD");
	});
	$(".checkbox").each(function(ind, ele) {
		var $list = $(ele).children("a");
		$list.on("click",function(){				
			$list.removeClass("focus");
			$(this).addClass("focus");
		});
    });
	$("body").on("keyup","#coupon_code",function(){
		$this = $(this);
		if($.trim($this.val())){
			$this.next("a").fadeIn(300);
		}else{
			$this.next("a").fadeOut(300);
		}
	});
	$("body").on("click","#valid_code",function(){
		$this = $(this),code = $('#coupon_code').val(),$msg = $this.parent(".input").next(".error");
		
		var url ='flow.php?step=validate_bonus&bonus_sn='+code;
		$.get(url,function(data){
			if(data.error.length ==0){
				update_total(data.total);
			}else{
				$msg.removeClass("f-996c33").addClass("f-d93732").html(data.error);
			
			}
		},'json');
		//这里后台验证code
		//以下在ajax回调使用
		
		//$msg.removeClass("f-d93732").addClass("f-996c33").html('可以使用');
	});
	
	
	/*匿名用户购物流*/
	var $sender_input = $("input[name=sender]");
	if($sender_input.length > 0){
		/*----------------以下用于遮罩---------------------*/
		var $receive = $(".receive"),//收礼人地址
			$cards = $(".cards"),//包装贺卡
			$logistics = $(".logistics"),//配送选项
			$payway = $(".pay-way"),//支付方式
			$goodslist = $(".goods-list"),//商品清单
			$paydetail = $(".pay-detail"),//支付详细
			$orderbtn = $(".order-btn");//提交订单button
			maskingAll();
		/*------------------------------------------------*/
		var $valid_failed = $("#valid_failed"),//多次登陆失败box
		$valid_getcode = $("#valid_getcode"),//验证临时密码box
		$sender_code = $("#sender_code"),//发送临时密码button		
		$valid_login = $("#valid_login"),//临时登陆box
		$sender_password = $("input[name=sender_password]"),//临时密码输入框
		$loginbtn = $("a.loginbtn"),//临时登陆按钮
		$times = $("#times");//倒计时span
		$sender_input.on("change",function(){
			var phone = $(this).val(),$tips = $(this).parent().find(".tips");
			if(validPhone(phone)){
				$.ajax({url:"user.php?act=check_mobilePhone",type:"get",dataType:"json",data:{"phone":phone}}).done(function(response){
					var $valid_getcode = $("#valid_getcode");
					if(response.success == true){
						if(response.data == '1'){
							$tips.html("手机号已存在").show();
							senderPhoneIsExist()//老手机号
						}else{
							$tips.html('<i class="icon-bgr icon-order-login-sucess"></i>').show();
							senderPhoneIsNew();//新手机号
						}
					}else{
						alert(response.error);
					}
				}).fail(function(){
					alert("网络繁忙");
				});
			}else{
				$tips.html("请输入正确手机号").show();
				$(this).val("");
				maskingAll();
			}
		});
		function senderPhoneIsNew(){
			$valid_getcode.hide();
			$valid_failed.hide();
			$valid_login.hide();
			$receive.find(".mask").fadeOut(300);
		}
		function senderPhoneIsExist(){
			$valid_getcode.show();
			$valid_failed.hide();
			$valid_login.hide();
			maskingAll();
		}
		function maskingAll(){			
			$receive.find(".mask").fadeIn(300);
			$cards.find(".mask").fadeIn(300);
			$logistics.find(".mask").fadeIn(300);
			$payway.find(".mask").fadeIn(300);
			$goodslist.find(".mask").fadeIn(300);
			$paydetail.find(".mask").fadeIn(300);
			$orderbtn.find(".mask").fadeIn(300);
		}
		function unMaskingAll(){
			$receive.find(".mask").fadeOut(300);
			$cards.find(".mask").fadeOut(300);
			$logistics.find(".mask").fadeOut(300);
			$payway.find(".mask").fadeOut(300);
			$goodslist.find(".mask").fadeOut(300);
			$paydetail.find(".mask").fadeOut(300);
			$orderbtn.find(".mask").fadeOut(300);
		}
		function getSenderCode(){
			$.ajax({url:"user.php?act=send_code",type:"post",dataType:"json",data:{"phone":$sender_input.val()}}).done(function(response){

				var $valid_failed = $("#valid_failed");//多次登陆失败box
				if(response.send_flag == 1){
					alert('手机未注册');
				}else if (response.send_flag == 3){
					//超过次数
					$valid_failed.show();
				}else if (response.send_flag == 4){
					alert('还有'+response.time+'秒');
				}else if (response.send_flag == 2){
					//获取后台返回验证码
					$valid_getcode.hide();
					$valid_login.show();
					//开始倒计时
					$times.countDown(90,function(flag,lefttimes){//倒计时时间到了后执行
						$times.html(lefttimes);
						if(!flag){
							$times.html('');
							$loginbtn.addClass("again").find(".txt").html('再次发送');
						}
					});
				}else{
					alert('发送失败');
				}


			}).fail(function(){
				alert("网络繁忙");
				$valid_getcode.show();
				$valid_login.hide();
			});
		}
		$sender_code.on("click",function(){
			getSenderCode();			
		});
		$loginbtn.on("click",function(){
			var $this = $(this);
			if($this.hasClass("again")){
				$loginbtn.removeClass("again").find(".txt").html("立即登录");
				$times.html('90');
				getSenderCode();
			}else{
				var code = $('input[name="sender_password"]').val();
				$.ajax({url:"user.php?act=sms_login",type:"post",dataType:"json",data:{"code":code}}).done(function(response){
					//登陆成功后是否session里面已有登陆的值？如果有的话，是否可以刷新当前订单页？使送礼人信息隐藏
					//console.log(response);
					if(response.error == 0){
						location.reload();
					}else{
						alert('验证码错误');
					}
					//location.reload();
				}).fail(function(){
					alert("网络繁忙");
				});
			}
		});
		$('#other-phone').on('click',function(){
			$("input[name=sender]").val('');
			$("#valid_login").hide();
			$("#sender_code").hide();
			$("#valid_failed").hide();
			maskingAll();
		});
		$('.receive :input').on('change',function(){
			save_gust_address();
		});
		//收货人地址
		function save_gust_address(){
			var $md_form = $(".receive"),flag = true;
			var address_id = 0;
			var	consignee = $md_form.find("input[name=receive_name]").val();
			var	tel = $md_form.find("input[name=receive_phone]").val();
			var	province_name = $md_form.find("select[name=province] option:selected").text();
			var	province = $md_form.find("select[name=province]").val();
			var	city_name = $md_form.find("select[name=city] option:selected").text();
			var	city = $md_form.find("select[name=city]").val();
			var	district_name = $md_form.find("select[name=district] option:selected").text();
			var	district = $md_form.find("select[name=district]").val();
			var	address = $md_form.find("input[name=receive_address]").val();
			var	is_default = 0;
			if(flag&&!trim(consignee)){
				flag = false;
				$md_form.find("input[name=receive_name]").next(".error-tips").html("请填写收货人姓名");
			}else{
				$md_form.find("input[name=receive_name]").next(".error-tips").html("&nbsp;");
			}
			var $addr_tips = $md_form.find("select[name=district]").next(".error-tips");
			if(flag&&province == 0){
				flag = false;
				$addr_tips.html("请选择省或直辖市");
			}
			if(flag&&city == 0){
				flag = false;
				$addr_tips.html("请选择市");
			}
			if(flag&&district == 0){
				flag = false;
				$addr_tips.html("请选择区");
			}
			if(flag&&province != 0&&city!=0&&district!=0){
				$addr_tips.html("&nbsp;");
			}
			if(flag&&!validPhone(tel)){
				flag = false;
				$md_form.find("input[name=receive_phone]").next(".error-tips").html("请输入正确收礼人手机");
			}else{
				$md_form.find("input[name=receive_phone]").next(".error-tips").html("&nbsp;");
			}
			if(flag&&!trim(address)){
				flag = false;
				$md_form.find("input[name=receive_address]").next(".error-tips").html("请输入详细地址");
			}else{
				$md_form.find("input[name=receive_address]").next(".error-tips").html("&nbsp;");
			}
			if(flag){
				var post_data = {
					address_id:0,
					country:1,
					province:province,
					city:city,
					district:district,
					address:address,
					consignee:consignee,
					email:'',
					tel:tel,
					mobile:tel,
					best_time:'',
					sign_building:'',
					zipcode:'',
					is_default:is_default ? '1' :'0'
				};
	
				$.post('flow.php?step=save_consignee',post_data,function(data){
					if(data.error == 0){
						update_shipping(data.shipping_list);
						update_total(data.total);
						unMaskingAll();
					}else{
						alert(data.message);
						maskingAll();
						$receive.find(".mask").fadeOut(300);					
					}
				},'json');
			}else{
				maskingAll();
				$receive.find(".mask").hide();	
			}
		}
	}
	
	/*收货地址配置*/

	$("body").on("click","#address_list a",function(){
		
		var $this = $(this),$addressList = $this.parent().children("a");
		if($this.hasClass('addnew')){
			var address_id = $this.data('address_id');
			$.get('user.php?act=get_address_info',{address_id:address_id},function(data){
				if(data.error == 0){
					editAddressDocument(data.data,'addnew');
				}else{
					alert('无法得到地址详情');
				}
			},'json');
		}else{
			var address_id = $this.data('address_id');
			post_data = {
					address_id : address_id,
					is_select : 1
			};
			$.post('flow.php?step=save_consignee',post_data,function(data){
				if(data.error == 0){
					$ele = $('#address_list a[data-address_id="'+data.content.address_id+'"]');
					if($ele.length){
						var html = '<p class="clear"><span class="fl">'+data.content.consignee+'</span><span class="fr f12">'+data.content.tel+'</span></p>';
						html += '<p class="m-t-10 f12">'+data.content.address_2+'<br>'+data.content.address+'</p>';
						html += '<p class="operate f12 f-b28850 p-l-10 dn"><em  class="addr_edit">修改</em><em  class="addr_delete">删除</em></p>';
						$ele.html(html);
						$('#address_list a').removeClass('focus');
						$ele.addClass('focus');
					}else{
						var html = '<a href="javascript:void(0)" class="fl focus" data-address_id="'+data.content.address_id+'"><p class="clear"><span class="fl">'+data.content.consignee+'</span><span class="fr f12">'+data.content.tel+'</span></p>';
						html += '<p class="m-t-10 f12">'+data.content.address_2+'<br>'+data.content.address+'</p>';
						html += '<p class="operate f12 f-b28850 p-l-10 dn"><em  class="addr_edit">修改</em><em  class="addr_delete">删除</em></p></a>';
						$('#address_list a').removeClass('focus');
						$('#address_list').prepend(html);
					}
					if(dialog_adress != undefined)
						dialog_adress.close();
					update_shipping(data.shipping_list);
					update_total(data.total);
					//window.location.reload();
				}else{
					alert(data.message);
				}
			},'json');
		}
	}).on("mouseenter","#address_list a",function(){
		$(this).find(".operate").stop().fadeIn(300);
		
	}).on("mouseleave","#address_list a",function(){
		$(this).find(".operate").stop().fadeOut(300);
	});
	
	//更新快递选项
	function update_shipping(shipping_list){
		var html = '';
		for(var i=0;i<shipping_list.length;i++){
			html += '<a href="javascript:void(0)" data-js-bind="select_shipping" data-shipping_id="'+shipping_list[i].shipping_id+'" data-support_cod="'+shipping_list[i].support_cod+'" class="'+( i != 0 ? 'm-l-30':'')+' fl '+(shipping_list[i].focus ? 'focus':'')+'">'+shipping_list[i].shipping_name+'&nbsp;'+(shipping_list[i].shipping_fee ? '<span class="f-d93732">'+shipping_list[i].format_shipping_fee+'</span>':'免运费')+'</a>';
		}
		$('#shipping_list').html(html);
	}
	
	$("body").on("click",".addr_edit",function(e){
		e.stopPropagation();
		var $this = $(this).parent().parent(),$addressList = $this.parent().children("a");
		
		var address_id = $this.data('address_id');
		$.get('user.php?act=get_address_info',{address_id:address_id},function(data){
			if(data.error == 0){
				editAddressDocument(data.data,'edit');
			}else{
				alert('无法得到地址详情');
			}
		},'json');
		
	});
	$("body").on("click",".addr_delete",function(e){
		e.stopPropagation();
		var $this = $(this).parent().parent(),$addressList = $this.parent().children("a");
		
		var address_id = $this.data('address_id');
		$.post('flow.php?step=delete_consignee',{address_id:address_id},function(data){
			if(data.error == 0){
				$this.remove();
			}else{
				alert('删除失败');
			}
		},'json');
		
	});
	
	$("body").on("click","#save_info",function(){
		var $md_form = $(".md-edit-addr");
		var address_id = $md_form.data('address_id');
		var	consignee = $md_form.find("input[name=consignee]").val();
		var	tel = $md_form.find("input[name=tel]").val();
		var	province_name = $md_form.find("select[name=province] option:selected").text();
		var	province = $md_form.find("select[name=province]").val();
		var	city_name = $md_form.find("select[name=city] option:selected").text();
		var	city = $md_form.find("select[name=city]").val();
		var	district_name = $md_form.find("select[name=district] option:selected").text();
		var	district = $md_form.find("select[name=district]").val();
		var	address = $md_form.find("textarea[name=address]").val();
		var	is_default = $md_form.find("input[name=is_default]").is(':checked');

		var post_data = {
			address_id:address_id,
			country:1,
			province:province,
			city:city,
			district:district,
			address:address,
			consignee:consignee,
			email:'',
			tel:tel,
			mobile:tel,
			best_time:'',
			sign_building:'',
			zipcode:'',
			is_default:is_default ? '1' :'0'
		};

		$.post('flow.php?step=save_consignee',post_data,function(data){
			if(data.error == 0){
				$ele = $('#address_list a[data-address_id="'+data.content.address_id+'"]');
				if($ele.length){
					var html = '<p class="clear"><span class="fl">'+data.content.consignee+'</span><span class="fr f12">'+data.content.tel+'</span></p>';
					html += '<p class="m-t-10 f12">'+data.content.address_2+'<br>'+data.content.address+'</p>';
					html += '<p class="operate f12 f-b28850 p-l-10 dn"><em  class="addr_edit">修改</em><em  class="addr_delete">删除</em></p>';
					$ele.html(html);
					$('#address_list a').removeClass('focus');
					$ele.addClass('focus');
				}else{
					var html = '<a href="javascript:void(0)" class="fl focus rel" data-address_id="'+data.content.address_id+'"><p class="clear"><span class="fl">'+data.content.consignee+'</span><span class="fr f12">'+data.content.tel+'</span></p>';
					html += '<p class="m-t-10 f12">'+data.content.address_2+'<br>'+data.content.address+'</p>';
					html += '<p class="operate f12 f-b28850 p-l-10 dn"><em  class="addr_edit">修改</em><em  class="addr_delete">删除</em></p></a>';
					$('#address_list a').removeClass('focus');
					$('#address_list').prepend(html);
				}
				if(dialog_adress != undefined)
					dialog_adress.close();
				update_shipping(data.shipping_list);
				update_total(data.total);
			}else{
				alert(data.message);
			}
		},'json');
		
	});
	
	$("body").on('click','#refresh',function(){
		if($card_message_pool.length){
			$card_message_focus_id = $card_message_focus_id == $card_message_pool.length - 1 ? 0 :  $card_message_focus_id +1;
			$('#card_content').html($card_message_pool[$card_message_focus_id].content);
			$('#card_content').val($card_message_pool[$card_message_focus_id].content);
		}
	});
	$("body").on('click','.change-card-cat',function(){
		$('.change-card-cat').removeClass('focus');
		$(this).addClass('focus');
		$cat_id = $(this).data('cat_id');
		var url = '/flow.php?step=card_message';
		$.post(url,{is_ajax:1,card_id:$cat_id},function(data){
			$card_message_pool = data.card_message;
			$card_message_focus_id = 0;
			$cat_html = $card_message_pool[$card_message_focus_id].content;
			//$('#card_content').html($cat_html);
			$('#card_content').val($cat_html);
		},'json');
	});
	//填写贺卡、修改贺卡
	$("body").on("click","#edit_card,#alter_card",function(){		
		init_card_dialog();
	});
	//保存贺卡
	$("body").on("click","#save_card_btn",function(){
		save_card();
	});
	//删除贺卡	
	$("body").on("click","#delete_card",function(){
		delete_card();
	});
	
	$("body").on("click","#arrowRight",function(){		
		if(current+1 >= arr_bress.length){
			 current = 0;	
		}else{	
			current ++;
		}
		$bress_link.animate({"left":arr_bress[current]+"px"},300);
	});
	//选快递
	$('body').on('click','a[data-js-bind="select_shipping"]',function(){
		var shipping_id = $(this).data('shipping_id');
		$('#shipping').val(shipping_id);
		$('#shipping_list .focus').removeClass('focus');
		$(this).addClass('focus');
		if($(this).data('support_cod') == '0'){
			$('.payment-cod').hide();
			if($('.payment-cod').hasClass('focus')){
				$('#payment').val('');
				$('.payment-cod').removeClass('focus');
			}
		}else{
			$('.payment-cod').show();
		}
		
		$.get('flow.php?step=select_shipping&shipping='+shipping_id,function(data){
			if(data.error.length ==0){
				$('.payment-cod').find('span').html('￥'+data.cod_fee);
				update_total(data.total);
			}else{
				alert(data.error);
			}
		},'json');
		
	});
	$('a[data-js-bind="select_shipping"].focus').click();
	
	//选快递
	$('body').on('click','a[data-js-bind="select_payment"]',function(){
		var pay_id = $(this).data('pay_id');
		$('#payment').val(pay_id);
		
		$.get('flow.php?step=select_payment&payment='+pay_id,function(data){
			if(data.error.length ==0){
				update_total(data.total);
			}else{
				alert(data.error);
			}
		},'json');
		
	});
	$('a[data-js-bind="select_payment"].focus').click();
	
	
	$('.submit_order').on('click',function(){
		$('#theForm').submit();
	});
	
	$('.use-integral').on('click',function(){
		var can_use_integral = $(this).data('can_use_integral');
		var url = '/flow.php?step=change_integral&points='+can_use_integral;
		$.get(url,function(data){
			if(data.error.length ==0){
				update_total(data.total);
				$('#integral').val(can_use_integral);
			}else{
				alert(data.error);
			}
		},'json');
	});
	
	$('.use-bonus').on('click',function(){
		var bonus_id = $(this).data('bonus_id');
		var self = this;
		var url ='flow.php?step=change_bonus&bonus='+bonus_id;
		$.get(url,function(data){
			if(data.error.length ==0){
				update_total(data.total);
				$('.use-bonus .choose').addClass('dn');
				$(self).find('.choose').removeClass('dn');
				$('.use-bonus').removeClass('focus');
				$(self).addClass('focus');
				$('#bonus').val(bonus_id);
			}else{
				alert(data.error);
			}
		},'json');
	});
	
/*贺卡配置*/	
var $bress,$bress_link,arr_bress = [],current = 0;
var $card_message_pool = [],$card_message_focus_id = 0,$cat_id=0,$cat_html='',gift_to_val='',gift_from_val='';
function init_card_dialog(){
	var url = '/flow.php?step=card_message';
	$.post(url,{is_ajax:1,card_id:$cat_id},function(data){
		
		$card_message_pool = data.card_message;
		var card_cat_html = '';
		for(var i = 0;i<data.card_cat.length; i++){
			if(data.card_cat[i].cat_id == data.cat_id){
				card_cat_html += '<a href="javascript:void(0)" class="focus f-cdae7d change-card-cat" data-cat_id="'+data.card_cat[i].cat_id+'">'+data.card_cat[i].cat_name+'</a>';
			}else{
				card_cat_html += '<a href="javascript:void(0)" class="f-cdae7d change-card-cat" data-cat_id="'+data.card_cat[i].cat_id+'">'+data.card_cat[i].cat_name+'</a>';	
			}
		}
		
		var has_pack = $('#has_pack').val();
		var html = '<div class="md-form edit-giftcard">'+
		'<form action="javascript:void(0)" >'+
		'<div class="line p-y-15 clear"><span class="fl half fb f18">填写贺卡信息</span><span class="fr half tr"><label class="checkbox"><input id="empty_card" type="checkbox" value="5">空白贺卡</label></span></div>'+
		'<div class="line clear">'+
		'    <span class="gift-title fl">致</span>'+
		'    <input type="text" id="gift_to" name="gift_to" placeholder="收礼人姓名" value="'+gift_to_val+'" autocomplete="off" class="gift-to-name fl">'+
		'</div>'+
		'<div class="line clear rel">'+
		'    <span id="refresh" class="f-808080">换一换<i class="icon-bgr icon-refresh m-l-5"></i></span>'+
		'    <span class="gift-title fl">正文</span>'+
		'    <textarea id="card_content" class="greetings lh1_5 fl" rows="5" placeholder="您可以试试祝福语模板">'+$cat_html+'</textarea>'+
		'</div>'+
		'<div class="line clear rel">'+
		' 	<span class="gift-title fl">&nbsp;</span>'+
		'    <div class="bress-box fl" id="bress_box">'+
		'        <div class="bress-link">'+
		'        <span class="dib f-cdae7d">祝福语模版</span>'+card_cat_html+
		'        </div>'+
		'    </div>'+
		'    <i class="icon-bgr icon-arrow-giftR" id="arrowRight"></i>'+
		'</div>'+
		'<div class="line clear">'+
		'    <span class="gift-title fl">署名</span>'+
		'    <input type="text" id="gift_from" name="gift_from" placeholder="送礼人姓名" autocomplete="off" value="'+gift_from_val+'" class="fl gift-to-name">'+
		'</div>'+
		'<div class="line rel bg-fff contbox m-t-5">'+
		'    <p class="fb f18 pack_title">免费的彩纸包装</p>'+
		'    <div class="radio-box clear m-t-20">'+
		'    	<div class="fl check-option pack_box">'+
		'        <p><label class="radio"><input type="radio" class="m-r-10" name="pop_pack" value="0">直接包好</label></p>'+
		'        <p class="m-t-10"><label class="radio m-r-10"><input type="radio" class="m-r-10" name="pop_pack" value="2">提供材料</label>&nbsp;<span class="f12 f-606060">自己动手，适合于想先看看礼物的你。</span></p>'+
		'        </div>'+
		'        <div class="fr form-btn"><a href="javascript:void(0);" id="save_card_btn" class="btn-red-sml">保存</a></div>'+
		'    </div>'+
		'</div>'+
		'</form>'+
	'</div>';
		var $html = $(html);
		if(has_pack == '1'){
			$html.find('.pack_title').show();
			$html.find('.pack_box').show();
		}else{
			$html.find('.pack_title').hide();
			$html.find('.pack_box').hide();
		}
		art.dialog({
			lock:true,
			id:"card_info",
			title:"",
			content:$html[0],
			background:"#000000",
			opacity:0.15
		});
		load_card();
		$bress = $("#bress_box");
		$bress_link = $bress.find(".bress-link");
		arr_bress = [];
		current = 0;
		var parent_width = $bress.width(),child_width = 0;
		$bress.find("a").each(function(ind, ele) {
			var width = $(ele).outerWidth(true);
			child_width += width;
		});
		$bress_link.width(child_width+106);
		var pages = Math.ceil((child_width+106)/parent_width);
		for(var i = 0;i<pages;i++){
			arr_bress[i] = -parent_width*i;
		}
		
	},'json');	
}
function load_card(){
	if($('#card').val() == '5'){
		$('#empty_card').click();
	}
	
	$('#gift_to').val($('#user_to').val());
	if($('#card_message').val().length > 0){
		$('#card_content').val($('#card_message').val());
	}
	$('#gift_from').val($('#user_from').val());
}
function save_card(){
	if($('#empty_card:checked').val() == '5'){
		$('#card').val('5');
	}else{
		$('#card').val('4');
	}	
	gift_to_val = $("#gift_to").val();
	gift_from_val = $("#gift_from").val();
	$('#user_to').val(gift_to_val);
	$('#card_message').val($('#card_content').val());
	$('#user_from').val(gift_from_val);
	$('#pack').val($('input[name="pop_pack"]:checked').val());
	art.dialog.list['card_info'].close();
	$(".cards").find("i.icon-gift").fadeIn(300);
	$("#card_html").html('<span>已填写贺卡！ 作为礼物送给亲爱的'+gift_to_val+'。</span><a href="javascript:void(0)" id="alter_card" class="m-l-10 f-b28850">修改</a><a href="javascript:void(0)" id="delete_card" class="m-l-10 f-b28850">删除</a>');
}
function delete_card(){
	if(confirm('确定删除？')){
		gift_to_val = '';
		gift_from_val = '';
		$("#gift_to").val('');
		$("#gift_from").val('');
		$cat_id=0;
		current = 0;
		$cat_html='';
		$('#card_message').val('');
		$('#card_content').val('');	
		$(".cards").find("i.icon-gift").fadeOut(300);
		$("#card_html").html('<a href="javascript:void(0)" class="f-b28850" id="edit_card"><i class="icon-bgr icon-edit-card m-r-5"></i>填写贺卡</a><span class="m-l-30">作为礼物送朋友？礼无忧提供免费的包装和贺卡。</span>');
	}
}
function update_total(total){
	if(total.amount){
		$('#total_amount').html(total.amount_formated);
	}else{
		$('#total_amount').html('');
	}
	if(total.bonus){
		$('#total_bonus').html(total.bonus_formated).parent().show();
	}else{
		$('#total_bonus').html('').parent().hide();
	}
	if(total.goods_price){
		$('#total_goods_price').html(total.goods_price_formated);
	}else{
		$('#total_goods_price').html('');
	}
	if(total.integral){
		$('#total_integral').html(total.integral_formated).parent().show();
	}else{
		$('#total_integral').html('').parent().hide();
	}
	if(total.pay_fee){
		$('#total_pay_fee').html(total.pay_fee_formated).parent().show();
	}else{
		$('#total_pay_fee').html('').parent().hide();
	}
	if(total.shipping_fee){
		$('#total_shipping_fee').html(total.shipping_fee_formated).parent().show();
	}else{
		$('#total_shipping_fee').html('').parent().hide();
	}
	if(total.real_goods_count){
		$('#total_real_goods_count').html(total.real_goods_count);
	}
	
}

var dialog_adress;
function editAddressDocument(data,param){
	var province_option = '';
	for(var i = 0; i<data.province_list.length;i++){
		province_option += '<option value="'+data.province_list[i].region_id+'" '+(data.consignee.province == data.province_list[i].region_id ? ' selected="selected" ':'' )+' >'+data.province_list[i].region_name+'</option>';
	}
	var city_option = '';
	for(var i = 0; i<data.city_list.length;i++){
		city_option += '<option value="'+data.city_list[i].region_id+'" '+(data.consignee.city == data.city_list[i].region_id ? ' selected="selected" ':'' )+' >'+data.city_list[i].region_name+'</option>';
	}
	var district_option = '';
	for(var i = 0; i<data.district_list.length;i++){
		district_option += '<option value="'+data.district_list[i].region_id+'" '+(data.consignee.district == data.district_list[i].region_id ? ' selected="selected" ':'' )+' >'+data.district_list[i].region_name+'</option>';
	}
	var html = '<div class="md-form md-edit-addr" data-address_id="'+data.consignee.address_id+'">'+
		'<form action="javascript:void(0)">'+
		(param=='addnew'?'<p class="f18 fb">新增收货地址</p>':'<p class="f18 fb">编辑收货地址</p>')+
		'<div class="line m-t-40 clear"><span class="title fl">收货人</span><div class="addrcont fl"><input type="text" name="consignee" placeholder="请输入姓名" value="'+data.consignee.consignee+'" class="inp"><p class="error-tips f12 f-d93732">&nbsp;</p></div></div>'+
		'<div class="line clear"><span class="title fl">手机号码</span><div class="addrcont fl"><input type="tel" name="tel" placeholder="请输入手机号" value="'+data.consignee.tel+'" class="inp"><p class="error-tips f12 f-d93732">&nbsp;</p></div></div>'+
		'<div class="line clear"><span class="addresstitle fl">收货地区</span><div class="addrcont fl">'+
		'<select name="province" class="addr-sel province">'+
		'<option value="0">请选择省</option>'+
			province_option+
		'</select>'+
		'<select name="city" class="addr-sel m-l-10 city">'+
		'<option value="0">请选择市</option>'+
			city_option+
		'</select>'+
		'<select name="district" class="addr-sel m-l-10 district">'+
		'<option value="0">请选择区</option>'+
			district_option+
		'</select>'+
		'<p class="error-tips f12 f-d93732">&nbsp;</p></div></div>'+
		'<div class="line clear"><span class="title fl">详细地址</span><div class="addrcont fl"><textarea name="address" placeholder="详细地址" class="address-area">'+data.consignee.address+'</textarea><p class="error-tips f12 f-d93732">&nbsp;</p></div></div>'+
		'<div class="line clear">'+
		'<label class="check fl"><input type="checkbox" name="is_default"'+ ((data.consignee.is_default)?'checked = "checked"':"")+' class="m-r-5">设为默认</label>';
		if(data.consignee.address_id){
			html += '<a href="javascript:void(0)" class="btn-red-sml ani-bg fr" id="save_info">修改</a></div>';
		}else{
			html += '<a href="javascript:void(0)" class="btn-red-sml ani-bg fr" id="save_info">新增</a></div>';
		}
		html += '</form>'+
		'</div>';
		dialog_adress = art.dialog({
			lock:true,
			id:"adress_info",
			title:"",
			content:html,
			background:"#000000",
			opacity:0.15
		});
}

});