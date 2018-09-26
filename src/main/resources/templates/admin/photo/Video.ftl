<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>视频播放器</title>
  </head>
    <!DOCTYPE html>
<body>
</body>
<video style="width: 100%;height: 100%;" id="video" webkit-playsinline="true" preload="auto" controls="controls">
<source id="videoSource" src="${id}"  type="video/mp4">
您的浏览器不支持该视频格式。
</video>
  <script src="${ctx!}/static/assets/js/jquery.min.js?v=2.1.4"></script>
  <script src="${ctx!}/static/assets/js/bootstrap.min.js?v=3.3.6"></script>

  <!-- 自定义js -->
  <script src="${ctx!}/static/assets/js/content.js?v=1.0.0"></script>

  <!-- jQuery Validation plugin javascript-->
  <script src="${ctx!}/static/assets/js/plugins/validate/jquery.validate.min.js"></script>
  <script src="${ctx!}/static/assets/js/plugins/validate/messages_zh.min.js"></script>
  <script src="${ctx!}/static/assets/js/plugins/layer/layer.min.js"></script>
  <script src="${ctx!}/static/assets/js/plugins/layer/laydate/laydate.js"></script>

	 <script type="text/javascript">
	 
	function Request(strName){ 
		var strHref = location.href; 
		var intPos = strHref.indexOf("?"); 
		var strRight = strHref.substr(intPos + 1); 
		var arrTmp = strRight.split("&"); 
		for(var i = 0; i < arrTmp.length; i++) { 
		var arrTemp = arrTmp[i].split("="); 
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1]; 
		} 
		return ""; 
		}
		
	var idA=${id};
	function videoPlay(videoplayurl){
	var _videoPlay   = document.getElementById("video");
	var _videoSource = document.getElementById("video");
	_videoSource.src = videoplayurl;
	_videoPlay.play();
	 }
	videoPlay(idA);
	function video_loading( $video ){
     $('.video_loading').show();
	var timer = setInterval(function(){
            var currentTime = $video[0].currentTime; // 检测当前的播放时间
 
            if( currentTime>0 ){
                $('.video_loading').hide();
                clearInterval( timer );
            }
        }, 100)
    }
</script>
</html>