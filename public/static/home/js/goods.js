$(function(){
    //产品图加载……
    var $thumbslist = $("#goods_img_list").children("img"),$singlelist = $("#goods_single_list").children("img"),$loadbigimg = $(".load-big-img"),imgdefereds=[],$loading = $("#goods_single_list .loading"),currentindex = 0,length = 0, firstclick = true,previndex = 999;
    $loadbigimg.each(function(ind, ele) {
        var dfd = $.Deferred();
        $(ele).bind('load',function(){
            dfd.resolve();
        }).bind('error',function(){
            dfd.resolve();
        });
        if(this.complete){//IE兼容
            dfd.resolve();
        }
        imgdefereds.push(dfd);
    });
    var bindEvent = function(){
        $loading.hide();
        $thumbslist.each(function(ind, ele) {
            $(ele).mouseenter(function(){
                $thumbslist.removeClass("focus");
                $thumbslist.eq(ind).addClass("focus");
                $singlelist.hide();
                $singlelist.eq(ind).show();
            });
        });
    }
    $.when.apply(null,imgdefereds).done(function(){
        bindEvent();
        // init_event();
    });
    function init_screen(){
        var $naturalpic = $("#naturalpic"),$tablist = $("#tablist");
        var dfd_screen = $.Deferred(),screendefereds = [];
        $.each(gallery,function(ind,ele){
            var img = document.createElement("img");
            var li = document.createElement("li");
            img.src = ele.naturalpic;
            //img.className = "test"+ind;
            if(ind == currentindex){
                li.className = "focus";
                img.className = "curr";
            }
            $naturalpic.append(img);
            $tablist.append(li);
            $(img).bind('load',function(){
                dfd_screen.resolve();
            }).bind('error',function(){
                dfd_screen.resolve();
            });
            if(img.complete){//IE兼容
                dfd_screen.resolve();
            }
            screendefereds.push(dfd_screen);
        });
        length = screendefereds.length;
        $.when.apply(null,screendefereds).done(function(){
            init_screen_event();
        });
    }
    function show_screen(currentindex){
        if(currentindex!=previndex){
            var $naturalpic = $("#naturalpic img").not(".loading"),$tablist = $("#tablist li")
            $tablist.removeClass("focus").eq(currentindex).addClass("focus");
            //console.log("previndex:"+previndex);
            //console.log("currentindex:"+currentindex);
            $naturalpic.each(function(ind, ele) {
                if(ind === previndex){
                    $(ele).css("z-index",12).css("display","inline");
                }else if(ind === currentindex){
                    $(ele).css("z-index",13).css("display","none");
                }else{
                    $(ele).css("z-index",10).css("display","none");
                }
            });
            $naturalpic.eq(currentindex).fadeIn(200,function(){
                $naturalpic.eq(previndex).css("display","none");
            });
        }
    }

    function init_event(){
        var $screen_image = $("#screen_image");
        $singlelist.each(function(ind, ele) {
            $(ele).on("click",function(){
                currentindex = ind;
                $screen_image.show();
                if(firstclick){
                    init_screen();
                    firstclick=false;
                }else{
                    show_screen(ind);
                }
            });
        });
    }
//-------------------------------------------详情页描述标题---------------------------------------------------
    var imgdefereds=[];
    $("#discription").find("img").each(function(ind, ele) {
        var dfd = $.Deferred();
        $(ele).bind('load',function(){
            dfd.resolve();
        }).bind('error',function(){
            dfd.resolve();
        });
        if(this.complete){//IE兼容
            dfd.resolve();
        }
        imgdefereds.push(dfd);
    });
    $.when.apply(null,imgdefereds).done(function(){
        loadGoodsTitle();
    });
    function loadGoodsTitle(){
        try{
            var $header = $("#detail_header"),
                title_top = $header.offset().top,
                $temp = $("#title_temp"),
                title_height = $header.outerHeight(true),
                flag = true,
                elseflag = true,
                sizeTop = $("#size").offset().top-90,
                commentTop = $("#comment").offset().top-90,
                consultTop = $("#consult").offset().top;

            var sizePos = $("#size").offset().top-90,commentPos = $("#comment").offset().top-90,consultPos = $("#consult").offset().top-90,guessyoulikePos = $("#guessyoulike").offset().top-90,$service = $(".gds_service"),$qq_chat = $("#goods_qq_chat");
            //console.log("sizePos:"+sizePos+"|commentPos:"+commentPos+"|consultPos:"+consultPos+"|guessyoulikePos:"+guessyoulikePos);
            $(window).scroll(function(){
                var scrollTop = $(this).scrollTop()+10;
                if(scrollTop>title_top){
                    if(flag){
                        $header.css({"position":"fixed","top":"-"+title_height+"px"});
                        $temp.show();
                        $header.animate({top:0},300,function(){$service.fadeIn(300);});
                        flag = false;
                        elseflag = true;
                        $qq_chat.stop().fadeOut(300);
                    }
                }else{
                    if(elseflag){
                        $header.css("position","static");
                        $temp.hide();
                        flag = true;
                        elseflag = false;
                        $service.hide();
                        $qq_chat.stop().fadeIn(300);
                    }
                }
                //console.log(scrollTop);
                if(scrollTop>=sizePos&&scrollTop<commentPos){
                    $header.find("a").eq(1).addClass("focus").siblings().removeClass("focus");
                }else if(scrollTop>=commentPos&&scrollTop<consultPos){
                    $header.find("a").eq(2).addClass("focus").siblings().removeClass("focus");
                }else if(scrollTop>=consultPos){
                    $header.find("a").eq(3).addClass("focus").siblings().removeClass("focus");
                }else{
                    $header.find("a").eq(0).addClass("focus").siblings().removeClass("focus");
                }
            });
            var $header_link = $header.find("a");
            $header_link.each(function(ind, ele) {

                $(ele).on("click",function(){
                    var id = $(this).data("param");
                    var top = $(id).offset().top;
                    $header_link.removeClass("focus");
                    $header_link.eq(ind).addClass("focus");
                    $("body,html").animate({scrollTop:top-90},300);
                });
            });
            $(".slider").slider();

        }catch(e){
            console.log(e);
        }
    }





    function goto_diy(){
        var goods = new Object();
        var spec_arr = new Array();
        var fittings_arr = new Array();
        var fittings_spec = new Array();
        var fittings = new Array();
        if($('#goodsAttrListCount').val() > 0 ){
            if($("#spec_selected").val() == 0){
                alert('请选择规格');
                return false;
            }
            spec_arr.push($("#spec_selected").val());
            quick = 1;
        }

        var number = 1;


        goods.fittings = fittings;
        goods.quick = 1;
        goods.spec = spec_arr;
        goods.goods_id = goods_id;
        goods.number = number;
        goods.shipping_date = '';//鲜花送货时间
        goods.parent = 0;
        var urlStr = objToJSONString(goods);
        var encodeUrlStr = BASE64.encode(urlStr);
        window.location.href = 'diy.php?act=submitData&goods_id=' + goods_id
            + '&goods=' + encodeUrlStr;
    }
    $("body").on("click","#buy_to_cart",function(){
//		var tempno = $("input[name=tempno]").val(),
//			temptxt = $("textarea[class=temptxt]").val();
//		if(tempno.length == 0 || temptxt.length == 0){
//			art.dialog.tips('请填写模版信息');
//			return false;
//		}
        var error = '';
        var diy_info = [];
        $('.diy-pop .value-input').each(function(){
            var value = $(this).val();
            if(value == ''){
                error += '请填写模版信息';
                return;
            }else{
                var diy = {
                    "title":$(this).next().val(),
                    "value":value
                };
                diy_info.push(diy);
            }
        });
        if(error){
            art.dialog.tips(error);
            return false;
        }
        var goods = new Object();
        var spec_arr = new Array();
        var fittings_arr = new Array();
        var fittings_spec = new Array();
        var fittings = new Array();
        if($('#goodsAttrListCount').val() > 0 ){
            if($("#spec_selected").val() == 0){
                alert('请选择规格');
                return false;
            }
            spec_arr.push($("#spec_selected").val());
            quick = 1;
        }

        var number = 1;

        goods.diy_info = diy_info;
        goods.fittings = fittings;
        goods.quick = 1;
        goods.spec = spec_arr;
        goods.goods_id = goods_id;
        goods.number = number;
        goods.shipping_date = '';//鲜花送货时间
        goods.parent = 0;

        jQuery.post( 'flow.php?step=add_to_cart&check_diy=1&json=1','goods=' + encodeURIComponent(objToJSONString(goods)),function(data){
            if (data.error > 0) {
                // 如果需要缺货登记，跳转
                if (data.error == 2) {
                    alert(data.message);
                }
                else if (data.error == 6){
                    //没选规格
                    alert(data.message);
                }
                else if(data.error == 10){
                    //定制
                    alert(data.message);
                }else{
                    alert(data.message);
                }
            }else{
                window.location.href="flow.php";
                //alert(data.content);
            }
        },'JSON' );
        //$.ajax({})
    });

    //----------------------规格选择------------------------------------

    $('.select_attr').on('click',function(){
        //样式
        $(this).parent().find('.select_attr').removeClass('focus');
        $(this).addClass('focus');
        //功能

        var attr_name = $(this).data('spec');
        var type_id = $(this).data('spec-key');
        var spec_count = $('#goodsAttrListCount').val();

        if(spec_count == 1){//如果是单选
            var attr_price = spec_info[k[0]]['price'];
            var attr_id = spec_info[k[0]]['goods_attr_id'];
            var number = spec_info[k[0]]['number'];
            var name = objToJSONString(spec_info[attr_id]['value']);
            var img_id = spec_info[k[0]]['img_id'];
            if(number > 0){
                //有库存
                $('#attr_'+type_id).val(type_id+'-'+attr_name);
                $('#spec_selected').val(attr_id);
                change_img(img_id);
                update_price(attr_price,name);
                update_buybtn(true);
            }
            else{
                //无库存
                $('#attr_'+type_id).val('');
                $('#spec_selected').val('');
                change_img(img_id);
                //art.dialog.tips('抱歉，此款暂时缺货，请选其它款式');
                //alert('抱歉，此款暂时缺货，请选其它款式');
                update_buybtn(false);
                return;
            }
        }
        else if(spec_count > 1){//如果是多选的话
            $('#attr_'+type_id).val(type_id+'-'+attr_name);//把已选的规格写入input中
            var selected_attr = [];
            $('.attr_selected').each(function (){//已选的规格
                if($(this).val()!='' && $(this).val()!=undefined)
                    selected_attr.push($(this).val());
            });

            //处理选择一个属性后和这个属性没有组合的属性改为不可选.
            var attrs = new Array;
            var tem_attrs = new Array;
            for(var i = 0 ; i < keys.length ; i++){
                tem_attrs = keys[i].split('→_→');
                tem_attrs.remove(tem_attrs.getIndexByValue(type_id+'-'+attr_name));
                attrs = attrs.concat(tem_attrs);
            }
            $(".attr-box a:not(.s_"+type_id+")").each(function(){
                var data_attr = $(this).attr('data-attr');
                if( ! attrs.in_array(data_attr)){
                    $(this).hide();

                }else{
                    data_attr = data_attr.split('-');
                    $(this).show();
                }
            });

            //判断是完成了规格的选择.
            if(selected_attr.length == spec_count){
                //选完
                selected_attr = selected_attr.join('→_→');
                selected_attr = selected_attr.replace(/\(/,'\\(');
                selected_attr = selected_attr.replace(/\)/,'\\)');
                var i = keys.getIndexByValue(selected_attr);
                if(i !== false && i !== undefined){
                    attr_id = k[i];
                    var attr_price = spec_info[attr_id]['price'];
                    var number = spec_info[attr_id]['number'];
                    var name = objToJSONString(spec_info[attr_id]['value']);
                    var img_id = spec_info[attr_id]['img_id'];
                    if(number > 0){
                        //有库存
                        $('#spec_selected').val(attr_id);
                        change_img(img_id);
                        update_price(attr_price,name);
                        update_buybtn(true);
                    }
                    else{
                        //无库存
                        $('#attr_'+type_id).val('');
                        $('#spec_selected').val('');
                        change_img(img_id);
                        //art.dialog.tips('抱歉，此款暂时缺货，请选其它款式');
                        //alert('抱歉，此款暂时缺货，请选其它款式');
                        update_buybtn(false);
                        return;
                    }

                }else{
                    //没有这种规格
                    $('#attr_'+type_id).val('');
                    $('#spec_selected').val('');
                    //art.dialog.tips('抱歉，此款暂时缺货，请选其它款式');
                    //alert('抱歉，此款暂时缺货，请选其它款式');
                    update_buybtn(false);
                    return ;
                }

            }else{
                //alert("非法操作");
            }

        }
    });
    function change_img(img_id){
        if($('.img_id_'+img_id).length > 0){
            $('.img_id_'+img_id).mouseenter();
        }else{
            for (var i = 0; i< gallery.length;i++){
                if(gallery[i].img_id == img_id){
                    $('#goods_img_list .focus').prop('class','m-t-16 img_id_'+img_id+' focus').prop('src',gallery[i].smallpic);
                    $('#goods_single_list img:visible').prop('src',gallery[i].bigpic).prop('data-cloudzoom',"zoomImage: '"+gallery[i].naturalpic+"'");
                    break;
                }
            }
        }

    }
    function update_buybtn(flag){
        var $add_to_cart = $("#add_to_cart"),$product_diy = $("#product_diy");
        if(flag){
            $add_to_cart.removeClass("greensty").html("直接购买").data('is_no_stock','0');
            $product_diy.removeClass("greensty").html("定制购买").data('is_no_stock','0');
        }else{
            $add_to_cart.addClass("greensty").html("缺货登记").data('is_no_stock','1');
            $product_diy.addClass("greensty").html("缺货登记").data('is_no_stock','1');
        }
    }
    function update_price(attr_price,name){
        var uPrice = parseFloat($(".price-show").data("base-price") );
        var Discount = parseInt($(".price-show").data("discount"));
        var aPrice = parseFloat(attr_price);
        var shop_price = Number(uPrice + aPrice*Discount/100 ).toFixed(1);
        $(".price-show").html('￥'+shop_price+'元');
        var $add_to_cart = $("#add_to_cart"),$product_diy = $("#product_diy");
        if(name.match("定制")){
            $product_diy.show();
            $add_to_cart.hide();
        }else{
            $product_diy.hide();
            $add_to_cart.show();
        }
    }





});

