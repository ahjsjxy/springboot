<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <title>用户列表</title>
    <meta name="keywords" content="">
    <meta name="description" content="">

    <link rel="shortcut icon" href="favicon.ico">
    <link href="${ctx!}/static/assets/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx!}/static/assets/css/font-awesome.css?v=4.4.0" rel="stylesheet">

    <link href="${ctx!}/static/assets/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">

    <link href="${ctx!}/static/assets/css/animate.css" rel="stylesheet">
    <link href="${ctx!}/static/assets/css/style.css?v=4.1.0" rel="stylesheet">


</head>

<body class="gray-bg">
<div class="wrapper wrapper-content  animated fadeInRight">

    <div class="main-content add">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div style="display: flex;margin-bottom: 20px;">
                        <button type="button" id="" class="btn btn-light btn-sm obj-up">
                            <i class="fa fa-upload" aria-hidden="true"></i>&nbsp;导入Photo文件
                            <form id="upload" action="#" enctype="multipart/form-data">
                                <input id="uploadObj" type="file" name="file">
                            </form>
                            <span class="result" style="display:none"> <i
                                    class="fa fa-tag"></i> <span
                                    class="ant-upload-list-item-name file_name" title="bg.png"></span>
									</span>
                        </button>
                        <#--<div class="form-group">-->
                        <div class="col-sm-8">
                            <label <#--class="col-sm-6 control-label"-->>描述：</label>

                                <input id="descriptionL" name="descriptionL" class="form-control" >
                            </div>
                        <#--</div>-->
                     <@shiro.hasPermission name="system:photo:upload">
                          <button type="button" id="submit-mode"
                                class="btn btn-primary create">
                            <i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;&nbsp;上&nbsp;传
                        </button>
                     </@shiro.hasPermission>
                    </div>
                </div>


            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>文件详细列表</h5>
                </div>
                <div class="ibox-content">
                    <#--<p>
                        	<@shiro.hasPermission name="system:user:add">
                                <button class="btn btn-success " type="button" onclick="add();"><i class="fa fa-plus"></i>&nbsp;添加</button>
                            </@shiro.hasPermission>
                    </p>-->
                    <hr>
                    <div class="row row-lg">
                        <div class="col-sm-12">
                            <!-- Example Card View -->
                            <div class="example-wrap">
                                <div class="example">
                                    <table id="table_list"></table>
                                </div>
                            </div>
                            <!-- End Example Card View -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 全局js -->
<script src="${ctx!}/static/assets/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx!}/static/assets/js/bootstrap.min.js?v=3.3.6"></script>

<!-- Bootstrap table -->
<script src="${ctx!}/static/assets/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="${ctx!}/static/assets/js/plugins/bootstrap-table/bootstrap-table-mobile.min.js"></script>
<script src="${ctx!}/static/assets/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>

<!-- Peity -->
<script src="${ctx!}/static/assets/js/plugins/peity/jquery.peity.min.js"></script>

<script src="${ctx!}/static/assets/js/plugins/layer/layer.min.js"></script>

<!-- 自定义js -->
<script src="${ctx!}/static/assets/js/content.js?v=1.0.0"></script>

