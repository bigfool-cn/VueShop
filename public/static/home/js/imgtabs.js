$(function(){
	$(".cat-list li").each(function(ind, ele) {
		var $img = $(ele).find(".img-link img"),srcurl = $img.filter(".focus").attr("src"),normalpic = $img.eq(0).data("normal-img"),diypic = $img.eq(0).data("diy-img"),$linkele = $(ele).find("a.img-link"),$diybtn = $(ele).find(".can-diy"),isclick = false,ishover = false;
		if(normalpic != diypic){
			//$diybtn.hide();
			if($diybtn.length>0){	
				$diybtn.on("click",function(){	 
					$img = $(ele).find(".img-link img");
					srcurl = $img.filter(".focus").attr("src");	  
					if(srcurl == normalpic || ishover){//当前普通图
						checkPic();			
						showDiyPic(true,'click');
						isclick = true;
						ishover = false;
					}else if(srcurl == diypic){					
						checkPic();
						showDiyPic(false,'click');
						isclick = false;
					}else{
						console.log("please call 13691783060");
					}				
				});
				$diybtn.mouseenter(function(){
					if(!isclick){
						checkPic();			
						showDiyPic(true);
						ishover = true;
					}
				}).mouseleave(function(){
					if(!isclick){			
						checkPic();		
						showDiyPic(false);
						ishover = false;
					}
				});
			}
		
		}
		function checkPic(){
			if($linkele.find("img.diypic").length == 0){
				$linkele.append('<img src="'+diypic+'" class="dn diypic" style="z-index:2;">');	
			}else if($linkele.find("img.normalpic").length == 0){
				$linkele.append('<img src="'+normalpic+'" class="dn normalpic" style="z-index:1;">');	
			}
		}
		function showDiyPic(flag,isclick){
			var $diypic = $linkele.find("img.diypic"),$normalpic = $linkele.find("img.normalpic");
			if(!flag){					
					$diypic.stop().fadeOut(300).removeClass("focus");
					$normalpic.stop().fadeIn(300).addClass("focus");
					if(isclick==='click')$diybtn.removeClass("isdiy");
			}else{
					$diypic.stop().fadeIn(300).addClass("focus");
					$normalpic.stop().fadeOut(300).removeClass("focus");
					if(isclick==='click')$diybtn.addClass("isdiy");
			}
			
		}
    });
	
});
function showImg(ele,bool){
	var $img = $(ele).find(".img-link img"),normalpic = $img.eq(0).data("normal-img"),diypic = $img.eq(0).data("diy-img"),$linkele = $(ele).find("a.img-link"),$diybtn = $(ele).find(".can-diy");
	if($linkele.find("img.diypic").length == 0){
		$linkele.append('<img src="'+diypic+'" class="dn diypic" style="z-index:2;">');	
	}
	var $diypic = $linkele.find("img.diypic"),$normalpic = $linkele.find("img.normalpic");
	if(bool){
		$diypic.fadeIn(300).addClass("focus");
		$normalpic.fadeOut(300).removeClass("focus");
		$diybtn.addClass("isdiy");
	}else{
		$diypic.fadeOut(300).removeClass("focus");
		$normalpic.fadeIn(300).addClass("focus");
		$diybtn?$diybtn.removeClass("isdiy"):'';
	}
}