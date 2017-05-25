/**
 * Created by admin on 2016/12/17.
 */
var price1 = [["6.80", "6.55", "6.15", "5.90"], ["4.70", "4.50", "4.25", "4.00"], ["4.80", "4.60", "4.35", "4.10"]];
$(function () {
    $(".open_light_window").on("click",function(e){
        e.preventDefault()

        $(".light_bg").fadeIn();

        $(".light_box").slideDown();
    })
    $(".close_box").on("click",function(e){
        e.preventDefault();

        $(".light_bg").fadeOut();

        $(".light_box").slideUp();
    })
    $(".open_light_window").trigger("click");
    setTimeout(function(){
        $(".close_box").trigger("click")
    },5000)
    //先出现默认利率
    dkllresult();
    //页面切换
    $("#tabs ul").find("li").each(function (index) {
        $(this).on("mouseover", function () {

            $(this).siblings().find("a").removeClass("current");

            $(this).find("a").addClass("current");

            $("#content>div").eq(index).fadeIn().siblings().stop().hide();
        });
    });
    //贷款利率计算
    var dkll = $(".xuanzhe input[name=tt]");
    var seclet = $("#daikuanll select[name=dkllseclet]");
    //1）贷款方式：商业、公积金、组合
    dkll.on("change", function () {
        dkllresult()
    });
    //2）贷款期数：
    seclet.on("change", function () {
        dkllresult()
    });
    //开始计算按钮
    $("#but .star").on("click", function () {
        var fngshi=$("#jisuan input[name=fs]:checked").val();

        var input = $("#jisuan input[type=number]").val();
        if(input.length == 0){
            return;
        }

        switch (fngshi){
            case "0":
                resultdkll();
                break;
            case "1":
                resultdklltwo();
                break;
        }


        return false;
    });
    //选择方式
    $("#jisuan .checktyp").on("click",function(){
        $(this).siblings("div").slideUp();
        $(this).next().next().slideDown();
    });
});
//贷款利率函数
function dkllresult() {
    var num1 = $(".xuanzhe input[name=tt]:checked").val();
    var num2 = $("#daikuanll select[name=dkllseclet]").find("option:selected").val();
    $("#daikuanll input[name=dkll]").val(price1[num1][num2]);
}
//计算贷款利率1
function resultdkll() {
    //获取单价
    var danjia = $(".jisuan1 input:first").val();
    //获取面积
    var mianji = $(".jisuan1 input:last").val();
    //按揭成数
    var anjiechengshu = $(".select select:first option:selected").val();//按揭年数
    //按揭年数
    var anjienianshu = $("#qishu select:first option:selected").val();
    //贷款利率
    var daikuanlilv = $("#daikuanll input:first").val();
    /*------------------------一下是计算各金额---------------------*/
    var daizong=danjia * mianji * anjiechengshu;
    //月利息
    var yuelx=(daikuanlilv/12)/100;
    //〔贷款本金×月利率×（1＋月利率）＾还款月数〕÷〔（1＋月利率）＾还款月数－1〕
    var yjhk=(daizong*yuelx*(Math.pow((1+yuelx),anjienianshu)))/(Math.pow((1+yuelx),anjienianshu)-1);
    //房款总额
    $("#right_box input[name=first]").val(parseInt(danjia * mianji));
    //贷款总额
    $("#right_box input[name=second]").val(danjia * mianji * anjiechengshu);
    //还款总额
    $("#right_box input[name=three]").val(yjhk*anjienianshu)
    //支付利息
    $("#right_box input[name=four]").val(yjhk*anjienianshu-daizong)
    //首期付款
    $("#right_box input[name=five]").val(danjia * mianji - daizong)
    //贷款月数
    $("#right_box input[name=six]").val(anjienianshu)
    //月均还款
    $("#right_box input[name=seven]").val((daizong*yuelx*(Math.pow(1+yuelx),anjienianshu))/((Math.pow(1+yuelx),anjienianshu)-1))

}
//计算贷款利率2
function resultdklltwo(){
    //获取贷款总额
    var dkze = $(".jisuan2 input:first").val()
    //按揭成数
    var anjiechengshu = $(".select select:first option:selected").val();//按揭年数
    //按揭年数
    var anjienianshu = $("#qishu select:first option:selected").val();
    //贷款利率
    var daikuanlilv = $("#daikuanll input:first").val();
    /*------------------------一下是计算各金额---------------------*/
    var yuelx=(daikuanlilv/12)/100;
    var yjhk=(dkze*yuelx*(Math.pow(1+yuelx),anjienianshu))/((Math.pow(1+yuelx),anjienianshu)-1);


    //房款总额
    $("#right_box input[name=first]").val("你猜");
    //贷款总额
    $("#right_box input[name=second]").val(dkze);
    //还款总额
    $("#right_box input[name=three]").val(yjhk*anjienianshu)
    //支付利息
    $("#right_box input[name=four]").val(yjhk*anjienianshu-dkze)
    //首期付款
    $("#right_box input[name=five]").val("none")
    //贷款月数
    $("#right_box input[name=six]").val(anjienianshu)
    //月均还款
    $("#right_box input[name=seven]").val((dkze*yuelx*(Math.pow(1+yuelx),anjienianshu))/((Math.pow(1+yuelx),anjienianshu)-1))

}
