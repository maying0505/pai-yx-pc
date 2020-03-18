var isLogin = false;

$(function () {
    if (sessionStorage.getItem("isLogin")) {
        $('.login-signup').hide();
        var data = JSON.parse(sessionStorage.getItem("userInfo"))
        loginSuccess(data)
    }
})


function loginPopupClose() {
    $(document.body).unbind('keyup', popLogKeyUp)
    $("#popBg").hide();
    $("#doLog").removeClass("popup-show")
}

function loginPopup() {
    $(document.body).bind('keyup', popLogKeyUp)
    $("#popBg").show();
    $("#doLog").addClass("popup-show")
}

function popLogKeyUp(e) {
    if (e.keyCode === 13) {
        doLogin()
    }
}

function getMsgCode(ele) {

    if($(ele).text()!=='获取短信验证码'){
        return;
    }

    var mobile = $('#mobile').val();
    var data = {
        mobile: mobile,
        type: 'LOGIN'
    }

    $.post(httpUrl + '/sm/send', data, function (res) {

        if(res&&res.success)
        {
            $(document).dialog({
                type: 'notice',
                infoText: '发送成功',
                autoClose: 1000,
                position: 'center'
            });
            msgTimeOut(ele, 60);
        }else
        {
            $(document).dialog({
                type: 'notice',
                infoText: res.message,
                autoClose: 1500,
                position: 'center'
            });
        }
    })
}


function msgTimeOut(ele, time) {
    if (0 < time) {
        $(ele).text("重新发送" + time + "s").attr("disabled", !0);
        var i = setTimeout(function () {
            clearTimeout(i), msgTimeOut(ele, --time)
        }, 1000)
    } else $(ele).text("获取短信验证码").attr("disabled", !1);
}


function doLogin() {
    var mobile = $("#mobile").val();
    var smcode = $("#smcode").val();
    var data = {
        phone: mobile,
        code: smcode
    };


    $.post(httpUrl + '/user/login', data, function (res) {
            if (res && res.success) {
                $(document).dialog({
                    type: 'notice',
                    infoText: '登录成功',
                    autoClose: 1500,
                    position: 'center'
                });

                loginSuccess(res.data)
            } else {
                $(document).dialog({
                    type: 'notice',
                    infoText: res.message,
                    autoClose: 1500,
                    position: 'center'
                });
            }
        }
    )

}


function logout() {
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("userInfo");
    $('.logout').hide();
    $('.login-signup').show();
    $('#top-user').hide()
}

function loginSuccess(data) {



    sessionStorage.setItem("isLogin", "true");
    sessionStorage.setItem("userInfo", JSON.stringify(data));
    isLogin = true;
    $('.login-signup').hide();
    $('#top-user').html(data['phone'].substring(0, 3) + '***' + data['phone'].substring(7, 11)).show();
    $('.logout').show();
    loginPopupClose()
}
