$(function() {
	let curStatus = getQueryString('curStatus') ? getQueryString('curStatus') : -1;
	let curSort = -1;
	let pageNo = 1;
	let pageSize = 32;
	let pageChange = true;
	//最高价、最低价
	let startPrice = undefined;
	let endPrice = undefined;
	//开拍起始时间、开拍结束时间
	let startAuctionTime = undefined;
	let endAuctionTime = undefined;
	let cityId = getQueryString('cityId') ? getQueryString('cityId') : undefined;
	let bidAddress = -1;
	let bidAddressCity = -1;
	let bidAddressP = undefined;
	let bidAddressC = undefined;
	// 初始化时间插件
	$(".start-auction-time").flatpickr({
		onChange: function(dateObj, dateStr, fp) {
			startAuctionTime = dateStr;
			pageChange = true;
			pageNo = 1;
			assetListGet();
		}
	});
	$(".end-auction-time").flatpickr({
		onChange: function(dateObj, dateStr, fp) {
			console.log(dateStr);
			endAuctionTime = dateStr;
			pageChange = true;
			pageNo = 1;
			assetListGet();
		}
	});
	

	//搜索框内容
	let assetTitle = getQueryString('searchText') ? decodeURI(getQueryString('searchText')) : undefined;
	if (assetTitle) {
		$('.search-input-box input').val(assetTitle);
	}
	

	//标的物类型列表显示
	let bidType = getQueryString('typeId') ? getQueryString('typeId') : -1;
	(function typeListShow() {
		let contentShow = '';
		for (let i = 0; i < typeList.length; i++) {
			let item = typeList[i];
			let activeTab = item.id == bidType ? 'active' : '';
			contentShow += '<span class="' + activeTab + '">' + item.text + '</span>';
		}
		if (bidType == -1) {
			$('.bid-type-box span').eq(0).addClass('active');
		}
		$('.bid-type-box').append(contentShow);
		$('.bid-type-box span').click(function() {
			$('.bid-type-box span').removeClass('active');
			$(this).addClass('active');
			let index = $(this).index();
			if (index == 0) {
				bidType = -1;
			} else {
				bidType = typeList[index - 1].id;
			}
			pageChange = true;
			pageNo = 1;
			assetListGet();
			console.log(bidType)

		})
	})();
	//标的物所在地列表显示
	// let provinceCityList = result.data;
	(function bidAddressShow() {
		let contentShow = '';
		for (let i = 0; i < provinceCityList.length; i++) {
			let item = provinceCityList[i];
			let marginLeftNum = -(30 + 70 * (i % 13));
			let childCityShow = '<span class="province-city flex flex-wrap-wrap" style="margin-left: ' + marginLeftNum +
				'px">';
			for (let x = 0; x < item.child.length; x++) {
				let val = item.child[x];
				if (cityId && cityId == val.id) {
					bidAddress = i;
					bidAddressCity = x;
					bidAddressP = item.areaName;
					bidAddressC = val.areaName;
					console.log(bidAddress, bidAddressCity)
					$('.all-address').removeClass('active');
					cityId = undefined
					pageChange = true;
					pageNo = 1;
					assetListGet();
				}

				let activeC = x == bidAddressCity ? 'active' : '';
				childCityShow += '<span class="' + activeC + '" data-id-child="' + x + '" data-id="' + i + '">' + val.areaName +
					'</span>';
			}
			let activeP = i == bidAddress ? 'active' : '';
			childCityShow += '</span>';
			let trangleShow = '';
			if (item.child.length > 1) {
				trangleShow += '<i class="trangle"></i>';
			}
			contentShow += '<span class="province ' + activeP + '">' + trangleShow + '<i class="province-text" data-id="' +
				i + '">' + item.areaName + '</i>' + childCityShow + '</span>';
		}
		$('.bid-address').append(contentShow);

		$('.bid-address .province').hover(function() {
			if ($(this).find('.province-city').children().length > 1) {
				$(this).find('.province-city').show();
			}
		}, function() {
			$(this).find('.province-city').hide();
		})

		$('.all-address').click(function() {
			$('.province-city span').removeClass('active');
			$('.province').removeClass('active');
			$(this).addClass('active');
			bidAddress = -1;
			bidAddressCity = -1;
			bidAddressP = undefined;
			bidAddressC = undefined;
			pageChange = true;
			pageNo = 1;
			assetListGet();
		})
		$("body").on("click",".province .province-text",function(){
			$('.province-city span').removeClass('active');
			$('.all-address').removeClass('active');
			$('.bid-address .province').removeClass('active');
			bidAddress = $(this).attr('data-id');
			bidAddressCity = -1;
			$(this).parent().addClass('active');
			bidAddressP = provinceCityList[bidAddress].areaName;
			bidAddressC = undefined;
			pageChange = true;
			pageNo = 1;
			assetListGet();
		})
		
		$("body").on("click",".province-city span",function(){
			$('.province-city span').removeClass('active');
			$('.all-address').removeClass('active');
			$('.bid-address .province').removeClass('active');
			bidAddress = $(this).attr('data-id');
			bidAddressCity = $(this).attr('data-id-child');
			$(this).addClass('active');
			$('.bid-address .province').eq(bidAddress).addClass('active');
			bidAddressP = provinceCityList[bidAddress].areaName;
			bidAddressC = provinceCityList[bidAddress].child[bidAddressCity].areaName;
			pageChange = true;
			pageNo = 1;
			assetListGet();
		})
	})();
	
	// (function bidAddressShow() {
	// 	let toast = $(document).dialog({
	// 		type: 'toast',
	// 		infoIcon: '../../public/image/loading.gif',
	// 		infoText: '',
	// 	});
	// 	httpGet(api.areaTreeList, {},
	// 		function success(result) {
	// 			console.log(result)

	// 			let provinceCityList = result.data;
	// 			console.log(JSON.stringify(provinceCityList))
	// 			let contentShow = '';
	// 			for (let i = 0; i < provinceCityList.length; i++) {
	// 				let item = provinceCityList[i];

	// 				let marginLeftNum = -(30 + 70 * (i % 13));

	// 				let childCityShow = '<span class="province-city flex flex-wrap-wrap" style="margin-left: ' + marginLeftNum +
	// 					'px">';
	// 				for (let x = 0; x < item.child.length; x++) {
	// 					let val = item.child[x];
	// 					if (cityId && cityId == val.id) {
	// 						bidAddress = i;
	// 						bidAddressCity = x;
	// 						bidAddressP = item.areaName;
	// 						bidAddressC = val.areaName;
	// 						console.log(bidAddress, bidAddressCity)
	// 						$('.all-address').removeClass('active');
	// 						cityId = undefined
	// 						pageChange = true;
	// 						pageNo = 1;
	// 						assetListGet();
	// 					}

	// 					let activeC = x == bidAddressCity ? 'active' : '';
	// 					childCityShow += '<span class="' + activeC + '" data-id-child="' + x + '" data-id="' + i + '">' + val.areaName +
	// 						'</span>';
	// 				}
	// 				let activeP = i == bidAddress ? 'active' : '';
	// 				childCityShow += '</span>';
	// 				let trangleShow = '';
	// 				if (item.child.length > 1) {
	// 					trangleShow += '<i class="trangle"></i>';
	// 				}
	// 				contentShow += '<span class="province ' + activeP + '">' + trangleShow + '<i class="province-text" data-id="' +
	// 					i + '">' + item.areaName + '</i>' + childCityShow + '</span>';
	// 			}
	// 			$('.bid-address').append(contentShow);

	// 			$('.bid-address .province').hover(function() {
	// 				if ($(this).find('.province-city').children().length > 1) {
	// 					$(this).find('.province-city').show();
	// 				}
	// 			}, function() {
	// 				$(this).find('.province-city').hide();
	// 			})

	// 			$('.all-address').click(function() {
	// 				$('.province-city span').removeClass('active');
	// 				$(this).addClass('active');
	// 				bidAddress = -1;
	// 				bidAddressCity = -1;
	// 				bidAddressP = undefined;
	// 				bidAddressC = undefined;
	// 				pageChange = true;
	// 				pageNo = 1;
	// 				assetListGet();
	// 			})
	// 			$('.province .province-text').click(function() {
	// 				$('.province-city span').removeClass('active');
	// 				$('.all-address').removeClass('active');
	// 				$('.bid-address .province').removeClass('active');
	// 				bidAddress = $(this).attr('data-id');
	// 				bidAddressCity = -1;
	// 				$(this).parent().addClass('active');
	// 				bidAddressP = provinceCityList[bidAddress].areaName;
	// 				bidAddressC = undefined;
	// 				pageChange = true;
	// 				pageNo = 1;
	// 				assetListGet();
	// 			})
	// 			$('.province-city span').click(function() {
	// 				$('.province-city span').removeClass('active');
	// 				$('.all-address').removeClass('active');
	// 				$('.bid-address .province').removeClass('active');
	// 				bidAddress = $(this).attr('data-id');
	// 				bidAddressCity = $(this).attr('data-id-child');
	// 				$(this).addClass('active');
	// 				$('.bid-address .province').eq(bidAddress).addClass('active');
	// 				bidAddressP = provinceCityList[bidAddress].areaName;
	// 				bidAddressC = provinceCityList[bidAddress].child[bidAddressCity].areaName;
	// 				pageChange = true;
	// 				pageNo = 1;
	// 				assetListGet();
	// 			})
	// 		},
	// 		function complete(xhr, status) {
	// 			//关闭loading
	// 			if (toast) {
	// 				toast.update({
	// 					infoIcon: '../../public/image/loading.gif',
	// 					infoText: '正在处理',
	// 					autoClose: 1,
	// 				});
	// 			}
	// 		},
	// 		function error(xhr, type) {
	// 			$(document).dialog({
	// 				type: 'notice',
	// 				infoText: xhr && xhr.message ? xhr.message : '请求失败',
	// 				autoClose: 1500,
	// 				position: 'center'
	// 			});
	// 		})


	// })();

	//拍卖状态
	(function statusStyleShow() {
		let contentShow = '';
		for (let i = 0; i < statusStyle.length; i++) {
			let item = statusStyle[i];
			let activeTab = item.id == curStatus ? 'active' : '';
			contentShow += '<span class="' + activeTab + '">' + item.name + '</span>';
		}
		$('.bid-status-box').append(contentShow);
		$('.bid-status-box span').click(function() {
			$('.bid-status-box span').removeClass('active');
			$(this).addClass('active');
			let index = $(this).index();
			curStatus = statusStyle[index].id;
			console.log(curStatus)
			pageChange = true;
			pageNo = 1;
			assetListGet();
		})
	})();
	//排序
	(function sortListShow() {
		let contentShow = '';
		for (let i = 0; i < sortList.length; i++) {
			let item = sortList[i];
			let activeTab = item.id === curSort ? 'active' : '';
			contentShow += '<span class="' + activeTab + '">' + item.text + '</span>';
		}
		$('.bid-sort-box').append(contentShow);
		$('.bid-sort-box span').click(function() {
			$('.bid-sort-box span').removeClass('active');
			$(this).addClass('active');
			let index = $(this).index();
			curSort = sortList[index].id;
			console.log(curSort)
			pageChange = true;
			pageNo = 1;
			assetListGet();
		})
	})();
	//请求数据
	assetListGet();

	function assetListGet() {
		if (pageChange) {
			$('.pagination-box').hide();
		}

		let toast = $(document).dialog({
			type: 'toast',
			infoIcon: '../../public/image/loading.gif',
			infoText: '',
		});
		let params = {
			status: curStatus,
			pageNo: pageNo,
			pageSize: pageSize,
			paging: true,
			type: bidType,
			province: bidAddressP,
			city: bidAddressC,
			sort: curSort,
			assetTitle: assetTitle,
			startAuctionTime: startAuctionTime,
			endAuctionTime: endAuctionTime,
			startPrice: startPrice,
			endPrice: endPrice
		};
		httpGet(api.assetList, params,
			function success(result) {
				console.log(result)
				let assetList = result.data.data;
				//分页初始化

				if (result.data && result.data.data && result.data.data.length > 0 && result.data.totalPage > 1) {
					$('.pagination-box').show();
					if (pageChange) {
						Page({
							num: result.data.totalPage,
							elem: $('#bid-page'),
							callback: function(n) {
								console.log(n);
								pageChange = false;
								pageNo = n;
								assetListGet();
							}
						});
					}
				}
				$('.all-bid-num').text(result.data && result.data.allCount ? '(' + result.data.allCount + ')' : '(' + 0 + ')');
				let contentShow = '';
				if (assetList && assetList.length) {
					for (let i = 0; i < assetList.length; i++) {
						let item = assetList[i];
						let coverImg = item.cover ? item.cover : '../../public/image/default-cover.png';
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
						'<img src="../../public/image/zanwushuju@2x.png"></img>' +
						'<div>暂无数据</div>' +
						'</div>';
					// $('.bid-list-bot').hide();
				}

				$('.bid-list-main').html(contentShow);
				$('.bl-m-box').click(function() {
					let index = $(this).index();
					window.location.href = '../bid-detail/index.html?id=' + assetList[index].id
				})
				// $(document).dialog({
				// 	type : 'notice',
				// 	infoText: '请求成功',
				// 	autoClose: 1500,
				// 	position: 'center' 
				// });
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

	//监听最高价
	$('.start-price').keyup(function() {
		console.log($(this).val())
		startPrice = $(this).val();
	});
	$('.price-box').hover(function() {
		$('.ok-price a').css('opacity', '1');
	}, function() {
		$('.ok-price a').css('opacity', '0');
	})

	//监听最低价
	$('.end-price').keyup(function() {
		console.log($(this).val())
		endPrice = $(this).val();
	});

	//时间hover
	$('.time-box').hover(function() {
		$('.clear-time a').css('opacity', '1');
	}, function() {
		$('.clear-time a').css('opacity', '0');
	})

	//清除时间
	$('.clear-time').click(function() {
		startAuctionTime = undefined;
		endAuctionTime = undefined;
		$('.start-auction-time').val("");
		$('.end-auction-time').val("");
		$('.clear-time a').css('opacity', '0');
		pageChange = true;
		pageNo = 1;
		assetListGet();
	})

	//确认价格
	$('.ok-price').click(function() {
		$('.ok-price a').css('opacity', '0');
		pageChange = true;
		pageNo = 1;
		assetListGet();
	})

	//搜索按钮
	$('.search-input-btn').click(function() {
		let searchVal = $('.search-input').val();
		if (searchVal !== assetTitle) {
			assetTitle = searchVal;
			pageChange = true;
			pageNo = 1;
			assetListGet();
		}
	})


})
