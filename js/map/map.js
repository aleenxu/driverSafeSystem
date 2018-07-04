$(function(){
    // 日期控件
    if($.fn.datetimepicker){
        $(".form-date input").datetimepicker({
            language: 'zh-CN',//国际化语言种类
            format: "yyyy-mm-dd hh:ii",//格式
            weekStart: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 1,
            minView:0,
            forceParse: 0,
            pickerPosition:'top-right' // 上面右侧
        }).on('changeDate', function(ev){
            var $t = $($(ev.target).attr("date-relative"));
            console.log($t);
            if($t.size()>0){
                $t.datetimepicker('setStartDate', ev.date);
                if(ev.date>$t.datetimepicker('getDate')){
                    $($t).val("");
                }
            }
        });

    }     
    // 轨迹回放
    /*$(".trackTeplay").on("click",function(){
        $(".trackTeplayBox").removeClass("dn bounceOutDown").addClass("bounceInUp");
    })*/
    // 右边栏显示与隐藏
    $(".dir-arrow").on("click",function(){
        if($(this).hasClass("t-hide")){
            $(this).removeClass("t-hide").addClass("t-show");
            $(this).parent().addClass("dir-width");
            $(this).next().addClass("dir-hidden");
        }else{
            $(this).removeClass("t-show").addClass("t-hide");
            $(this).parent().removeClass("dir-width");
            $(this).next().removeClass("dir-hidden");
        }
        
    });
    // 加减 显示与隐藏
    $(".dir-scroll h5").on("click",function(){
        $(this).toggleClass("tag-reduce").next().toggleClass("dn fadeInUp");
    });
    // checkbox 选中
    // var checkLength = $("#Personnel label s").length; //共有个数
    // 重 轻 正常
    function checkMore(dom,mine,clazz){
        var isTrue = mine.find("s").toggleClass("checked").hasClass("checked");
        if(isTrue){
            $(dom+" label"+clazz+" s").not(".checked").trigger("click");
            mine.next().prop("checked",true);
        }else{
            $(dom+" label"+clazz+" s").trigger("click");
            mine.next().prop("checked",false);
        }
    }
    // 人员checkBox
    var cPinkLength = $("#Personnel label.col-pink s").length; //重度 共有个数
    var cOrangeLength = $("#Personnel label.col-orange s").length; //轻度 共有个数
    var cNormalLength = $("#Personnel label.col-normal s").length; //正常 共有个数
    function peopleCheckBox(self){
        // $(".dir-check-con label.col-pink")
        var isChecked = self.find("s").toggleClass("checked").hasClass("checked");//是否选中
        // var checkedLength = $("#Personnel s.checked").length; //全选 选中个数
        var pinkLength = $("#Personnel .col-pink s.checked").length; //重度 选中个数
        var orangeLength = $("#Personnel .col-orange s.checked").length; //轻度 选中个数
        var normalLength = $("#Personnel .col-normal s.checked").length; //正常 选中个数
        isChecked?self.find("s").next().prop("checked",true):self.find("s").next().prop("checked",false);
        if(cPinkLength == pinkLength){
            $("#dir-people label.col-pink s").addClass("checked").next().prop("checked",true);
        }else{
            $("#dir-people label.col-pink s").removeClass("checked").next().prop("checked",false);
        }
        if(cOrangeLength == orangeLength){
            $("#dir-people label.col-orange s").addClass("checked").next().prop("checked",true);
        }else{
            $("#dir-people label.col-orange s").removeClass("checked").next().prop("checked",false);
        }
        if(cNormalLength == normalLength){
            $("#dir-people label.col-normal s").addClass("checked").next().prop("checked",true);
        }else{
            $("#dir-people label.col-normal s").removeClass("checked").next().prop("checked",false);
        }
    }
    $("#Personnel label").on("click",function(){
        peopleCheckBox($(this));
        refreshPoint();
        return false;
    });
    
    // checkbox 重度
    $("#dir-people label.col-pink").on("click",function(){
        checkMore("#Personnel",$(this),".col-pink");
        return false;
    });
    // checkbox 轻度
    $("#dir-people label.col-orange").on("click",function(){
        checkMore("#Personnel",$(this),".col-orange");
        return false;
    });
    // checkbox 正常
    $("#dir-people label.col-normal").on("click",function(){
        checkMore("#Personnel",$(this),".col-normal");
        return false;
    });
    // checkbox 全选Personnel
    $("#checkPeopleAll").on("click",function(){
        $(".tab-content #one label s").addClass("checked").next().prop("checked",true);
        refreshPoint();
    });
    // checkbox 取消全选Personnel
    $("#noPeopleCheck").on("click",function(){
        $(".tab-content #one label s").removeClass("checked").next().prop("checked",false);
        refreshPoint();
    });

    // 车辆checkBox
    var vPinkLength = $("#Vehicle label.col-pink s").length; //重度 共有个数
    var vOrangeLength = $("#Vehicle label.col-green s").length; //轻度 共有个数
    var vNormalLength = $("#Vehicle label.col-normal s").length; //正常 共有个数
    function carCheckBox(self){
        // $(".dir-check-con label.col-pink")
        var isChecked = self.find("s").toggleClass("checked").hasClass("checked");//是否选中
        // var checkedLength = $("#Personnel s.checked").length; //全选 选中个数
        var pinkLength = $("#Vehicle .col-pink s.checked").length; //重度 选中个数
        var orangeLength = $("#Vehicle .col-green s.checked").length; //轻度 选中个数
        var normalLength = $("#Vehicle .col-normal s.checked").length; //正常 选中个数
        isChecked?self.find("s").next().prop("checked",true):self.find("s").next().prop("checked",false);
        if(vPinkLength == pinkLength){
            $("#dir-car label.col-pink s").addClass("checked").next().prop("checked",true);
        }else{
            $("#dir-car label.col-pink s").removeClass("checked").next().prop("checked",false);
        }
        if(vOrangeLength == orangeLength){
            $("#dir-car label.col-green s").addClass("checked").next().prop("checked",true);
        }else{
            $("#dir-car label.col-green s").removeClass("checked").next().prop("checked",false);
        }
        if(vNormalLength == normalLength){
            $("#dir-car label.col-normal s").addClass("checked").next().prop("checked",true);
        }else{
            $("#dir-car label.col-normal s").removeClass("checked").next().prop("checked",false);
        }
    }
    $("#Vehicle label").on("click",function(){
        carCheckBox($(this));
        refreshPoint();
        return false;
    });
    
    // checkbox 重度
    $("#dir-car label.col-pink").on("click",function(){
        checkMore("#Vehicle",$(this),".col-pink");
        return false;
    });
    // checkbox 轻度
    $("#dir-car label.col-green").on("click",function(){
        checkMore("#Vehicle",$(this),".col-green");
        return false;
    });
    // checkbox 正常
    $("#dir-car label.col-normal").on("click",function(){
        checkMore("#Vehicle",$(this),".col-normal");
        return false;
    });
    // checkbox 全选Vehicle
    $("#checkCarAll").on("click",function(){
        $(".tab-content #two label s").addClass("checked").next().prop("checked",true);
        refreshPoint();
    });
    // checkbox 取消全选Vehicle
    $("#noCarCheck").on("click",function(){
        $(".tab-content #two label s").removeClass("checked").next().prop("checked",false);
        refreshPoint();
    });
});