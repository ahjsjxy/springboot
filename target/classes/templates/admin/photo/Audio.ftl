<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>音频播放器</title>
</head>
<audio class="skPlayer-source"  controls="controls" preload="auto"><source src="" type="audio/mpeg"></audio>
<script src="https://cdnjs.cat.net/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script>
//    function Request(strName){
//        var strHref = location.href;
//        var intPos = strHref.indexOf("?");
//        var strRight = strHref.substr(intPos + 1);
//        var arrTmp = strRight.split("&");
//        for(var i = 0; i < arrTmp.length; i++) {
//            var arrTemp = arrTmp[i].split("=");
//            if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
//        }
//        return "";
//    }
    var idA=${id};

    var audio = document.getElementsByTagName('audio')[0];
    var source = document.getElementsByTagName('source')[0];


    function ppp(){

        source.src=idA;
        audio.src = idA;
        //console.log(idA);
        audio.play();
    }

    ppp();

</script>

</html>