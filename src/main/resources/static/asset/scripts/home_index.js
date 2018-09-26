$(function() {
	//后台首页js
	addEvenlister();

	function addEvenlister() {
		$(".saveModeType").click(function() {
			var type = $.trim($("#_gltype").val());
			if (type.length <= 0) {
				$("#_msg").text("类型不能为空！");
				return false;
			} else {
				saveModeType(type);
			}
		});

		var delet_type;
		$('#del-confirm-model').on('show.bs.modal', function(e) {
			delet_type = $("#_select_guoluType").find("option:selected").text();
			$("#deleType_msg").text("确认删除'" + delet_type + "'吗");
		})

		$("#delete_type").click(function() {
			deleteModeType(delet_type);
		});
	}

	function deleteModeType(type) {
		$.ajax({
			type : "POST",
			url : "deleteModeType",
			data : {
				_type : type,
			},
			async : false,
			cache : false,
			contentType : "application/x-www-form-urlencoded",
			success : function(data) {
				if (data == '1000') {
					$('#del-confirm-model').modal('hide');
					$("#_select_guoluType").find("option:selected").remove();
				}
			},
			error : function(data) {
				console.log("error:" + data.responseText);
			}
		});
	}

	function saveModeType(type) {
		$.ajax({
			type : "POST",
			url : "saveModeType",
			data : {
				_type : type,
			},
			async : false,
			cache : false,
			contentType : "application/x-www-form-urlencoded",
			success : function(data) {
				if (data == "_10001") {
					$("#_msg").text("类型已存在！");
				} else {
					$("#_select_guoluType").append("<option value=" + type + ">" + type + "</option>");
					$('#newModal').modal('hide')
				}
			},
			error : function(data) {
				console.log("error:" + data.responseText);
			}
		});
	}

	//加载首页数据
	function loadMode() {
		$.ajax({
			type : "POST",
			url : "loadModel",
			async : false,
			cache : false,
			contentType : "application/x-www-form-urlencoded",
			success : function(data) {
				var res = JSON.parse(data);
				var count = res.length;
				var fenLen = 3
				var htmls = [];
				res.reverse();
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
							    addEvenlister_mode();

							}
						});

					});
				}

			},
			error : function(data) {
				console.log("error:" + data.responseText);
			}
		});

		function addEvenlister_mode() {
			$(".mode_watch").unbind().click(function() {
				//查看
				var id = $(this).parents("tr").attr("mode_id");
				window.location.href = "../page/_detail?tag_id=" + id;
			});
			$(".mode_update").unbind().click(function() {
				//修改
				var id = $(this).parents("tr").attr("mode_id");
				window.location.href = "addmodel?tag_id=" + id;
			});
			$(".mode_delete").unbind().click(function() {
				//删除
				var id = $(this).parents("tr").attr("mode_id");
				if (confirm("确认删除吗")) {
					$.ajax({
						type : "POST",
						url : "deleteMode",
						data : {
							_id : id,
						},
						async : false,
						cache : false,
						contentType : "application/x-www-form-urlencoded",
						success : function(data) {
							loadMode();
						},
						error : function(data) {
							console.log("error:" + data.responseText);
						}
					});

				} else {
					return;
				}
			});
		}

		function getHtmlModel(data, index) {
			return  '<tr mode_id=' + data.id + '>' +
			'<th scope="row">' + index + '</th>' +
			'<td>' + data.name + '</td>' +
			'<td><img src="/seckill/uploadFiles/' + data.fenmian + '" alt="" style="width: 40px;height:40px;"></td>' +
			'<td>' + data.type + '</td>' +
			'<td>&nbsp;</td>' +
			'<td><button type="button" class="btn btn-light mode_watch " >查看</button>' +
			'<button type="button" class="btn btn-primary mode_update"   >修改</button>' +
			'<button type="button" class="btn btn-danger mode_delete"  >删除</button></td></tr>'
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



	//加载首页案例数据
	/*function loadCase() {
		$.ajax({
			type : "POST",
			url : "loadCase",
			async : false,
			cache : false,
			success : function(data) {
				var res = JSON.parse(data);
				var count = res.length;
				var fenLen = 3
				var htmls = [];
				//res.reverse();
				res.map(function(item, index) {
					htmls.push(getHtmlModel(item, index));
				});
				if (htmls.length <= 0) {
					$("#case_contrent").html("暂无数据！");
				} else {
					layui.use([ 'layedit', 'table', 'form', 'laypage' ], function() {
						var layedit = layui.layedit;
						layedit.build('editor'); //建立编辑器
						var laypage = layui.laypage;
						laypage.render({
							elem : 'page2',
							count : count,
							limit : fenLen,
							layout : [ 'count', 'prev', 'page', 'next', 'skip' ],
							jump : function(obj, first) {
								//首次不执行
								if (!first) {
									$("#case_contrent").html(gethtml(htmls, obj.curr, fenLen));
								} else {
									$("#case_contrent").html(gethtml(htmls, 1, fenLen));
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

		function addEvenlister_case() {
			$(".case_watch").unbind().click(function() {
				//查看
				var id = $(this).parents("tr").attr("case_id");
				window.location.href = "../page/casedetail?tag_id=" + id;
			});
			$(".case_update").unbind().click(function() {
				//修改
				var id = $(this).parents("tr").attr("case_id");
				window.location.href = "case?tag_id=" + id;
			});
			$(".case_delete").unbind().click(function() {
				//删除
				var id = $(this).parents("tr").attr("case_id");
				if (confirm("确认删除吗")) {
					$.ajax({
						type : "POST",
						url : "deleteCase",
						data : {
							_id : id,
						},
						async : false,
						cache : false,
						contentType : "application/x-www-form-urlencoded",
						success : function(data) {
							loadCase()
						},
						error : function(data) {
							console.log("error:" + data.responseText);
						}
					});

				} else {
					return;
				}
			});
		}

		function getHtmlModel(data, index) {
				return  '<tr case_id='+data.id+'> <th scope="row">'+data.id+'</th>'+
				'<td>'+data.name+'</td> <td><img'+
					' src="/seckill/uploadFiles/'+data.img+'" alt=""'+
					'style="width: 40px;height:40px;"></td>'+
				'<td>'+data.type+'</td>'+
				'<td>'+data.tips+'</td>'+
				'<td>'+data.date+'</td>'+
				'<td>'+
					'<button type="button" class="btn btn-light case_watch">查看</button>'+
					'<button type="button" class="btn btn-primary case_update">修改</button>'+
					'<button type="button" class="btn btn-danger case_delete">删除</button>'+
				'</td>'+
			'</tr>';
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
*/

	loadMode();
	//loadCase()
})