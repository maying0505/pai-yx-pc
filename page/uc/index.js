$(function () {

    let pageChange_book = true;//分页器
    let pageNo_book = 1;
    let pageSize_book = 24;
    let pageChange_history = true;//分页器
    let pageNo_history = 1;
    let pageSize_history = 24;
    const stages = {'0': '一拍', '1': '二拍', '2': '变卖'};
    const allStatus = {
        '7': '看样排期中',
        '8': '不安排看样',
        '9': '看样预约中',
        '10': '预约结束',
        '11': '即将开始',
        '12': '进行中',
        '13': '成交',
        '14': '流拍',
        '15': '中止',
        '16': '撤回',
        '18': '暂缓',

    };

    $('.tab').click(function () {
        let index = $(this).index();
        if (index == 0) {
            $('.book-bid-list-box').show();
            $('.history-bid-list-box').hide();
        } else {
            $('.book-bid-list-box').hide();
            $('.history-bid-list-box').show();
        }
        $('.tab').removeClass('tab-active')
        $(this).addClass('tab-active')
        $('#bread-next').text(index==0?'预约记录':'浏览历史')
    })

    loadBookList();

    loadHistory();

    function loadBookList() {
        let toast = $(document).dialog({
			type : 'toast',
			infoIcon: '../../public/image/loading.gif',
			infoText: '',
		});
        if (pageChange_book) {
			$('.pagination-book-box').hide();
		}
        var userId = JSON.parse(sessionStorage.getItem('userInfo')).id;
        var data = {
            userId: userId,
            dataType: 0,
            pageNo: pageNo_book,
            pageSize: pageSize_book,
            paging: true
        }


        httpGet('/book/list', data, function (res) {


            if (res.success) {

                var dataJson = res.data;
                var data = dataJson.data;

                var html = [];

                for (var i = 0; i < data.length; i++) {
                    html.push('<div class="bid-item book-bid-item" data-id="'+data[i].id+'"><div class="bid-item-con">')
                    html.push('<img src="' + data[i].cover + '"/>')
                    html.push('<h3 class="title" title="' + data[i].name + '">' + data[i].name+'</h3>');
                    html.push('<p class="bid-info"><span class="status">' + allStatus[data[i].status] + '</span><span class="bid-num">' + stages[data[i].stage] + '</span></p>')
                    html.push('<p class="price">起拍价 <span class="amount">' + (data[i].startintPrice ? amountFormat(data[i].startintPrice):'--') + '</span></p>')
                    html.push('<p class="date">开拍时间'+data[i].auctionTime+'</p>')
                    html.push('<p class="book-code flex flex-align-items-center flex-justify-content-center"><img src="../../public/image/code-icon.png" style="width: 24px;height: 24px;margin-right: 5px"/> 预约号码 '+data[i].code+'</p>')
                    html.push('</div></div>')

                }
                if (data && data.length > 0 && dataJson.totalPage > 1) {
                    $('.pagination-book-box').show();
                    if (pageChange_book) {
                        Page({
                            num: dataJson.totalPage,
                            elem: $('#bid-book-page'),
                            callback: function(n) {
                                console.log(n);
                                pageChange_book = false;
                                pageNo_book = n;
                                loadHistory();
                            }
                        });
                    }
                }

                if(html.length>0){
                    $('#book-bid-list').html(html.join(''))
                }else{
                    $('#book-bid-list').html('<div class="nodata"><img src="../../public/image/zanwushuju@2x.png"><div>暂无数据</div></div>')
                }

                $('.bid-item').click(function () {
                    var id = $(this).attr('data-id');
                    location.href='../bid-detail/index.html?id='+id;
                })


            }


        }, function () {
            //关闭loading
            if (toast) {
                toast.update({
                    infoIcon: '../../public/image/loading.gif',
                    infoText: '正在处理',
                    autoClose: 1,
                });
            }
        }, function () {

        })

    }


    function loadHistory() {
        if (pageChange_history) {
			$('.pagination-history-box').hide();
        }
        let toast = $(document).dialog({
			type : 'toast',
			infoIcon: '../../public/image/loading.gif',
			infoText: '',
		});
        httpPostForm('/asset/history/list',{pageNo: pageNo_history,pageSize: pageSize_history,paging: true}, function (res) {


            if (res.success) {
                var dataJson = res.data;
                var data = dataJson.data;

                var html = [];

                for (var i = 0; i < data.length; i++) {
                    html.push('<div class="bid-item" data-id="'+data[i].assetId+'"><a class="clean" data-id="'+data[i].id+'"></a><div class="bid-item-con">')
                    html.push('<img src="' + data[i].cover + '"/>')
                    html.push('<h3 class="title" title="' + data[i].subjectMatterName + '">' + data[i].subjectMatterName+'</h3>');
                    html.push('<p class="bid-info"><span class="status">' + allStatus[data[i].status] + '</span><span class="bid-num">' + stages[data[i].stage] + '</span></p>')
                    html.push('<p class="price">起拍价 <span class="amount">' + (data[i].startintPrice ? amountFormat(data[i].startintPrice):'--') + '</span></p>')
                    html.push('<p class="date">开拍时间'+data[i].auctionTime+'</p>')
                    html.push('</div></div>')
                }
                if (data && data.length > 0 && dataJson.totalPage > 1) {
                    $('.pagination-history-box').show();
                    if (pageChange_history) {
                        Page({
                            num: dataJson.totalPage,
                            elem: $('#bid-history-page'),
                            callback: function(n) {
                                console.log(n);
                                pageChange_history = false;
                                pageNo_history = n;
                                loadHistory();
                            }
                        });
                    }
                }



                if(html.length>0){
                    $('#history-bid-list').html(html.join(''))
                }else{
                    $('#history-bid-list').html('<div class="nodata"><img src="../../public/image/zanwushuju@2x.png"><div>暂无数据</div></div>')
                }

                setTimeout(function () {

                    $('.bid-item').click(function () {
                        var id = $(this).attr('data-id');
                        location.href='../bid-detail/index.html?id='+id;
                    })


                    $('.clean').click(function (e) {
                        e.stopPropagation(); 
                        var id = $(this).data('id');
                        let toast1 = $(document).dialog({
                            type : 'toast',
                            infoIcon: '../../public/image/loading.gif',
                            infoText: '',
                        });
                        httpGet('/asset/history/delete',{id:id},function (res) {

                            if(res.success){
                                $(document).dialog({
                                    type : 'notice',
                                    infoText: '删除成功',
                                    autoClose: 1500,
                                    position: 'center'
                                });
                                loadHistory();
                                pageChange_history = true;
                            }else{
                                $(document).dialog({
                                    type : 'notice',
                                    infoText: res.message,
                                    autoClose: 1500,
                                    position: 'center'
                                });
                            }
                        },function () {
                            //关闭loading
                            if (toast1) {
                                toast1.update({
                                    infoIcon: '../../public/image/loading.gif',
                                    infoText: '正在处理',
                                    autoClose: 1,
                                });
                            }
                        },function () {
                            
                        })

                    })
                },1000)



            }


        }, function () {
            //关闭loading
            if (toast) {
                toast.update({
                    infoIcon: '../../public/image/loading.gif',
                    infoText: '正在处理',
                    autoClose: 1,
                });
            }
        }, function () {

        })

    }





})