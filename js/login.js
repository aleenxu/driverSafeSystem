// 登录页的记住我对勾切换
$(".right-login .qiehuan").addClass('bg3'); // 初始化时添加背景
$(".form-login .checkbox").click(function () {
    $(".right-login .qiehuan").toggleClass('bg3').toggleClass('bg4');
});

// 账号密码登录
$(function(){
    $("#btnLogin").on("click",function(){
        if($("#userInt").val()==="admin" && $("#pwdInt").val()==="123456"){
            location.href="home.html";
        }else{
            $.myAlert({
                title:"温馨提示",
                message:"用户名或密码错误!",
                callback:function(){
                    location.reload();
                }
            });
        }
    });
});