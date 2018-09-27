$(function() {
	var form = "";
	layui.use([ 'form' ], function() {
		form = layui.form;
		//监听指定开关
		form.on('switch(switchTest)', function(data) {
			var _type = "1";
			if (!this.checked) {
				_type = "0";
			}
			if (_type == "1") {
				layer.msg("打开审批！");
			} else {
				layer.msg("关闭审批！");
			}
			$.ajax({
				type : "POST",
				url : "../home/changeSwitch",
				data : {
					_type : _type
				}
			});
		});
	});
	layui.use(['form','upload'],function(data){
		var _type = "0";
		if(!this.isChecked()){
			_type = "1";
		}
		if(_type=="1"){
			layer.msg("你确定吗？");
		} else{
			layer.msg("ok，已经关闭");

		}
	})

	$.ajax({
		type : "POST",
		url : "../home/getSwitch",
		async : false,
		cache : false,
		contentType : "json",
		success : function(_data) {
			if (_data == "1") {
				$("#switchTest")[0].checked = true;
			} else {
				$("#switchTest")[0].checked = false;
			}
		},
		error : function(data) {
			console.log("error:" + data.responseText);
		}
	});
	var role = $("#role").val();
	if (role == '0' || role == '0') {
		$("#_adduser").show();
	}
})