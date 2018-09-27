$(function() {
	//后台首页js


	//加载首页数据
	function loadPhoto() {
		$.ajax({
			type : "POST",
			url: "loadPhoto",
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

			return '<tr photo_id=' + data.id + '>' +
				'<th scope="row">' + index + '</th>' +
				'<td>' + data.scr + '</td>' +
				'<td>' + data.name + '</td>' +
				'<td>' + data.scTime + '</td>' +
				'<td>' + data.wjdx + '</td>' +
				'<td>'+ '<button type="button" class="btn btn-primary photo_detail">详情</button>' +
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

		$(".photo_detail").unbind().click(function() {
			var id = $(this).parents("tr").attr("photo_id");
            window.location.href = "showphoto?id="+id;
		//	window.location.href = "addmodel?tag_id=" + id;

		});
	}

	loadPhoto();
})