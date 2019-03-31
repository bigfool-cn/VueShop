$(function(){
	$("#cart_list").find(".count-box").each(function(ind, ele) {
		var $ele = $(ele);
        $(ele).children(".icon-sub").on("click",function(){
			var $input = $ele.children("input"), count = $input.val();
			var rec_id = $input.data('rec_id');
			if(isNumber(count)){
				count = parseInt(count);
				if(count>1){
					count--;
					$input.val(count);
				}
			}else{
				count = 1;
				$input.val(count);
			}
			flowUpdateCart(rec_id,count);
		});
		$(ele).children(".icon-add").on("click",function(){
			var $input = $ele.children("input"), count = $input.val();
			var rec_id = $input.data('rec_id');
			if(isNumber(count)){
				count = parseInt(count);
				count++;
				$input.val(count);
			}else{
				count = 1;
				$input.val(count);
			}
			flowUpdateCart(rec_id,count);
		});
		$(ele).children('.icon-number').on('change',function(){
			var count = $(this).val();
			var rec_id = $(this).data('rec_id');
			if(isNumber(count)){
				count = parseInt(count);
				$(this).val(count);
			}else{
				count = 1;
				$(this).val(count);
			}
			flowUpdateCart(rec_id,count);
		});

    });
	$(".slider").slider();
	$('.icon-delete').on('click',function(){
		var rec_id = $(this).data('rec_id');
		flowDeleteCart(rec_id);
	});
});

function flowUpdateCart($cart_id,$number){
	// var url = '/flow.php?step=ajax_update_cart&isShowCartInfo=1';
	// $.post(url,'goods_number['+$cart_id+']='+$number,function(data){
	// 	console.log(data);
	// 	if(data.error==0){
	// 		$('.icon-number[data-rec_id="'+$cart_id+'"]').val(data.content);
	// 		for(var i=0;i<data.cart_info.goods_list.length;i++){
	// 			if(data.cart_info.goods_list[i].rec_id == $cart_id){
	// 				$('#sub_total_'+$cart_id).html(data.cart_info.goods_list[i].subtotal);
	// 				break;
	// 			}
	// 		}
	// 		$('#goods-total').html(data.cart_info.total.goods_price);
	// 	}else{
	// 		alert(data.message);
	// 		flowUpdateCart($cart_id,1)
	// 	}
	// 	//window.location.reload();
	// },'json');
}

function flowDeleteCart($cart_id){
	var url = '/flow.php?step=drop_goods&id='+$cart_id;
	$.post(url,'is_ajax=1',function(data){
		console.log(data);
		window.location.reload();
	},'json');
}