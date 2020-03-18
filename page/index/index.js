$(function() {
	let pageSize = 12;
	//标的物类型
	(function typeListShow() {
		let contentShow = '';
		for (let i = 0; i < typeList.length; i++) {
			// console.log(typeList[i].text)
			let item = typeList[i];
			contentShow += '<span>' + item.text + '</span>';
		}
		$('.bid-type-box').html(contentShow);
		//标的物类型跳转
		$('.bid-type-box span').click(function() {
			let index = $(this).index();
			let typeId = typeList[index] ? typeList[index].id : '';
			window.location.href = './page/bid-category/index.html?typeId=' + typeId;
		});
	})();
	//标的物所在地
	(function bidAddressShow() {
		let toast = $(document).dialog({
			type: 'toast',
			infoIcon: './public/image/loading.gif',
			infoText: '',
		});
		httpGet(api.areaList, {
			pageNo: 1,
			pageSize: 15,
			paging: true,
		},
			function success(result) {
				console.log(result)
				let contentShow = '';
				let dataList = result.data.data;
				if (dataList && dataList.length > 0) {
					let list = 0;
					list = dataList.length;
					for (let i = 0; i < list; i++) {
						let item = dataList[i];
						contentShow += '<span>' + item.areaName + '</span>';
					}
				}
				$('.bid-address-box').prepend(contentShow);
				//标的物所在地跳转
				$('.bid-address-box span').click(function() {
					let index = $(this).index();
					let cityId = dataList[index] ? dataList[index].id : '';
					if (index == 15) {
						cityId = '';
					}
					window.location.href = './page/bid-category/index.html?cityId=' + cityId;
				});

			},
			function complete(xhr, status) {
				//关闭loading
				if (toast) {
					toast.update({
						infoIcon: './public/image/loading.gif',
						infoText: '正在处理',
						autoClose: 1,
					});
				}
			},
			function error(xhr, type) {
				$(document).dialog({
					type: 'notice',
					infoText: xhr && xhr.message ? xhr.message : '请求失败',
					autoClose: 1500,
					position: 'center'
				});
			})

	})();

	//热门搜索
	(function hotSearchShow() {
		httpGet(api.areaList, {
				isHot: '1'
			},
			function success(result) {
				console.log(result)
				let contentShow = '';
				if (result.data && result.data.length > 0) {
					let list = 0;
					list = result.data.length > 15 ? 15 : result.data.length;
					for (let i = 0; i < list; i++) {
						let item = result.data[i];
						contentShow += '<span>' + item.areaName + '</span>';
					}
				}
				$('.hot-search').append(contentShow);
				//标的物所在地跳转
				$('.hot-search span').click(function() {
					let index = $(this).index();
					let cityId = result.data[index] ? result.data[index].id : '';
					window.location.href = './page/bid-category/index.html?cityId=' + cityId;
				});

			},
			function complete(xhr, status) {

			},
			function error(xhr, type) {
				$(document).dialog({
					type: 'notice',
					infoText: xhr && xhr.message ? xhr.message : '请求失败',
					autoClose: 1500,
					position: 'center'
				});
			})

	})();

	//网拍咨询
	let curNews = 0;
	(function newsShow() {
		let contentShow = '';
		for (let i = 0; i < newsTabList.length; i++) {
			let item = newsTabList[i];
			let activeTab = i === curNews ? 'active-tab' : '';
			contentShow += '<span class="' + activeTab + '">' + item.text + '</span>';
		}
		$('.news-tab').html(contentShow);
		$('.news-tab span').click(function() {
			let index = $(this).index();
			if ($(this).attr("class").indexOf('active-tab') !== -1) {
				return
			}
			$('.news-tab span').removeClass('active-tab');
			$('.news-tab span').eq(index).addClass('active-tab');
			curNews = index;
			newsTabListGet();
		})
	})();
	//网拍咨询数据获取
	newsTabListGet();

	function newsTabListGet() {
		let toast = $(document).dialog({
			type: 'toast',
			infoIcon: './public/image/loading.gif',
			infoText: '',
		});
		httpGet(api.articleList, {
				categoryId: newsTabList[curNews].id,
				pageNo: 1,
				pageSize: 6,
				paging: true
			},
			function success(result) {
				console.log(result)
				let newsList = result.data.data ? result.data.data : [];
				let contentShow = '';
				if (newsList && newsList.length) {
					for (let i = 0; i < newsList.length; i++) {
						let item = newsList[i];
						contentShow += '<div class="oc-m">' +
							'<span class="dot"></span>' +
							item.title +
							'</div>';
					}
				} else {
					contentShow = '<div class="nodata">' +
						'<img src="./public/image/zanwushuju@2x.png"></img>' +
						'<div>暂无数据</div>' +
						'</div>';
					// $('.bid-list-bot').hide();
				}

				$('.online-consult-main').html(contentShow);
				$('.online-consult-main .oc-m').click(function() {
					let index = $(this).index();
					window.location.href = './page/news/detail.html?id=' + newsList[index].id + '&type=' + curNews
				})

			},
			function complete(xhr, status) {
				//关闭loading
				if (toast) {
					toast.update({
						infoIcon: './public/image/loading.gif',
						infoText: '正在处理',
						autoClose: 1,
					});
				}
			},
			function error(xhr, type) {
				$(document).dialog({
					type: 'notice',
					infoText: xhr && xhr.message ? xhr.message : '请求失败',
					autoClose: 1500,
					position: 'center'
				});
			}
		)
	}
	//咨询查看更多
	$('.online-consult-top .more').click(function() {
		window.location.href = './page/news/index.html?type=' + curNews
	})

	//热门推荐
	let curRecommend = 1;
	(function recommendShow() {
		let contentShow = '';
		for (let i = 0; i < hotRecommend.length; i++) {
			let item = hotRecommend[i];
			let activeTab = item.id === curRecommend ? 'active-tab' : '';
			contentShow += '<span class="' + activeTab + '">' + item.text + '</span>';
		}
		$('.hot-recommend-tab').html(contentShow);
		$('.hot-recommend-tab span').click(function() {
			let index = $(this).index();
			if ($(this).attr("class").indexOf('active-tab') !== -1) {
				return
			}
			$('.hot-recommend-tab span').removeClass('active-tab');
			$('.hot-recommend-tab span').eq(index).addClass('active-tab');
			curRecommend = hotRecommend[index].id;
			hotRecommendListGet();
		})
	})();
	//热门推荐数据获取
	hotRecommendListGet();

	function hotRecommendListGet() {
		let toast = $(document).dialog({
			type: 'toast',
			infoIcon: './public/image/loading.gif',
			infoText: '',
		});
		httpGet(api.assetRecommend, {
				type: curRecommend,
				pageNo: 1,
				pageSize: 6,
				paging: true
			},
			function success(result) {
				console.log(result)
				let recommendList = result.data.data ? result.data.data : [];
				let contentShow = '';
				if (recommendList && recommendList.length) {
					for (let i = 0; i < recommendList.length; i++) {
						let item = recommendList[i];
						let coverImg = item.cover ? item.cover : './public/image/default-cover.png';
						contentShow += '<div class="hr-m flex flex-direction-column">' +
							'<img src="' + coverImg + '" />' +
							'<div class="hr-m-text">' +
							'<div class="hr-name">' + item.name + '</div>' +
							'<div class="amount">￥' + amountShow(item) + '</div>' +
							'</div>' +
							'</div>';
					}
				} else {
					contentShow = '<div class="nodata">' +
						'<img src="./public/image/zanwushuju@2x.png"></img>' +
						'<div>暂无数据</div>' +
						'</div>';
					// $('.bid-list-bot').hide();
				}

				$('.hot-recommend-content').html(contentShow);
				$('.hot-recommend-content .hr-m').click(function() {
					let index = $(this).index();
					window.location.href = './page/bid-detail/index.html?id=' + recommendList[index].id
				})

			},
			function complete(xhr, status) {
				//关闭loading
				if (toast) {
					toast.update({
						infoIcon: './public/image/loading.gif',
						infoText: '正在处理',
						autoClose: 1,
					});
				}
			},
			function error(xhr, type) {
				$(document).dialog({
					type: 'notice',
					infoText: xhr && xhr.message ? xhr.message : '请求失败',
					autoClose: 1500,
					position: 'center'
				});
			}
		)
	}

	//拍卖状态
	let curStatus = -1;
	(function statusStyleShow() {
		let contentShow = '';
		for (let i = 0; i < statusStyle.length; i++) {
			let item = statusStyle[i];
			let activeTab = item.id === curStatus ? 'active-tab' : '';
			contentShow += '<span class="' + activeTab + '">' + item.name + '</span>';
		}
		$('.bid-list-top .tab-nav').html(contentShow);
	})();
	//请求数据
	assetListGet();

	function assetListGet() {
		let toast = $(document).dialog({
			type: 'toast',
			infoIcon: './public/image/loading.gif',
			infoText: '',
		});
		httpGet(api.assetList, {
				status: curStatus,
				pageNo: 1,
				pageSize: pageSize
			},
			function success(result) {
				console.log(result)
				let assetList = result.data;
				let contentShow = '';
				if (assetList && assetList.length) {
					for (let i = 0; i < assetList.length; i++) {
						let item = assetList[i];
						let coverImg = item.cover ? item.cover : './public/image/default-cover.png';
						contentShow += '<div class="bl-m-box"><div class="bl-m">' +
							'<img src="' + coverImg + '" />' +
							'<div class="bl-m-text">' +
							'<div class="bid-name">' + item.name + '</div>' +
							'<div class="bid-status">' +
							'<span class="auction-status auction-status-' + item.status + '">' + statusShow(item.status) + '</span>' +
							'<span class="auction-status auction-stage">' + stageShow(item.stage) + '</span>' +
							'</div>' +
							'<div class="amount">' +
							'<span>' + amountTextShow(item.status) + '</span>' +
							'<span class="amount-text">' + amountShow(item) + '</span>' +
							'</div>' +
							'<div class="time">' +
							'<span>' + timeTextShow(item.status) + '</span>' +
							'<span class="time-text">' + timeShow(item) + '</span>' +
							'</div>' +
							'</div>' +
							'</div></div>';
					}
					// $('.bid-list-bot').show();
				} else {
					contentShow = '<div class="nodata">' +
						'<img src="./public/image/zanwushuju@2x.png"></img>' +
						'<div>暂无数据</div>' +
						'</div>';
					// $('.bid-list-bot').hide();
				}

				$('.bid-list-main').html(contentShow);
				$('.bl-m-box').click(function() {
					let index = $(this).index();
					window.location.href = './page/bid-detail/index.html?id=' + assetList[index].id
				})

			},
			function complete(xhr, status) {
				//关闭loading
				if (toast) {
					toast.update({
						infoIcon: './public/image/loading.gif',
						infoText: '正在处理',
						autoClose: 1,
					});
				}
			},
			function error(xhr, type) {
				$(document).dialog({
					type: 'notice',
					infoText: xhr && xhr.message ? xhr.message : '请求失败',
					autoClose: 1500,
					position: 'center'
				});
			}
		)
	}

	//标的列表状态筛选
	$('.bid-list-top .tab-nav span').click(function() {
		let index = $(this).index();
		if ($(this).attr("class").indexOf('active-tab') !== -1) {
			return
		}
		$('.bid-list-top .tab-nav span').removeClass('active-tab');
		$('.bid-list-top .tab-nav span').eq(index).addClass('active-tab');
		curStatus = statusStyle[index].id;
		assetListGet();
	})
	//标的状态查看更多
	$('.bid-list-bot').click(function(){
		window.location.href = './page/bid-category/index.html?curStatus='+curStatus;
	})

	//查看更多
	$('.more-list').click(function() {
		window.location.href = './page/bid-category/index.html';
	});

	//搜索按钮
	$('.search-btn').click(function() {
		let searchText = $('.search-input').val();
		window.location.href = './page/bid-category/index.html?searchText=' + encodeURI(encodeURI(searchText));
	})


	// $('.tab').hover(function() {
	//     var index = $(this).index();
	//     $(this).addClass('tab-' + (index + 1) + '-on')
	// }, function() {
	//     var index = $(this).index();
	//     $(this).removeClass('tab-' + (index + 1) + '-on')
	// })

	// $.get(api.bannerList, { categoryId: '988955659bfe4ce9acebf0afd26e1cc9' }, function(res) {
	//     if (res.code == 200) {
	//         var data = res.data;
	//         var html = [];
	//         for (var i = 0; i < data.length; i++) {
	//             html.push('<div class="swiper-slide">')
	//             html.push('<img src="' + data[i].imgUrl + '"/>')
	//             html.push('</div')
	//         }
	//         $('.swiper-wrapper').html(html.join(''));

	//         window.setTimeout(function() {
	//             var swiper = new Swiper('.swiper-container', {
	//                 speed: 500,
	//                 autoplay: 4400,
	//                 autoplayDisableOnInteraction: false,
	//                 effect: 'fade',
	//                 pagination: '.swiper-pagination',
	//                 paginationClickable: true,
	//                 onSlideChangeStart: function(swiper) {
	//                     nextSlide = swiper.slides.eq(swiper.activeIndex);
	//                 },
	//                 onSlideChangeEnd: function(swiper) {
	//                     prevSlide = swiper.slides[swiper.previousIndex];
	//                     prevSlide.className = "swiper-slide";
	//                 },
	//             });
	//         }, 1000)
	//     }
	// }, "json")
	//--开启loading
	// let toast = $(document).dialog({
	//         type : 'toast',
	//         infoIcon: '../../public/image/loading.gif',
	//         infoText: '',
	//     });
	//--关闭loading
	// toast.update({
	//     infoIcon: '../../public/image/icon/loading.gif',
	//     infoText: '正在处理',
	//     autoClose: 1,
	// });
	//--信息提示框
	// $(document).dialog({
	//     type : 'notice',
	//     infoText: '请求失败',
	//     autoClose: 1500,
	//     position: 'center' 
	// });

	//点击事件
	// $('.phone').click(function(){

	// })

})
