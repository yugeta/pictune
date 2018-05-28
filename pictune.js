;(function(){
  var $$ = function(options){
		if(document.readyState === "complete"){
		    $$.prototype.start();
		}
		else if(document.readyState === "interactive"){
      this.setEvent(window,"DOMContentLoaded",$$.prototype.start);
		}
		else{
      this.setEvent(window,"load",$$.prototype.start);
		}
    if(options){
      $$.prototype.options = options;
    }
  };

  $$.prototype.start = function(){
    var pictune = document.getElementById("pictune");
    if(pictune === null){
      // css読み込み
      $$.prototype.getScriptPutCss();

      // 画像検索
      $$.prototype.setPicture();

      // イベントセット
      $$.prototype.setEvent(window,"click" ,$$.prototype.clickImg);
      $$.prototype.setEvent(window,"scroll",$$.prototype.adjustSize);
      $$.prototype.setEvent(window,"resize",$$.prototype.adjustSize);
    }
    if(typeof $$.prototype.options !== "undefined"
    && typeof $$.prototype.options.flg === "undefined"){
      $$.prototype.setCustom($$.prototype.options);
      // delete $$.prototype.options;
      $$.prototype.options.flg = true;
    }
  };

  $$.prototype.getScriptPutCss = function(){
    var ss = document.getElementsByTagName("script");
    for(var i=0; i<ss.length; i++){
      if(!ss[i].src){continue;}
      var ptn = new RegExp("(.+?)pictune.js$");
      if(ss[i].src.match(ptn)){
        var ln = document.createElement("link");
        ln.rel = "stylesheet";
        ln.href = RegExp.$1 + "pictune.css";
        document.getElementsByTagName("head")[0].appendChild(ln);
        break;
      }
    }
  };

  $$.prototype.setPicture = function(){
    var elm = document.getElementById("pictune");
    if(elm !== null){return;}

    var pictune = document.createElement("div");
    pictune.id = "pictune";
    // pictune.onclick = $$.prototype.viewToggle;
    document.body.appendChild(pictune);

    var loading = document.createElement("div");
    loading.className = "pictune-loading";
    pictune.appendChild(loading);

    var area = document.createElement("div");
    area.className = "pictune-area";
    pictune.appendChild(area);

    var close = document.createElement("div");
    close.className = "pictune-close";
    close.onclick = $$.prototype.viewToggle;
    area.appendChild(close);

    var img = new Image();
    img.className = "picture";
    area.appendChild(img);
  };

  $$.prototype.viewToggle = function(){
    var pictune = document.getElementById("pictune");
    if(pictune === null){return;}
    var flg = $$.prototype.getStyle(pictune , "display");
    if(flg === "block"){
      pictune.style.setProperty("display","none","");
    }
    else{
      pictune.style.setProperty("display","block","");
    }
  };

  $$.prototype.viewPicture = function(){
    var pictune = document.getElementById("pictune");
    if(pictune === null){
      $$.prototype.setPicture
    }
  };

  $$.prototype.clickImg = function(e){
    var target  = e.target;
    var viewPath;
    if(target.getAttribute("data-pictune") !== null){
      viewPath = target.getAttribute("data-pictune-src");
    }
    if(target.parentNode && target.parentNode.tagName === "A"){
      target.parentNode.href = "javascript:void(0)";
      if(target.parentNode.getAttribute("data-pictune") !== null){
        viewPath = target.parentNode.getAttribute("data-pictune-src");
      }
    }
    else{
      return;
    }
    // 画像表示
    var img = document.querySelector("#pictune img");
    img.src = viewPath;
    $$.prototype.adjustSize();
    $$.prototype.viewToggle();
    if(typeof $$.prototype.options !== "undefined"
    && typeof $$.prototype.options.click !== "undefined"){
      $$.prototype.options.click(target);
    }
  };

  // window.onscroll || window.onresize
  $$.prototype.adjustSize = function(){

    var maxWidth  = 0.9;  // 90%
    var maxheight = 0.7; // 70%

    // base
    var pictune = document.getElementById("pictune");

    var picture = pictune.querySelector(".pictune-area img.picture");
    if(picture){
      var w    = (window.innerWidth  * maxWidth);
      var h    = (window.innerHeight * maxheight)
      picture.style.setProperty("max-width"    , w + "px" , "");
      picture.style.setProperty("max-height"   , h + "px" , "");
    }
  };

  $$.prototype.setCustom = function(options){
    // console.log(JSON.stringify(options));
    if(typeof options.func !== "undefined"){
      options.func();
    }
  };

  /**********
	//style値を取得
	概要：対象項目のCSS値を取得
	param:element  対象項目
	**********/
	$$.prototype.getStyle=function(e,s){
		if(!s){return}
		//対象項目チェック;
		if(typeof(e)=='undefined' || e==null || !e){
			e = $b;
		}
		//属性チェック;
		var d='';
		if(typeof(e.currentStyle)!='undefined'){
			d = e.currentStyle[$$.prototype.camelize(s)];
			if(d=='medium'){
				d = "0";
			}
		}
		else if(typeof(document.defaultView)!='undefined'){
			d = document.defaultView.getComputedStyle(e,'').getPropertyValue(s);
		}
		return d;
	};

	//ハイフン区切りを大文字に変換する。
	$$.prototype.camelize = function(v){
		if(typeof(v)!='string'){return}
		return v.replace(/-([a-z])/g , function(m){return m.charAt(1).toUpperCase();});
	};

  $$.prototype.setEvent = function(target, mode, func){
		if (target.addEventListener){target.addEventListener(mode, func, false)}
		else{target.attachEvent('on' + mode, function(){func.call(target , window.event)})}
	};
  new $$;

  window.$$PICTUNE = $$;
})();

/**
# 起動処理
*/
// ;(function(){
//   $$PICTUNE.setEvent(window,"load",$$PICTUNE.start);
//   new
// })();
