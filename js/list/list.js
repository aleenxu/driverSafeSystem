
$(function () {
    // 页签导航颜色切换
    $(".top-banner button").click(function () {
        $(this).css("background-color", "#E92802").siblings().css("background-color", "#3A6DFF");
    });
    // 隐藏浮层函数
    var hidePop = function(){
        var _this = $(this);
        $(this).parent().removeClass("fadeIn").addClass("zoomOut");
        if($(this).parents(".pop-sys-box").length>0){
            $(this).parents(".pop-sys-box").removeClass("fadeIn dn").addClass("fadeOut");
            setTimeout(function(){
                $(".pop-sys-box").addClass("dn");
            },500);
        }else{
            $(this).parents(".pop-daoru-box").removeClass("fadeIn dn").addClass("fadeOut");
            setTimeout(function(){
                $(".pop-daoru-box").addClass("dn");
            },500);
        }
        
    };
    // 列表关闭
    $(".pop-sys-box #tagClose").on("click",hidePop);
    $(".pop-daoru-box #tagClose").on("click",hidePop);
    // 显示浮层函数
    var showPop = function(fatherDiv){
        fatherDiv.removeClass("fadeOut dn").addClass("fadeIn");
        $(".pop-info").removeClass("zoomOut dn").addClass("zoomIn");
    };
    // 添加
    $("#btnAdd").on("click",function(){
        showPop($(".pop-sys-box"));
        $("#userText").text("添加");
    });
    // 删除
    $("#btnDel").on("click",function(){
        $.myAlert({
            title:"温馨提示",
            message:"确实要删除该条数据吗?",
            callback:function(){
                location.reload();
            }
        });
    });
    // 编辑、重置密码
    $(".operation-btn").on("click",function(){
        if($(this).text() == "编辑"){
            showPop($(".pop-sys-box"));
            $("#userText").text("编辑");
        }else if($(this).text() == "重置密码"){
            $.myAlert({
                title:"温馨提示",
                message:"确实要给该用户重置密码吗?<br/>重置密码，密码默认为：123456",
                callback:function(){
                    location.reload();
                }
            });
        }else if($(this).text() == "清除日志"){
            $.myAlert({
                title:"温馨提示",
                message:"确实要清除日志吗?",
                callback:function(){
                    location.reload();
                }
            });
            
        }
        return false;
    });
    // 导出
    $(".daochu").on("click",function(){
        $.myAlert({
            title:"温馨提示",
            message:"确定导出该数据吗?",
            callback:function(){
                location.reload();
            }
        });
    });

    // 导入
    $(".daoru").on("click",function(){
        showPop($(".pop-daoru-box"));
    });


    // 列表全选
    var check = $(".tab-sys tbody input[type='checkbox']"); // 总数量
    $("#checkAll").on("click",function(){
        if($(this).prop("checked")){
            $(this).prop("checked",true);
            check.addClass("checked").prop("checked",true);
        }else{
            $(this).prop("checked",false);
            check.removeClass("checked").prop("checked",false);
        }
    });
    // check单选
    $(".tab-sys tbody tr td input[type='checkbox']").on("click",function(){
        if(!$(this).prop("checked")){
            $(this).prop("checked",true);
        }else{
            $(this).prop("checked",false);
        }
    });
    $(".tab-sys tbody tr").on("click",function(){
        var checkedLength = $(".tab-sys tbody").find(".checked").length;
        if(!$(this).find("td:first-child input").prop("checked")){
            $(this).find("td:first-child input").addClass("checked").prop("checked",true);
            checkedLength+=1;
            (checkedLength == check.length)?$("#checkAll").prop("checked",true):$("#checkAll").prop("checked",false);
        }else{
            $(this).find("td:first-child input").removeClass("checked").prop("checked",false);
            checkedLength-=1;
            (checkedLength == check.length)?$("#checkAll").prop("checked",true):$("#checkAll").prop("checked",false);
        }
    })
    // 提交和取消
    $(".tab-info tbody tr td.text-center input[type='button']").on("click",hidePop);
    $("#daoru-button input").on("click",function(){
        debugger
       $(".pop-layer").removeClass("fadeOut dn");
        setTimeout(function(){
            $(".pop-layer").addClass("fadeOut");
            $.myAlert({
                title:"导入提示",
                message:"导入成功",
                callback:function(){
                    location.reload();
                }
            });
        },2000);
    });
})

//切换复选框背景
//故障复选框
$(".left-checkbox .guzhang").addClass('bg1'); // 初始化时添加背景
$(".left-checkbox .l-guzhang").click(function () {
    $(".left-checkbox .guzhang").toggleClass('bg1').toggleClass('bg2');
});

//停运复选框
$(".left-checkbox .tingyun").addClass('bg3'); // 初始化时添加背景
$(".left-checkbox .l-tingyun").click(function () {
    $(".left-checkbox .tingyun").toggleClass('bg3').toggleClass('bg4');
});
//正常复选框
$(".left-checkbox .zhengchang").addClass('bg5'); // 初始化时添加背景1
$(".left-checkbox .l-zhengchang").click(function () {
    $(".left-checkbox .zhengchang").toggleClass('bg5').toggleClass('bg6');
});
