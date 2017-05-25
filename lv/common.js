/**
 * Created by hxsd on 2016/1/11.
 */
/*以下为获取页面可视区域大小的方法*/
function getPageInfo(){
    var page = {};

    page.pageWidth = window.innerWidth;  // 获取宽度
    page.pageHeight = window.innerHeight;// 获取高度

    if(typeof page.pageWidth != 'number'){
        if(document.compatMode == 'CSS1Compat'){
            // 说明当前页面是运行在标准模式下
            page.pageWidth = document.documentElement.clientWidth;
            page.pageHeight = document.documentElement.clientHeight;
        }else{
            page.pageWidth = document.body.clientWidth;
            page.pageHeight = document.body.clientHeight;
        }
    }

    return page;
}

/*以下为使用正则表达式的一些常用验证函数*/
// 验证邮箱格式
function validEmail(email){
    var reg=/^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
    return reg.test(email);
}

// 验证字符串：只能同字母、数字组成，至少6位
function validUsername(username){
    var reg = /^[a-zA-Z0-9]{6,}$/;
    return reg.test(username);
}

// 验证邮箱编码
function validZipCode(zipcode){
    var reg = /^[1-9]\d{5}$/;
    return reg.test(zipcode);
}

// 验证手机号
function validMobilePhone(phone){
    var reg = /^1\d{10}$/;
    return reg.test(phone);
}

// 验证身份证号
function validCID(cid){
    var reg = /^\d{15}$|^\d{18}$/;
    return reg.test(cid);
}