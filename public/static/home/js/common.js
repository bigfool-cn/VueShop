$.fn.extend({
	cat_slide:function(options){
		var defaults = {
			slider:null
		},
		opt = $.extend(defaults,options),$slider_btn = $(this);
		$slider_btn.on("click",function(){
			var slider_arrow = $slider_btn.find("i");
			if(slider_arrow.hasClass("icon-arrowD")){
				opt.slider?opt.slider.slideDown(300):console.log("cat_slide插件初始化失败");
				slider_arrow.removeClass("icon-arrowD").addClass("icon-arrowU");
			}else{
				opt.slider?opt.slider.slideUp(300):console.log("cat_slide插件初始化失败");
				slider_arrow.removeClass("icon-arrowU").addClass("icon-arrowD");
			}
		});
	},
	cate_show:function(options){
		var defaults = {
			popups:null
		}
		opt = $.extend(defaults,options),$tree_box = $(this);
		$tree_box.hover(function(){
			$tree_box.addClass("hover");
			opt.popups.show();
		},function(){
			$tree_box.removeClass("hover");
			opt.popups.hide();
		});
		
	},
	nav_slide:function(options){
		var defaults = {
			ele:[]
		},
		opt = $.extend(defaults,options),t,flag;
		$.each(opt.eles,function(ind,ele){
			$(ele).mouseenter(function(){
				clearTimeout(t);
				showSlide($(ele+"_box"));
			}).mouseleave(function(){
				hideSlide();
			});
			$(ele+"_box").mouseenter(function(){
				clearTimeout(t);
			}).mouseleave(function(){
				hideSlide();
			});
		});
		$(".query-box-nav .query a").on("click",function(){
			$(this).siblings().removeClass("focus");
			$(this).addClass("focus");
		});
		function showSlide(ele){
			$(".query-box-nav").each(function(index, element) {
                if($(element).css("z-index") != 98){ 
					flag = true;
					$(element).css("z-index",98);
				}
            });
			if(flag){
				ele.css("z-index",99);
				ele.show();
				ele.siblings(".query-box-nav").hide();
			}else{				
				ele.css("z-index",99);
				ele.slideDown(100);
			}
		}
		function hideSlide(){
			t = setTimeout(function(){$(".query-box-nav").slideUp(100).css("z-index",1);flag = false;},500);
		}
	},
	user_operate_slide:function(options){
		var defaults = {
			ele:[]
		},
		opt = $.extend(defaults,options),t,flag;
		$.each(opt.eles,function(ind,ele){
			$(ele).mouseenter(function(){
				clearTimeout(t);
				if(ele == '#nav_cart'){
					getCartInfo();
				}
				showSlide($(ele+"_box"));
			}).mouseleave(function(){
				hideSlide();
			});
			$(ele+"_box").mouseenter(function(){
				clearTimeout(t);
			}).mouseleave(function(){
				hideSlide();
			});
		});
		function showSlide(ele){
			$("#user_operate .user-box").each(function(index, element) {
                if($(element).css("z-index") != 98){ 
					flag = true;
					$(element).css("z-index",98);
				}
            });
			if(flag){
				ele.css("z-index",99);
				ele.show();
				ele.siblings(".user-box").hide();
			}else{				
				ele.css("z-index",99);
				ele.fadeIn(300);
			}
		}
		function hideSlide(){
			t = setTimeout(function(){$("#user_operate .user-box").fadeOut(300).css("z-index",1);flag = false;},500);
		}
		
	},
	slider:function(settings){
		var dft = {
			slider_box : $(this),
			slider_option:$(".options"),
			arr_position:[],
			current : 0,
			animate_type:"slide"
		}
		var slider = function(options){
			this.params = $.extend(dft,options,{});
			this.init();
		};
		slider.prototype.showAni = function(index){
			this.params.current = index;
			if(this.params.animate_type == "slide"){
				this.params.slider_box.stop().animate({"left":this.params.arr_position[this.params.current]},500);
			}else if(this.params.animate_type == "fade"){
				var $items = this.params.slider_box.find(".item");
				$items.css("z-index",1).stop().fadeOut(500);
				$items.eq(this.params.current).css("z-index",3).stop().fadeIn(300);
			}
			this.showOption(this.params.current);
		};
		slider.prototype.showOption = function(index){
			this.params.slider_option.find("i").removeClass("focus");
			this.params.slider_option.find("i").eq(index).addClass("focus");
		};
		slider.prototype.bindEvent = function(){
			var _that = this;
			this.params.slider_option.find("i").each(function(ind,ele){
				$(ele).on("mouseenter",function(){
					_that.showAni(ind);
				});
			});
		};
		slider.prototype.init = function(){
			if(this.params.animate_type == "slide"){
				var _this = this;
				this.params.slider_box.css("width",function(){
					var width = 0; 
					_this.params.slider_box.find(".item").each(function(ind,ele){
						width += $(ele).width();
					});
					return width;
				}).find(".item").each(function(ind,ele){
					_this.params.arr_position[ind] = -$(ele).width()*ind;
				});
			}
			this.bindEvent();
		};
		return new slider(settings);
	}
});
$.fn.countDown = function(times,callback){
    var t = setInterval(decrement,1000),_this = this;
    function decrement(){
        if(times-1>0){
            times--;
            callback(true,times,_this);
        }else{
            clearInterval(t);
            callback(false,_this);
        }
    }
};
$(function(){
	$('#head-searchbtn').on('click',function(){
		//search
		var key = $('#head-search').val();
		var url = '/search.html?keywords='+key;
		window.location.href=url;
	});
	$('#head-search').on('keyup',function(e){
		if(e.keyCode==13){
			var key = $('#head-search').val();
			var url = '/search.html?keywords='+key;
			window.location.href=url;
		}
	});
	$("#category").cate_show({popups:$("#category_pop")});
	$().nav_slide({eles:["#gift_guide","#flowers","#cakes"]});
	$().user_operate_slide({eles:["#nav_user","#nav_cart"]});
	$('#nav_cart_box').on('click','.remove_item',function(){
		var id = $(this).data('rec-id');
		// $.post("flow.php?step=small_cart&act=drop_goods&id="+id,function(cart_info){
		// 	updateCart(cart_info);
		// },'json');
	});
	getCartInfo();

	//
	$('.navigation-search').on('click',function(){
		var $group_who = $('.group-who.focus');
		var $group_why = $('.group-why.focus');
		if( $group_who.length == 0){
			//alert('请选择 送给谁');
			//return false;
			$group_who = $('.group-who').eq(0);
		}
		if($group_why.length == 0){
			//alert('请选择 为啥送');
			//return false;
			$group_why = $('.group-why').eq(0);
		}
		if(global_config.sub_navigation_map[$group_who.html()+$group_why.html()]){
			//alert(global_config.sub_navigation_map[$group_who.html()+$group_why.html()]);
			//var url = '/search.php?keywords='+$group_who.html()+' '+$group_why.html();
			//window.location.href = url;
			window.location.href = global_config.sub_navigation_map[$group_who.html()+$group_why.html()];
		}else{
			window.location.href = '/';
			//alert('页面不存在');
		}

		//var url = '/search.php?keywords='+($group_who.length ? $group_who.html():'')+' '+($group_why.length ? $group_why.html() : '');
		//window.location.href = url;

	});
	$('.group-who').on('click',function(){
		var who = $(this).html();
		$('.group-why').each(function(){
			var why = $(this).html();
			if(global_config.sub_navigation_map[who+why]){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});
	$('.group-why').on('click',function(){
		var why = $(this).html();
		$('.group-who').each(function(){
			var who = $(this).html();
			if(global_config.sub_navigation_map[who+why]){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});
	//地址选择器
	
	$('body').on('change','.addr-sel.province',function(){
		var province_id = $(this).val();
		var type=2;
		var url = '/region.php?type='+type+'&parent='+province_id;
		$.get(url,function(data){
			var $city = $('.addr-sel.city');
			var $district = $('.addr-sel.district');
			var option = '<option value="0">请选择市</option>';
			for(var i=0;i<data.regions.length;i++){
				option +='<option value="'+data.regions[i].region_id+'">'+data.regions[i].region_name+'</option>';
			}
			$city.html(option);
			$district.html('').hide();
		},'json');
	});
	
	$('body').on('change','.addr-sel.city',function(){
		var city_id = $(this).val();
		var type=3;
		var url = '/region.php?type='+type+'&parent='+city_id;
		$.get(url,function(data){
			var $district = $('.addr-sel.district');
			if(data.regions.length){
				var option = '<option value="0">请选择区</option>';
				for(var i=0;i<data.regions.length;i++){
					option +='<option value="'+data.regions[i].region_id+'">'+data.regions[i].region_name+'</option>';
				}
				$district.html(option).show();
			}else{
				$district.html('<option value="0">请选择区</option>');
				$district.val(0);
				$district.hide();
			}
			
			
		},'json');
	});
	$("#back_to_top").on("click",function(){
		$("body,html").animate({scrollTop:0},800);
	});
});
function getCartInfo(){
	// $.ajax({
	//   url: "/home/cart/index",
	//   cache: false,
	//   type: "POST",
	//   dataType:"json",
	//   success: function(cart_info){
	// 	  updateCart(cart_info);
	//   }
	// });
}
function updateCart(cart_info){
	var temp = '<i class="icon-bgr icon-operate"></i>';
	if(cart_info.total.real_goods_count > 0){
		temp += '<table class="f12">';
		for(var i = 0 ; i < cart_info.goods_list.length ; i++)
		{
			temp += '<tr class="gds"><td width="25%"><a href="'+'goods.php?id='+cart_info.goods_list[i].goods_id+'"><img width="60px" src="'+cart_info.goods_list[i].goods_thumb+'"></a></td>';
			temp += '<td class="overtxt" width="50%"><a href="'+'goods.php?id='+cart_info.goods_list[i].goods_id+'">'+cart_info.goods_list[i].goods_name+'</a><br>'+cart_info.goods_list[i].goods_attr+'</td>';
			temp += '<td class="tr" width="25%">X'+cart_info.goods_list[i].goods_number+'<br>'+cart_info.goods_list[i].goods_price+'<br><a class="remove_item" data-rec-id="'+cart_info.goods_list[i].rec_id+'" href="javascript:void(0)">删除</a></td></tr>';
		}
		temp += '<tr><td colspan="3"><div class="clear m-t-10"><span class="fl">共计'+cart_info.total.real_goods_count+'件商品<br><b>合计：<span class="f-d93732">'+cart_info.total.goods_price+'</span></b></span><a href="flow.php" class="fr btn-red-sml ani-bg">去购物车结算</a></div></td></tr></table>';
	}
	else{
		temp += '<p class="f12 f-999 tc p-y-20">购物车中还没有商品，赶紧选购吧！</p>';
	}
	$('#nav_cart_box').html(temp);
	if(cart_info.total.real_goods_count > 0){
		$('#cart_count').html(cart_info.total.real_goods_count).show();
	}else{
		$('#cart_count').html(cart_info.total.real_goods_count).hide();
	}
	
}
function isNumber(num){
	var p = /^[1-9][0-9]*$/;
	if(p.test(num)){
		return true;
	}	
	return false;		
}

//删除数组元素.
Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
};
//在数组中获取指定值的元素索引
Array.prototype.getIndexByValue= function(value)
{
    var index = -1;
    for (var i = 0; i < this.length; i++)
    {
        if (this[i] == value)
        {
            index = i;
            break;
        }
    }
    return index;
};
//查看一个值是否存在于数组中
Array.prototype.S=String.fromCharCode(2);
Array.prototype.in_array=function(e)
{
    var r=new RegExp(this.S+e+this.S);
    return (r.test(this.S+this.join(this.S)+this.S));
};
//把一个对象的所有键重新组成一个数组
function getObjectKeys(object) 
{
    var keys = [];
    for (var property in object)
      keys.push(property);
    return keys;
}
//把一个对像的值重新组成一个数组
function getObjectValues(object) 
{
    var values = [];
    for (var property in object)
      values.push(object[property]);
    return values;
}
//去除数组中重复的值
Array.prototype.del = function() { 
	var a = {}, c = [], l = this.length; 
	for (var i = 0; i < l; i++) { 
		var b = this[i]; 
		var d = (typeof b) + b; 
		if (a[d] === undefined) { 
			c.push(b); 
			a[d] = 1; 
		} 
	}
	return c; 
}; 

function objToJSONString(obj, filter){
	return JSON.stringify(obj, filter);   
}   
   
function parseObjectToJSON(object, filter){   
	return JSON.parse(object, filter);   
} 
//验证手机号 从user.js挪过来
function validPhone(phone){
	var patten = /^1[0-9]{10}$/;
	return patten.test(phone);
}
//验证邮箱号
function checkEmail(email) {
	var patten  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return patten.test(email);
}
//去收尾空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}