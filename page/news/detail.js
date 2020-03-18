$(function(){
    
    let id = getQueryString('id');
    //新闻类型
    let curNews = getQueryString('type');
    $('.news-type').html(newsTabList[curNews].text);
    $('.go-news-list').attr('href','./index.html?type=' + curNews);
   
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
            curNews = index;
            window.location.href = './index.html?type='+curNews
		})
    })();
    //网拍咨询数据获取
	newsListGet();
	function newsListGet () {
		let toast = $(document).dialog({
			type : 'toast',
			infoIcon: '../../public/image/loading.gif',
			infoText: '',
		});
		httpGet( api.articleDetail,{id: id},
			function success(result){
                console.log(result)
				let newsList = result.data;
				let contentShow = '';
				if (newsList) {
                    $('.news-title').html(newsList.title);
                    contentShow += '<div class="news-title">'+
                                    newsList.title+
                            '</div>'+
                            '<div class="time-author"><span>'+newsList.author+'</span><span>'+newsList.createDate+'</span></div>'+
                            '<div class="content">'+newsList.articleData.content+'</div>';
				} else {
					contentShow = '<div class="nodata">'+
							'<img src="./public/image/zanwushuju@2x.png"></img>'+
							'<div>暂无数据</div>'+
						'</div>';
				}
				
				$('.news-detial').html(contentShow);
				
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