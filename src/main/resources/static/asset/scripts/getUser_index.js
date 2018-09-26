$(function() {
	//后台首页js


	//加载首页数据
	function loadUser() {
		$.ajax({
			type : "POST",
			url : "loadUser",
			async : false,
			cache : false,
			contentType : "application/x-www-form-urlencoded",
			success : function(data) {
				var res = JSON.parse(data);
				res.reverse();
				var count = res.length;
				var fenLen = 10
				var htmls = [];
				res.map(function(item, index) {
					htmls.push(getHtmlModel(item, index));
				});
				if (htmls.length <= 0) {
					$("#listOfGuolu").html("暂无数据！");
				} else {
					layui.use([ 'layedit', 'table', 'form', 'laypage' ], function() {
						var laypage = layui.laypage;
						laypage.render({
							elem : 'page1',
							count : count,
							limit : fenLen,
							layout : [ 'count', 'prev', 'page', 'next', 'skip' ],
							jump : function(obj, first) {
								//首次不执行
								if (!first) {
									$("#listOfGuolu").html(gethtml(htmls, obj.curr, fenLen));
								} else {
									$("#listOfGuolu").html(gethtml(htmls, 1, fenLen));
								}
								addEvenlister_case();
							}
						});

					});
				}

			},
			error : function(data) {
				console.log("error:" + data.responseText);
			}
		});


		function getHtmlModel(data, index) {
			var phone = "";
			var e_mail = "";
			if (data.telephone != null) {
				phone = data.telephone
			}
			if (data.email != null) {
				e_mail = data.email
			}
			var role = "";
			switch (data.role){
				case '0':
					role ="管理员";
					break;
				case '1':
					role = "VIP用户";
					break;
				case '2':
					role = "普通用户";
					break;
			}

			return '<tr user_id=' + data.id + '>' +
				'<th scope="row">' + index + '</th>' +
				'<td>' + data.username + '</td>' +
				'<td>' + role + '</td>' +
				'<td>' + phone + '</td>' +
				'<td>' + e_mail + '</td>' +
				'<td> <button type="button" class="btn btn-primary user_update">修改</button>' +
				'<button type="button" class="btn btn-danger user_delete">删除</button>' +
				'</td></tr>'
		}

		function gethtml(html, cur, len) {
			var h = "";
			var be = (cur - 1) * len;
			var end = cur * len;
			for (var i = 0; i < html.length; i++) {
				if (i >= be && i < end) {
					h += html[i];
				}
			}
			return h;
		}

	}
	function refreshPage()
	{
		window.setTimeout(5000);
		window.location.reload();
	}
	function addEvenlister_case() {

		$(".user_update").unbind().click(function() {
			var id = $(this).parents("tr").attr("user_id");
			var _i = 1;
			var flag = 0;
			layer.open({
				type : 2,
				title : "修改用户",
				area : [ '1400px', '750px' ],
				fixed : false, //不固定
				maxmin : true,
				content : "editUser?tag_id=" + id,
				success : function(layero, index) {
					_i++;
					if (_i > 2) {
						flag =1;
						layer.msg("修改用户成功");
						layer.close(index) ;
						loadUser();
					}
				}
			});

		});

		$(".user_add").unbind().click(function() {
			var flag = 0;
			var _i = 1;
			layer.open({
				type : 2,
				title : "创建用户",
				area : [ '1400px', '750px' ],
				fixed : false, //不固定
				maxmin : true,
				content : "addUser",
				success : function(layero, index) {
					_i++;
					if (_i > 2) {
						layer.msg("创建用户成功");
						layer.close(index) ;
					}
					loadUser()
				}
			});

		});


		$(".user_delete").unbind().click(function() {
			//删除
			var id = $(this).parents("tr").attr("user_id");

			var str = "是否确认删除？";

			layer.confirm(str, {btn: ['确定', '取消'], title: "提示"}, function () {
				$.ajax({
					type : "POST",
					url : "deleteUser",
					data : {
						_id : id,
					},
					async : false,
					cache : false,
					contentType : "application/x-www-form-urlencoded",
					success : function(data) {
						if(data=='1000'){
							layer.msg('删除成功',{icon:1})
							loadUser()
						}else{
							layer.msg('删除失败',{icon:2})
						}
					},

				});
			});


		});
	}

	loadUser();
})