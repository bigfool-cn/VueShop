$(function(){
	$("#add_new").on("click",function(){

		var address_id = 0;
		$.get('user.php?act=get_address_info',{address_id:address_id},function(data){
			if(data.error == 0){
				editAddressDocument(data.data,'addnew');
			}else{
				alert('无法得到地址详情');
			}
		},'json');
	});
	$("body").on("click","#address_list .alter",function(){
		//$.ajax({});
		var address_id = $(this).data('address_id');
		$.get('user.php?act=get_address_info',{address_id:address_id},function(data){
			if(data.error == 0){
				editAddressDocument(data.data,'edit');
			}else{
				alert('无法得到地址详情');
			}
		},'json');
		//var data = {"name":"allen","tel":"13691783060","detail":"荣超花园22栋","ischecked":false}
		//写到ajax回调，调取这条地址信息传给function
	});
	$("body").on("click","#address_list .delete",function(){
		if(confirm("你确定删除这条地址吗？")){

			var address_id = $(this).data('address_id');
			var $li = $(this).parents("li");
			$.post('flow.php?step=delete_consignee&is_ajax=1',{address_id:address_id},function(data){
				if(data.error == 0){
					$li.remove();
				}else{
					alert(data.message);
				}
			},'json');


		}
	});
	$("body").on("click","#address_list .set-default",function(){

		var address_id = $(this).data('address_id');
		var $address_list = $("#address_list"),_this = this;
		$.post('user.php?act=act_address_set_default',{address_id:address_id},function(data){
			if(data.error == 0){
				$address_list.children("li").each(function(ind, ele) {
					var $default = $(ele).find(".default");
					if(!$default.hasClass("dn")){
						$default.addClass("dn");
						$(ele).find(".right .set-default").removeClass("dn");
					}else{
						if(_this === $(ele).find(".set-default")[0]){
							$default.removeClass("dn");
							$(ele).find(".right .set-default").addClass("dn");
						}
					}
				});
			}else{
				alert(data.message);
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

		$.post('user.php?act=act_edit_address',post_data,function(data){
			if(data.error == 0){
				//if(address_id == 0){
				//	$address_list = $("#address_list");
				//	if(is_default){
				//		$address_list.children("li").each(function(ind, ele) {
				//			var $default = $(ele).find(".default");
				//			if($default.length>0){
				//				$default.addClass("dn");
				//				$(ele).find(".right .set-default").removeClass('dn');
				//			}
				//		});
				//	}
				//	var html = '<li class="m-b-20 b-1 clear">'+
				//			'<div class="left fl">'+
				//			'<p><span>'+consignee+'</span><span class="m-l-80">'+tel.substr(0,3)+"****"+tel.substr(-4,4)+'</span><em class="default dib lh1 m-l-40 bg-d1c0a5 f12 f-fff middle '+(is_default?'':'dn')+'">默认地址</em></p>'+
				//			'<p class="m-t-5">'+province+'&nbsp;'+city+'&nbsp;'+district+'&nbsp;'+address+'</p>'+
				//			'</div>'+
				//			'<div class="right fr p-t-10"><a href="javascript:void(0)" class="f-666 alter">修改</a><a href="javascript:void(0)" class="m-l-10 f-666 delete">删除</a><a href="javascript:void(0)" class="m-l-10 f-666 set-default '+(is_default?'dn':'')+'">设为默认</a></div>'+
				//			'</li>';
				//	if(is_default)$address_list.find("a").removeClass("focus");
				//	$address_list.append(html);
				//}else{
				//
				//}

				dialog_adress.close();
				window.location.reload();
			}else{
				alert(data.message);
			}
		},'json');


	});
});
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
		'<div class="line clear"><span class="title fl">收货人</span><div class="addrcont fl"><input type="tel" name="tel" placeholder="请输入手机号" value="'+data.consignee.tel+'" class="inp"><p class="error-tips f12 f-d93732">&nbsp;</p></div></div>'+
		'<div class="line clear"><span class="title fl">收货人</span><div class="addrcont fl">'+
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
		'<div class="line clear"><span class="title fl">收货人</span><div class="addrcont fl"><textarea name="address" placeholder="详细地址" class="address-area">'+data.consignee.address+'</textarea><p class="error-tips f12 f-d93732">&nbsp;</p></div></div>'+
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
			id:"adress_info",
			title:"",
			content:html
		});
}