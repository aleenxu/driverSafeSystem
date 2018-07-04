// 时间
function showTime() { 
    var now = new Date(); 
    var nowTime = now.toLocaleString(); 
    var year = now.getFullYear();//年
    var month = now.getMonth()+1;//月
    var dates = now.getDate();//日
    var week = now.getDay(); //星期 
    var hour = now.getHours(); //小时 
    var minutes = now.getMinutes(); //分 
    var seconds = now.getSeconds(); //秒
    //判断星期几 
    var weeks = ["日","一","二","三","四","五","六"]; 
    var getWeek = "星期" + weeks[week]; 
    var sc; 
    //判断是AM or PM 
    if(hour >= 0 && hour < 5){ 
        sc = '凌晨'; 
    } 
    else if(hour > 5 && hour <= 7){ 
        sc = '早上'; 
    } 
    else if(hour > 7 && hour <= 11){ 
        sc = '上午'; 
    } 
    else if(hour > 11 && hour <= 13){ 
        sc = '中午'; 
    } 
    else if(hour> 13 && hour <= 18){ 
        sc = '下午'; 
    } 
    else if(hour > 18 && hour <= 23){ 
        sc = '晚上'; 
    }
    hour<10?hour="0"+hour:hour=hour;
    minutes<10?minutes="0"+minutes:minutes=minutes;
    seconds<10?seconds="0"+seconds:seconds=seconds;
    document.getElementById('time').innerHTML =year+"年"+month+"月"+dates+"日"+"&nbsp;&nbsp;&nbsp;&nbsp;"+sc+hour+":"+minutes+":"+seconds+"&nbsp;&nbsp;&nbsp;&nbsp;"+ getWeek;
    setTimeout('showTime()',1000); 
}
$(function(){
    // 显示时间  
    showTime();
    // 头部下拉
    $(".selectDl a").on("click",function(e){
        e.stopPropagation();
        $(this).next().toggleClass("dn").siblings("dl").addClass("dn");
    });
    $(".selectDl dl dt a").on("click",function(e){
        e.stopPropagation();
        $(this).parents("dl").toggleClass("dn");
    });
    // 文档点击事件
    $(document).on("click",function(){
        $(".selectDl a").next().addClass("dn");
    });
    $(".tagClose").on("click",function(){
        var _this = $(this);
        $(this).parent().removeClass("bounceInUp").addClass("bounceOutDown");
        setTimeout(function(){
            _this.parent().addClass("dn");
        },500);
    });
    // 退出登录
    $(".dir-header-r .dir-info i").on("click",function(){
        $.myAlert({
            title:"温馨提示",
            message:"确定要退出吗？",
            callback:function(){
                location.href="login.html";
            }
        });
    });
});
