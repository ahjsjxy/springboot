<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>环境采集工具</title>

	<script src="${ctx!}/static/Build/UnityLoader.js"></script>
	<script>
		var gameInstance = UnityLoader.instantiate("gameContainer", "../../static/Build/WB.json");
		//if(id==""){}else{gameInstance.SendMessage("GoName","MyFunc","G");}
	</script>
	<script type="text/javascript">

		function Request(strName){
			var strHref = location.href;
			var intPos = strHref.indexOf("?");
			var strRight = strHref.substr(intPos + 1);
			var arrTmp = strRight.split("&");
			for(var i = 0; i < arrTmp.length; i++) {
				var arrTemp = arrTmp[i].split("=");
				if(arrTemp[0].toUpperCase() == strName.toUpperCase())
					return arrTemp[1];
			}
			return "";
		}
			// 初始化内容

			var idA = "${hostStr}photoFiles/${ids}/";

		//var idA=Request("id");




		// "http://127.0.0.1:8080/hjcj-tool/photoFiles/20180816/";
//http://localhost:8088//seckill/photoFiles/20180816/
		//http://127.0.0.1:8088/hjcj-tool/photoFiles/20180816/
		function ToVideo(VURL){
			window.open("${ctx!}/admin/photo/video?id=" + VURL);
		}

		function Toaudio(AURL){
			window.open("${ctx!}/admin/photo/audio?id=" + AURL);
		}

		function test() {
			gameInstance.SendMessage("GoName","MyFunc",idA);
		}
	</script>
</head>
<body>
<div id="gameContainer" style="width: width*2; height:height*2; margin: 0"></div>
</body>
</html>