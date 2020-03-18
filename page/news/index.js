$(function(){
    let pageSize = 10;
    let pageNo = 1;
    //新闻类型
    let curNews = getQueryString('type');
    $('.news-type').text(newsTabList[curNews].text);
    //tab
	(function newsShow(){
		let contentShow = '';
		for (let i = 0; i < newsTabList.length; i++){
			let item = newsTabList[i];
			let activeTab = i == curNews ? 'active-tab' : '';
			contentShow += '<div class="'+activeTab+'">'+item.text+'</div>';
		}
		$('.news-tab').html(contentShow);
		$('.news-tab div').click(function(){
			let index = $(this).index();
			if ($(this).attr("class").indexOf('active-tab') !== -1) {
				return
			}
			$('.news-tab div').removeClass('active-tab');
			$('.news-tab div').eq(index).addClass('active-tab');
            curNews = index;
            $('.news-type').text(newsTabList[curNews].text);
            pageChange = true;
            pageNo = 1;
			newsListGet();
		})
    })();
    //网拍咨询数据获取
    let pageChange = true;
	newsListGet();
	function newsListGet () {
		if (pageChange) {
			$('.pagination-box').hide();
		}
		let toast = $(document).dialog({
			type : 'toast',
			infoIcon: '../../public/image/loading.gif',
			infoText: '',
		});
		httpGet( api.articleList,{categoryId: newsTabList[curNews].id,pageNo: pageNo,pageSize: pageSize,paging: true},
			function success(result){
                console.log(result)
                
				let newsList = result.data.data ? result.data.data : [];
				let contentShow = '';
				if (newsList && newsList.length) {
					for (let i = 0; i < newsList.length; i++){
						let item = newsList[i];
						contentShow += '<div class="news-item">'+
                                    '<div class="title"><span class="dot"></span><span class="title-text">'+item.title+'</span></div>'+
                                    '<div class="content">'+item.description+'</div>'+
                                    '<div class="time">'+item.createDate+'</div>'+
                                '</div>';
                    }
                    if (newsList.length > 0 && result.data.totalPage > 1) {
                        $('.pagination-box').show();
                        if (pageChange) {
                            Page({
                                num: result.data.totalPage,
                                elem: $('#bid-page'),
                                callback: function(n) {
                                    console.log(n);
                                    pageChange = false;
                                    pageNo = n;
                                    newsListGet();
                                }
                            });
                        }
                    }
				} else {
					contentShow = '<div class="nodata">'+
							'<img src="./public/image/zanwushuju@2x.png"></img>'+
							'<div>暂无数据</div>'+
						'</div>';
				}
				
				$('.news-list-main').html(contentShow);
				$('.news-list-main .news-item').click(function() {
					let index = $(this).index();
					window.location.href = './detail.html?id='+ newsList[index].id + '&type='+curNews
				})
				
			},
			function complete(xhr, status) {
				//关闭loading
				if (toast) {
					toast.update({
						infoIcon: '../../public/image/loading.gif',
						infoText: '正在处理',
						autoClose: 1,
					});
				}
			},
			function error(xhr, type){
				$(document).dialog({
					type : 'notice',
					infoText: xhr && xhr.message ? xhr.message : '请求失败',
					autoClose: 1500,
					position: 'center' 
				});
			}
		)
	}
})