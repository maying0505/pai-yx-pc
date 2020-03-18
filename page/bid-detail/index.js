$(function() {
	// 地图初始化
	let map = new AMap.Map('container');
	let marker = new AMap.Marker();
	let curImg = 0; //当前查看图片
	let imgPage = 0; //图片页码
	let imgpageSize = 5; //图片一页数量
	let mobileNum = null; //预约号码
	let nameText = ''; //预约姓名
	let smcodeText = null; //预约验证码
	let ifSmcodeGet = false; //是否获取过验证码
	let smcodeOk = true; //是否可以获取验证码
	//请求数据
	let assetId = getQueryString('id');
	assetDetailGet(assetId);

	function assetDetailGet(assetId) {
		let toast = $(document).dialog({
			type: 'toast',
			infoIcon: '../../public/image/loading.gif',
			infoText: '',
		});
		httpGet(api.assetDetail, {
				assetId: assetId
			},
			function success(result) {
				console.log(result)
				let assetDetail = result.data;
				let contentShow = '';
				if (assetDetail) {
				hotRecommendListGet(assetDetail.city,assetDetail.type);
					//标的名
					$('.bid-name-text').html(assetDetail.name);
					//标的状态、拍卖阶段
					let bidStatusStageShow = '';
					if (assetDetail.status || assetDetail.status === 0) {
						bidStatusStageShow += '<span class="auction-status auction-status-' + assetDetail.status + '">' + statusShow(
							assetDetail.status) + '</span>';
					}
					if (assetDetail.stage || assetDetail.stage === 0) {
						bidStatusStageShow += '<span class="auction-stage">' + stageShow(assetDetail.stage) + '</span>';
					}

					$('.bid-status-stage').html(bidStatusStageShow);
					//时间、价格
					let timeAmountShow = '';
					timeAmountShow += '<div class="amount">' +
						'<span>' + amountTextShow(assetDetail.status) + '</span>' +
						'<span class="amount-text">' + amountShow(assetDetail) + '</span>' +
						'</div>' +
						'<div class="time">' +
						'<span>' + timeTextShow(assetDetail.status) + '</span>' +
						'<span class="time-text">' + timeShow(assetDetail) + '</span>' +
						'</div>';
					$('.bd-info-amount-time').append(timeAmountShow);
					//明细
					let bdInfoMainShow = '';
					bdInfoMainShow += '<div>' +
						'<div>标的类型 : ' + bidTypeShow(assetDetail.type) + '</div>' +
						'<div>详细地址 : ' + textShow(assetDetail.address) + '</div>' +
						'<div>处理单位 : ' + textShow(assetDetail.handleUnit) + '</div>' +
						'<div>拍卖平台 : ' + textShow(assetDetail.auctionPlatform) + '</div>' +
						'<div>评估价 : ' + toPrice(assetDetail.evaluationPrice) + '</div>' +
						'<div>';
					$('.bd-info-main').append(bdInfoMainShow);
					//微信扫码关注
					let weiImgShow = '';
					weiImgShow +=
						'<div class="wei-show flex flex-direction-column flex-align-items-center"><img src="../../public/image/weixin.png"/><span>微信扫码关注</span></div>'
					// $('.bd-info-main').append(weiImgShow);
					//预约看样、竞拍咨询
					if (assetDetail.status == 9) {
						$('.bid-order').show();
						$('.bid-order').css('display', 'inline-block');
					}

					$('.appointment-popup form').attr('action', httpUrl + api.bookAdd)
					$('.bid-order').click(function() {
						if (assetDetail.isBooked) {
							$(document).dialog({
								type: 'notice',
								infoText: '您已经预约过了',
								autoClose: 1500,
								position: 'center'
							});
							return
						}
						$('.appointment-popup-box').show();
					})
					$('.appointment-popup .title').click(function() {
						$('.appointment-popup-box').hide();
						mobileNum = null; //预约号码
						nameText = ''; //预约姓名
						smcodeText = null; //预约验证码
						ifSmcodeGet = false; //是否获取过验证码
						smcodeOk = true; //是否可以获取验证码
						$('.name-input').val("");
						$('.smcode-input').val("");
						$('.mobile-input').val("");
					})
					//竞买公告
					if (assetDetail.announcement) {
						$('#announcement .content').html(assetDetail.announcement);
					} else {
						$('#announcement').hide();
						$('.bd-mx-title1').hide();
					}
					//竞买须知
					if (assetDetail.announcement) {
						$('#notice .content').html(assetDetail.notice);
					} else {
						$('#notice').hide();
						$('.bd-mx-title2').hide();
					}
					//拍卖详情
					$('.handle-unit').append(assetDetail.handleUnit ? assetDetail.handleUnit : '--');
					$('.bidding-cycle').append(assetDetail.biddingCycle ? assetDetail.biddingCycle : '--');
					$('.price').append(assetDetail.price ? '￥' + assetDetail.price + '元' : '--');
					$('.bond').append(assetDetail.bond ? '￥' + assetDetail.bond + '元' : '--');
					$('.auction').append(assetDetail.auction ? assetDetail.auction == 0 ? '线上' : '线下' : '--');
					$('.preemption').append(assetDetail.preemption ? assetDetail.preemption : '--');
					//标的物介绍
					if (assetDetail.html) {
						$('.bid-int-table').html(assetDetail.html);
					}
					//授权书
					if (assetDetail.authorization) {
						$('#authorization-b .content').html(assetDetail.authorization);
					} else {
						$('#authorization-b').hide();
						$('.bd-mx-title6').hide();
					}
					//地理位置
					if (assetDetail.address) {
						AMap.plugin('AMap.Geocoder', function() {
							var geocoder = new AMap.Geocoder({
								// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
								city: '全国'
							})

							geocoder.getLocation(assetDetail.address, function(status, result) {
								if (status === 'complete' && result.info === 'OK') {
									let lnglat = result.geocodes[0].location;
									marker.setPosition(lnglat);
									map.add(marker);
									map.setFitView(marker);
								}
							})
						})
						$('#geographical-position .content .name span').html(assetDetail.address);
					} else {
						$('#geographical-position').hide();
						$('.bd-mx-title5').hide();
					}



					let imgListShow = '';
					let filesImgShow = '';
					if (assetDetail.files && assetDetail.files.length > 0) {
						for (let i = 0; i < assetDetail.files.length; i++) {
							let item = assetDetail.files[i];
							filesImgShow += '<span class="files-img-item"><img src="' + item.thumbFileName + '"/></span>';
							imgListShow += '<span class="cover-img-item"><img src="' + item.thumbFileName + '"/></span>';
						}
						$('.bd-img-list-content').append(imgListShow);
						$('.files-list').append(filesImgShow);

						$('.bd-img-list .cover-img-item').eq(0).addClass('cur-img');
						$('.bd-img-cover').css("background-image", "url(" + assetDetail.files[0].thumbFileName + ")");
						//图片列表，鼠标放上
						$('.bd-img-list .cover-img-item').hover(function() {
							let index = $(this).index();
							curImg = index;
							$('.bd-img-list .cover-img-item').removeClass('cur-img');
							$(this).addClass('cur-img');
							$('.bd-img-cover').css("background-image", "url(" + assetDetail.files[curImg].thumbFileName + ")");
						}, function() {});
						$('.previous-btn').hide();
						if (assetDetail.files.length > (imgPage + 1) * imgpageSize) {
							$('.next-btn').show();
						} else {
							$('.next-btn').hide();
						}
						//下一页-图片
						$('.next-btn').click(function() {

							if (assetDetail.files.length > (imgPage + 1) * imgpageSize) {
								imgPage++;
								console.log(-imgPage * 600 + 'px')
								$('.bd-img-list-content').css('left', -imgPage * 600 + 'px')
							}
							if (assetDetail.files.length > (imgPage + 1) * imgpageSize) {
								$('.next-btn').show();
							} else {
								$('.next-btn').hide();
							}
							if (imgPage > 0) {
								$('.previous-btn').show();
							}
						})
						//上一页-图片
						$('.previous-btn').click(function() {
							imgPage--;
							$('.bd-img-list-content').css('left', -imgPage * 600 + 'px');
							if (imgPage < 1) {
								$('.previous-btn').hide();
							}
							$('.next-btn').show();
						})
					} else {
						$('.bd-img-list').hide();
						$('.bd-img-cover').css("background-image", "url(" + assetDetail.cover + ")");
					}
				} else {
					contentShow = '<div class="nodata">' +
						'<img src="./public/image/zanwushuju@2x.png"></img>' +
						'<div>暂无数据</div>' +
						'</div>';
					// $('.bid-list-bot').hide();
				}
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

	//竞拍咨询
	$('.bid-ask').click(function() {
		$('.auction-consult-popup-box').show();
	})
	$('.auction-consult-popup-box .close-icon').click(function() {
		$('.auction-consult-popup-box').hide();
	})

	//获取验证码
	$('.smcode').click(function() {
		if (!smcodeOk) {
			return
		}
		console.log(mobileNum)
		if (!mobileNum) {
			$(document).dialog({
				type: 'notice',
				infoText: '请输入手机号码',
				autoClose: 1500,
				position: 'center'
			});
			return;
		}
		if (!isMobile(mobileNum)) {
			$(document).dialog({
				type: 'notice',
				infoText: '请填写正确的手机号码',
				autoClose: 1500,
				position: 'center'
			});
			return;
		}
		httpPostForm(api.smSend, {
				mobile: mobileNum,
				type: 'ASSETBOOK'
			},
			function success(result) {
				console.log(result)
				$(document).dialog({
					type: 'notice',
					infoText: '发送成功',
					autoClose: 1500,
					position: 'center'
				});
				ifSmcodeGet = true;
				let authTime = 60
				let timer = setInterval(() => {
					$('.smcode').text('重新发送' + (--authTime) + 's')
					smcodeOk = false
					if (authTime == -1) {
						clearInterval(timer)
						$('.smcode').text('获取验证码')
						smcodeOk = true
					}
				}, 1000)
			},
			function complete(xhr, status) {

			},
			function error(xhr, type) {
				$(document).dialog({
					type: 'notice',
					infoText: xhr && xhr.message ? xhr.message : '获取验证码失败',
					autoClose: 1500,
					position: 'center'
				});
			})
	})
	//确认预约
	$('.submit-btn').click(function() {
		if (!nameText) {
			$(document).dialog({
				type: 'notice',
				infoText: '请输入姓名',
				autoClose: 1500,
				position: 'center'
			});
			return;
		}
		if (!mobileNum) {
			$(document).dialog({
				type: 'notice',
				infoText: '请输入手机号码',
				autoClose: 1500,
				position: 'center'
			});
			return;
		}
		if (!isMobile(mobileNum)) {
			$(document).dialog({
				type: 'notice',
				infoText: '请填写正确的手机号码',
				autoClose: 1500,
				position: 'center'
			});
			return;
		}
		if (!ifSmcodeGet) {
			$(document).dialog({
				type: 'notice',
				infoText: '请获取验证码',
				autoClose: 1500,
				position: 'center'
			});
			return;
		}
		if (!smcodeText) {
			$(document).dialog({
				type: 'notice',
				infoText: '请输入验证码',
				autoClose: 1500,
				position: 'center'
			});
			return;
		}
		let userId = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).id : '';
		httpGet(api.bookAdd, {
				userId: userId,
				assetId: assetId,
				mobile: mobileNum,
				smcode: smcodeText,
				name: nameText,
				page: '1'
			},
			function success(result) {
				console.log(result)
				$(document).dialog({
					type: 'notice',
					infoText: '预约成功',
					autoClose: 1500,
					position: 'center'
				});
				$('.appointment-popup-box').hide();
				mobileNum = null; //预约号码
				nameText = ''; //预约姓名
				smcodeText = null; //预约验证码
				ifSmcodeGet = false; //是否获取过验证码
				smcodeOk = true; //是否可以获取验证码
				$('.name-input').val("");
				$('.smcode-input').val("");
				$('.mobile-input').val("");
			},
			function complete(xhr, status) {

			},
			function error(xhr, type) {
				$(document).dialog({
					type: 'notice',
					infoText: xhr && xhr.message ? xhr.message : '提交失败',
					autoClose: 1500,
					position: 'center'
				});
			})
	})
	//监听预约手机号输入框
	$('.mobile-input').keyup(function() {
		console.log($(this).val())
		mobileNum = $(this).val();
	});
	//监听预约姓名输入框
	$('.name-input').keyup(function() {
		console.log($(this).val())
		nameText = $(this).val();
	});
	//监听验证码输入框
	$('.smcode-input').keyup(function() {
		console.log($(this).val())
		smcodeText = $(this).val();
	});

	//为你推荐
	let curRecommend = 1;
	function hotRecommendListGet(city,assetType) {
		let toast = $(document).dialog({
			type: 'toast',
			infoIcon: '../../public/image/loading.gif',
			infoText: '',
		});
		httpGet(api.assetRecommend, {
				type: curRecommend,
				pageNo: 1,
				pageSize: 4,
				paging: true,
				city: city,
				assetType: assetType
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
							'<div class="hr-m-name">' + item.name + '</div>' +
							'<div class="amount">￥' + amountShow(item) + '</div>' +
							'</div>' +
							'</div>';
					}
				} else {
					contentShow = '<div class="nodata">' +
						'<img src="./public/image/zanwushuju@2x.png"></img>' +
						'<div>暂无数据</div>' +
						'</div>';
				}

				$('.hot-recommend-content').html(contentShow);
				$('.hot-recommend-content .hr-m').click(function() {
					let index = $(this).index();
					window.location.href = '../bid-detail/index.html?id=' + recommendList[index].id
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

	//搜索按钮
	$('.search-input-btn').click(function() {
		let searchVal = $('.search-input').val();
		if (searchVal) {
			window.location.href = '../bid-category/index.html?searchText=' + encodeURI(encodeURI(searchVal));
		}
	})
})