<!-- Page-Level Scripts -->
<script>
    $(document).ready(function () {
        //初始化表格,动态从服务器加载数据
        $("#table_list").bootstrapTable({
            //使用get请求到服务器获取数据
            method: "POST",
            //必须设置，不然request.getParameter获取不到请求参数
            contentType: "application/x-www-form-urlencoded",
            //获取数据的Servlet地址
            url: "${ctx!}/admin/photo/list",
            //表格显示条纹
            striped: true,
            //启动分页
            pagination: true,
            //每页显示的记录数
            pageSize: 10,
            //当前第几页
            pageNumber: 1,
            //记录数可选列表
            pageList: [5, 10, 15, 20, 25],
            //是否启用查询
            search: true,
            //是否启用详细信息视图
            detailView:true,
            detailFormatter:detailFormatter,
            //表示服务端请求
            sidePagination: "server",
            //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
            //设置为limit可以获取limit, offset, search, sort, order
            queryParamsType: "undefined",
            //json数据解析
            responseHandler: function(res) {
                return {
                    "rows": res.content,
                    "total": res.totalElements
                };
            },
            //数据列
            columns: [{
                title: "ID",
                field: "id",
                sortable: true
            },{
                title: "上传者",
                field: "uploadMan"
            },{
                title: "文件名",
                field: "originName"
            },{
                title: "上传时间",
                field: "uploadTime"
            },{
                title: "文件大小",
                field: "fileSize"
            },{
                title: "操作",
                field: "empty",
                formatter: function (value, row, index) {
                    var operateHtml = '<@shiro.hasPermission name="system:photo:detail"><button class="btn btn-primary btn-xs" type="button" onclick="detail(\''+row.id+'\')"><i class="fa fa-edit"></i>&nbsp;详情</button> &nbsp;</@shiro.hasPermission>';
                    <#--operateHtml = operateHtml + '<@shiro.hasPermission name="system:user:deleteBatch"><button class="btn btn-danger btn-xs" type="button" onclick="del(\''+row.id+'\')"><i class="fa fa-remove"></i>&nbsp;删除</button> &nbsp;</@shiro.hasPermission>';-->
                    <#--operateHtml = operateHtml + '<@shiro.hasPermission name="system:user:grant"><button class="btn btn-info btn-xs" type="button" onclick="grant(\''+row.id+'\')"><i class="fa fa-arrows"></i>&nbsp;关联角色</button></@shiro.hasPermission>';-->
                    return operateHtml;
                }
            }]
        });
    });

    function detail(id){

            window.location.href = "/base/admin/photo/detail?id="+id;
            //	window.location.href = "addmodel?tag_id=" + id;


    }

   /* function del(id){
        layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "${ctx!}/admin/user/delete/" + id,
                success: function(msg){
                    layer.msg(msg.message, {time: 2000},function(){
                        $('#table_list').bootstrapTable("refresh");
                        layer.close(index);
                    });
                }
            });
        });
    }*/

    function detailFormatter(index, row) {
        var html = [];
        html.push('<p><b>描述:</b> ' + row.description + '</p>');
        return html.join('');
    }




    $("#submit-mode").unbind().click(function() {
        var uploadObj = $("#uploadObj").val();
        if (uploadObj.indexOf(".Photo") > 0) {
        } else {
            layer.msg("请选择Photo格式的文件", {
                icon : 2
            })
            return false;
        }
        savePic(uploadObj);
    });

    function savePic(uploadObj) {
        var ajaxUploadUrl = "${ctx!}/admin/photo/upload";
        var ajaxUploadInfo = "${ctx!}/admin/photo/savephotoinfo";
        var formData = [new FormData($("#upload")[0])];
        var index = 1;
        sendFile(0);

        function sendFile(index) {
            var originName = "";
            var realName = "";
            $.ajax({
                type: "POST",
                url: ajaxUploadUrl,
                data: formData[index],
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    var jsonObj = eval("(" + data + ")");
                    originName = jsonObj[0].originName;
                    realName = jsonObj[0].realName;
                    submitValue(originName, realName);
                },
                error: function (data) {
                    console.log("error:" + data.responseText);
                }
            });

        };
        function submitValue(originName, realName) {
            var l_size = $("#uploadObj")[0].files[0].size;
            var l_size = Math.ceil(l_size/1024)+"KB";
            var des = $("#descriptionL").val();
            $.ajax({
                type : "POST",
                url : ajaxUploadInfo,
                data : {
                    description : des,
                    l_size      : l_size,
                    originName  : originName,
                    realName    : realName
                },
                async : false,
                cache : false,
                contentType : "application/x-www-form-urlencoded",
                success: function(data){
                    var jsonObj = eval("(" + data + ")");
                    var msgL = jsonObj[0].message;
                    layer.msg(msgL, {time: 2000},function(){
                        $("#descriptionL").val("");
                        $("#uploadObj").val("");
                        $('#table_list').bootstrapTable("refresh");
                    });
                },

                error : function(data) {
                    console.log("error:" + data.responseText);
                }
            });
        }

    }
</script>




</body>

</html>
