function openInvestPop(title,ele) {
    //$(document.body).bind('keyup', popLogKeyUp)
    $('.popup-title').text(title)
    $("#popBg").show();
    $(ele).addClass("popup-show")

    var type = ele?ele.substring(3):'';

    console.log(type)

    if(type)
    {
        switch (type) {
            case 'Apply':

                $('#city-picker-selector-apply').cityPicker({
                    dataJson: cityData,
                    renderMode: true,
                    search: false,
                    linkage: false
                })
                $('#city-picker-selector-apply').on('choose-province.citypicker', function (event, tagert, storage) {
                    console.log(storage);
                });
                break;
            case 'Join':

                $('#city-picker-selector-join').cityPicker({
                    dataJson: cityData,
                    renderMode: true,
                    search: false,
                    linkage: false
                })
                $('#city-picker-selector-join').on('choose-province.citypicker', function (event, tagert, storage) {
                    console.log("---->>"+storage);
                });
                break;
            case 'Invest':

                $('#city-picker-selector-invest').cityPicker({
                    dataJson: cityData,
                    renderMode: true,
                    search: false,
                    linkage: false
                })
                $('#city-picker-selector-invest').on('choose-province.citypicker', function (event, tagert, storage) {
                    console.log(storage);
                });
                break;

        }
    }


}

function doApply() {

    var cname=$('#apply_cname').val();
    var province = $('#city-picker-selector-apply').find('input[name="userProvinceId"]').val();
    var city = $('#city-picker-selector-apply').find('input[name="userCityId"]').val();
    var area = $('#city-picker-selector-apply').find('input[name="userDistrictId"]').val();
    var name = $('#apply_name').val();
    var mobile = $('#apply_mobile').val();
    var smcode = $('#apply_smcode').val();


    var data ={
        companyName:cname,
        province:province,
        name:name,
        city:city,
        area:area,
        phone:mobile,
        type:1,
        smsCode:smcode
    }


    httpPostForm('/apply/join',data,function (res) {

        if(res.success)
        {
            $(document).dialog({
                type : 'notice',
                infoText: '申请成功。',
                autoClose: 1500,
                position: 'center'
            });
            applyPopupClose('#doApply')

        }
        else{
            $(document).dialog({
                type : 'notice',
                infoText: res.message,
                autoClose: 1500,
                position: 'center'
            });
        }

    },function () {
        
    },function () {
        
    })

}


function doJoin() {



    var cname=$('#join_cname').val();
    var province = $('#city-picker-selector-join').find('input[name="userProvinceId"]').val();
    var city = $('#city-picker-selector-join').find('input[name="userCityId"]').val();
    var area = $('#city-picker-selector-join').find('input[name="userDistrictId"]').val();
    var name = $('#join_name').val();
    var mobile = $('#join_mobile').val();
    var smcode = $('#join_smcode').val();


    var data ={
        companyName:cname,
        province:province,
        name:name,
        city:city,
        area:area,
        phone:mobile,
        type:2,
        smsCode:smcode
    }


    httpPostForm('/apply/join',data,function (res) {

        if(res.success)
        {
            $(document).dialog({
                type : 'notice',
                infoText: '申请成功。',
                autoClose: 1500,
                position: 'center'
            });
            applyPopupClose('#doJoin')

        }
        else{
            $(document).dialog({
                type : 'notice',
                infoText: res.message,
                autoClose: 1500,
                position: 'center'
            });
        }

    },function () {

    },function () {

    })



}


function doInvest() {




    var orgName = $('#orgName').val();
    var province = $('#city-picker-selector-invest').find('input[name="userProvinceId"]').val();
    var city = $('#city-picker-selector-invest').find('input[name="userCityId"]').val();
    var area = $('#city-picker-selector-invest').find('input[name="userDistrictId"]').val();
    var name = $('#invest_name').val();
    var mobile = $('#invest_mobile').val();
    var smcode = $('#invest_smcode').val();
    var totalAmount =$('#totalAmount').val();
    var onceAmount =$('#onceAmount').val();

    var des =$('#des').val();

    var data ={
        orgName:orgName,
        province:province,
        name:name,
        city:city,
        area:area,
        phone:mobile,
        type:2,
        smsCode:smcode,
        totalAmount:totalAmount,
        onceAmount:onceAmount,
        des:des
    }


    httpPostForm('/apply/invest',data,function (res) {

        if(res.success)
        {
            $(document).dialog({
                type : 'notice',
                infoText: '申请成功。',
                autoClose: 1500,
                position: 'center'
            });
            applyPopupClose('#doInvest')

        }
        else{
            $(document).dialog({
                type : 'notice',
                infoText: res.message,
                autoClose: 1500,
                position: 'center'
            });
        }

    },function () {

    },function () {

    })
    
}



function getInvestMsgCode(ele,mobile_ele) {
    var mobile = $(mobile_ele).val();
    var data = {
        mobile: mobile,
        type: 'JOIN'
    }

    $.post(httpUrl + '/sm/send', data, function (res) {
        res && res.success ? msgTimeOut(ele, 60) : $(document).dialog({
            type: 'notice',
            infoText: res.message,
            autoClose: 1500,
            position: 'center'
        });
    })
}


function applyPopupClose(ele) {
    $("#popBg").hide();
    $(ele).removeClass("popup-show")
}



$(function () {


})
