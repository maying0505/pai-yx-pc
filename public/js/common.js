const mapKey = '992d49d7ab83163ac8fe4f4c6bbfb52f';
const hotRecommend = [
	{
		id: 1,
		text: '今日推荐'
	},
	{
		id: 2,
		text: '超值资产'
	},
	{
		id: 3,
		text: '最新发布'
	}
];
const newsTabList = [
	{
		id: 'efb773bec445499a8b134674931b57ee',
		text: '公司新闻'
	},
	{
		id: '4cf3b465c9664c5e910896985a25f1d1',
		text: '媒体报道'
	},
];
const stageList = [
	{
		id: 0,
		text: '一拍'
	},
	{
		id: 1,
		text: '二拍'
	},
	{
		id: 2,
		text: '变卖'
	}
];
const bidAddressList = [
	{
		id: 0,
		text: '昆明'
	},
	{
		id: 1,
		text: '临沧'
	},
	{
		id: 2,
		text: '红河'
	},
	{
		id: 3,
		text: '广西'
	},
	{
		id: 4,
		text: '湖南'
	}
];
const sortList = [{
  id: -1,
  key: 0,
  text: '默认排序'
}, {
  id: 1,
  key: 1,
  text: '价格升序'
}, {
  id: 2,
  key: 2,
  text: '价格降序'
}, {
  id: 3,
  key: 3,
  text: '最新发布'
}]


const typeList = [
  {
    id: 0,
    text: '房产'
  },
  {
    id: 1,
    text: '机动车'
  },
  {
    id: 2,
    text: '土地',
	},
  {
    id: 3,
    text: '股权'
	},
	{
    id: 4,
    text: '其他'
  },
];

const statusStyle = [
	{
		id: -1, name: '不限'
	},
	{
		id: 12, name: '进行中'
	},
	{
		id: 11, name: '即将开始'
	},
	{
		id: 9, name: '看样预约中'
	},
	{
		id: 13, name: '成交'
	},
	{
		id: 18, name: '暂缓'
	}
];

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

const statusList =[
  {id:0,text:'不限'},
  {id:11,text:'即将开始'},
  {id:13,text:'已结束'},
  {id:14,text:'流拍'},
  {id:15,text:'终止'},
  {id:16,text:'撤回'},
];

const timeList =[
  {id:0,text:'不限'},
  {id:1,text:'今天'},
  {id:2,text:'3天内'},
  {id:3,text:'7天内'}
];

const provinceCityList = [{"id":"110000","areaName":"北京","child":[{"id":"110100","areaName":"北京","child":null}]},{"id":"120000","areaName":"天津","child":[{"id":"120100","areaName":"天津","child":null}]},{"id":"130000","areaName":"河北","child":[{"id":"130100","areaName":"石家庄","child":null},{"id":"130200","areaName":"唐山","child":null},{"id":"130300","areaName":"秦皇岛","child":null},{"id":"130400","areaName":"邯郸","child":null},{"id":"130500","areaName":"邢台","child":null},{"id":"130600","areaName":"保定","child":null},{"id":"130700","areaName":"张家口","child":null},{"id":"130800","areaName":"承德","child":null},{"id":"130900","areaName":"沧州","child":null},{"id":"131000","areaName":"廊坊","child":null},{"id":"131100","areaName":"衡水","child":null}]},{"id":"140000","areaName":"山西","child":[{"id":"140100","areaName":"太原","child":null},{"id":"140200","areaName":"大同","child":null},{"id":"140300","areaName":"阳泉","child":null},{"id":"140400","areaName":"长治","child":null},{"id":"140500","areaName":"晋城","child":null},{"id":"140600","areaName":"朔州","child":null},{"id":"140700","areaName":"晋中","child":null},{"id":"140800","areaName":"运城","child":null},{"id":"140900","areaName":"忻州","child":null},{"id":"141000","areaName":"临汾","child":null},{"id":"141100","areaName":"吕梁","child":null}]},{"id":"150000","areaName":"内蒙古","child":[{"id":"150100","areaName":"呼和浩特","child":null},{"id":"150200","areaName":"包头","child":null},{"id":"150300","areaName":"乌海","child":null},{"id":"150400","areaName":"赤峰","child":null},{"id":"150500","areaName":"通辽","child":null},{"id":"150600","areaName":"鄂尔多斯","child":null},{"id":"150700","areaName":"呼伦贝尔","child":null},{"id":"150800","areaName":"巴彦淖尔","child":null},{"id":"150900","areaName":"乌兰察布","child":null},{"id":"152200","areaName":"兴安","child":null},{"id":"152500","areaName":"锡林郭勒","child":null},{"id":"152900","areaName":"阿拉善","child":null}]},{"id":"210000","areaName":"辽宁","child":[{"id":"210100","areaName":"沈阳","child":null},{"id":"210200","areaName":"大连","child":null},{"id":"210300","areaName":"鞍山","child":null},{"id":"210400","areaName":"抚顺","child":null},{"id":"210500","areaName":"本溪","child":null},{"id":"210600","areaName":"丹东","child":null},{"id":"210700","areaName":"锦州","child":null},{"id":"210800","areaName":"营口","child":null},{"id":"210900","areaName":"阜新","child":null},{"id":"211000","areaName":"辽阳","child":null},{"id":"211100","areaName":"盘锦","child":null},{"id":"211200","areaName":"铁岭","child":null},{"id":"211300","areaName":"朝阳","child":null},{"id":"211400","areaName":"葫芦岛","child":null}]},{"id":"220000","areaName":"吉林","child":[{"id":"220100","areaName":"长春","child":null},{"id":"220200","areaName":"吉林","child":null},{"id":"220300","areaName":"四平","child":null},{"id":"220400","areaName":"辽源","child":null},{"id":"220500","areaName":"通化","child":null},{"id":"220600","areaName":"白山","child":null},{"id":"220700","areaName":"松原","child":null},{"id":"220800","areaName":"白城","child":null},{"id":"222400","areaName":"延边","child":null}]},{"id":"230000","areaName":"黑龙江","child":[{"id":"230100","areaName":"哈尔滨","child":null},{"id":"230200","areaName":"齐齐哈尔","child":null},{"id":"230300","areaName":"鸡西","child":null},{"id":"230400","areaName":"鹤岗","child":null},{"id":"230500","areaName":"双鸭山","child":null},{"id":"230600","areaName":"大庆","child":null},{"id":"230700","areaName":"伊春","child":null},{"id":"230800","areaName":"佳木斯","child":null},{"id":"230900","areaName":"七台河","child":null},{"id":"231000","areaName":"牡丹江","child":null},{"id":"231100","areaName":"黑河","child":null},{"id":"231200","areaName":"绥化","child":null},{"id":"232700","areaName":"大兴安岭","child":null}]},{"id":"310000","areaName":"上海","child":[{"id":"310100","areaName":"上海","child":null}]},{"id":"320000","areaName":"江苏","child":[{"id":"320100","areaName":"南京","child":null},{"id":"320200","areaName":"无锡","child":null},{"id":"320300","areaName":"徐州","child":null},{"id":"320400","areaName":"常州","child":null},{"id":"320500","areaName":"苏州","child":null},{"id":"320600","areaName":"南通","child":null},{"id":"320700","areaName":"连云港","child":null},{"id":"320800","areaName":"淮安","child":null},{"id":"320900","areaName":"盐城","child":null},{"id":"321000","areaName":"扬州","child":null},{"id":"321100","areaName":"镇江","child":null},{"id":"321200","areaName":"泰州","child":null},{"id":"321300","areaName":"宿迁","child":null}]},{"id":"330000","areaName":"浙江","child":[{"id":"330100","areaName":"杭州","child":null},{"id":"330200","areaName":"宁波","child":null},{"id":"330300","areaName":"温州","child":null},{"id":"330400","areaName":"嘉兴","child":null},{"id":"330500","areaName":"湖州","child":null},{"id":"330600","areaName":"绍兴","child":null},{"id":"330700","areaName":"金华","child":null},{"id":"330800","areaName":"衢州","child":null},{"id":"330900","areaName":"舟山","child":null},{"id":"331000","areaName":"台州","child":null},{"id":"331100","areaName":"丽水","child":null}]},{"id":"340000","areaName":"安徽","child":[{"id":"340100","areaName":"合肥","child":null},{"id":"340200","areaName":"芜湖","child":null},{"id":"340300","areaName":"蚌埠","child":null},{"id":"340400","areaName":"淮南","child":null},{"id":"340500","areaName":"马鞍山","child":null},{"id":"340600","areaName":"淮北","child":null},{"id":"340700","areaName":"铜陵","child":null},{"id":"340800","areaName":"安庆","child":null},{"id":"341000","areaName":"黄山","child":null},{"id":"341100","areaName":"滁州","child":null},{"id":"341200","areaName":"阜阳","child":null},{"id":"341300","areaName":"宿州","child":null},{"id":"341500","areaName":"六安","child":null},{"id":"341600","areaName":"亳州","child":null},{"id":"341700","areaName":"池州","child":null},{"id":"341800","areaName":"宣城","child":null}]},{"id":"350000","areaName":"福建","child":[{"id":"350100","areaName":"福州","child":null},{"id":"350200","areaName":"厦门","child":null},{"id":"350300","areaName":"莆田","child":null},{"id":"350400","areaName":"三明","child":null},{"id":"350500","areaName":"泉州","child":null},{"id":"350600","areaName":"漳州","child":null},{"id":"350700","areaName":"南平","child":null},{"id":"350800","areaName":"龙岩","child":null},{"id":"350900","areaName":"宁德","child":null}]},{"id":"360000","areaName":"江西","child":[{"id":"360100","areaName":"南昌","child":null},{"id":"360200","areaName":"景德镇","child":null},{"id":"360300","areaName":"萍乡","child":null},{"id":"360400","areaName":"九江","child":null},{"id":"360500","areaName":"新余","child":null},{"id":"360600","areaName":"鹰潭","child":null},{"id":"360700","areaName":"赣州","child":null},{"id":"360800","areaName":"吉安","child":null},{"id":"360900","areaName":"宜春","child":null},{"id":"361000","areaName":"抚州","child":null},{"id":"361100","areaName":"上饶","child":null}]},{"id":"370000","areaName":"山东","child":[{"id":"370100","areaName":"济南","child":null},{"id":"370200","areaName":"青岛","child":null},{"id":"370300","areaName":"淄博","child":null},{"id":"370400","areaName":"枣庄","child":null},{"id":"370500","areaName":"东营","child":null},{"id":"370600","areaName":"烟台","child":null},{"id":"370700","areaName":"潍坊","child":null},{"id":"370800","areaName":"济宁","child":null},{"id":"370900","areaName":"泰安","child":null},{"id":"371000","areaName":"威海","child":null},{"id":"371100","areaName":"日照","child":null},{"id":"371300","areaName":"临沂","child":null},{"id":"371400","areaName":"德州","child":null},{"id":"371500","areaName":"聊城","child":null},{"id":"371600","areaName":"滨州","child":null},{"id":"371700","areaName":"菏泽","child":null}]},{"id":"410000","areaName":"河南","child":[{"id":"410100","areaName":"郑州","child":null},{"id":"410200","areaName":"开封","child":null},{"id":"410300","areaName":"洛阳","child":null},{"id":"410400","areaName":"平顶山","child":null},{"id":"410500","areaName":"安阳","child":null},{"id":"410600","areaName":"鹤壁","child":null},{"id":"410700","areaName":"新乡","child":null},{"id":"410800","areaName":"焦作","child":null},{"id":"410900","areaName":"濮阳","child":null},{"id":"411000","areaName":"许昌","child":null},{"id":"411100","areaName":"漯河","child":null},{"id":"411200","areaName":"三门峡","child":null},{"id":"411300","areaName":"南阳","child":null},{"id":"411400","areaName":"商丘","child":null},{"id":"411500","areaName":"信阳","child":null},{"id":"411600","areaName":"周口","child":null},{"id":"411700","areaName":"驻马店","child":null},{"id":"419001","areaName":"济源","child":null}]},{"id":"420000","areaName":"湖北","child":[{"id":"420100","areaName":"武汉","child":null},{"id":"420200","areaName":"黄石","child":null},{"id":"420300","areaName":"十堰","child":null},{"id":"420500","areaName":"宜昌","child":null},{"id":"420600","areaName":"襄阳","child":null},{"id":"420700","areaName":"鄂州","child":null},{"id":"420800","areaName":"荆门","child":null},{"id":"420900","areaName":"孝感","child":null},{"id":"421000","areaName":"荆州","child":null},{"id":"421100","areaName":"黄冈","child":null},{"id":"421200","areaName":"咸宁","child":null},{"id":"421300","areaName":"随州","child":null},{"id":"422800","areaName":"恩施","child":null},{"id":"429004","areaName":"仙桃","child":null},{"id":"429005","areaName":"潜江","child":null},{"id":"429006","areaName":"天门","child":null},{"id":"429021","areaName":"神农架","child":null}]},{"id":"430000","areaName":"湖南","child":[{"id":"430100","areaName":"长沙","child":null},{"id":"430200","areaName":"株洲","child":null},{"id":"430300","areaName":"湘潭","child":null},{"id":"430400","areaName":"衡阳","child":null},{"id":"430500","areaName":"邵阳","child":null},{"id":"430600","areaName":"岳阳","child":null},{"id":"430700","areaName":"常德","child":null},{"id":"430800","areaName":"张家界","child":null},{"id":"430900","areaName":"益阳","child":null},{"id":"431000","areaName":"郴州","child":null},{"id":"431100","areaName":"永州","child":null},{"id":"431200","areaName":"怀化","child":null},{"id":"431300","areaName":"娄底","child":null},{"id":"433100","areaName":"湘西","child":null}]},{"id":"440000","areaName":"广东","child":[{"id":"440100","areaName":"广州","child":null},{"id":"440200","areaName":"韶关","child":null},{"id":"440300","areaName":"深圳","child":null},{"id":"440400","areaName":"珠海","child":null},{"id":"440500","areaName":"汕头","child":null},{"id":"440600","areaName":"佛山","child":null},{"id":"440700","areaName":"江门","child":null},{"id":"440800","areaName":"湛江","child":null},{"id":"440900","areaName":"茂名","child":null},{"id":"441200","areaName":"肇庆","child":null},{"id":"441300","areaName":"惠州","child":null},{"id":"441400","areaName":"梅州","child":null},{"id":"441500","areaName":"汕尾","child":null},{"id":"441600","areaName":"河源","child":null},{"id":"441700","areaName":"阳江","child":null},{"id":"441800","areaName":"清远","child":null},{"id":"441900","areaName":"东莞","child":null},{"id":"442000","areaName":"中山","child":null},{"id":"445100","areaName":"潮州","child":null},{"id":"445200","areaName":"揭阳","child":null},{"id":"445300","areaName":"云浮","child":null}]},{"id":"450000","areaName":"广西","child":[{"id":"450100","areaName":"南宁","child":null},{"id":"450200","areaName":"柳州","child":null},{"id":"450300","areaName":"桂林","child":null},{"id":"450400","areaName":"梧州","child":null},{"id":"450500","areaName":"北海","child":null},{"id":"450600","areaName":"防城港","child":null},{"id":"450700","areaName":"钦州","child":null},{"id":"450800","areaName":"贵港","child":null},{"id":"450900","areaName":"玉林","child":null},{"id":"451000","areaName":"百色","child":null},{"id":"451100","areaName":"贺州","child":null},{"id":"451200","areaName":"河池","child":null},{"id":"451300","areaName":"来宾","child":null},{"id":"451400","areaName":"崇左","child":null}]},{"id":"460000","areaName":"海南","child":[{"id":"460100","areaName":"海口","child":null},{"id":"460200","areaName":"三亚","child":null},{"id":"460300","areaName":"三沙","child":null},{"id":"460400","areaName":"儋州","child":null},{"id":"469001","areaName":"五指山","child":null},{"id":"469002","areaName":"琼海","child":null},{"id":"469005","areaName":"文昌","child":null},{"id":"469006","areaName":"万宁","child":null},{"id":"469007","areaName":"东方","child":null},{"id":"469021","areaName":"定安","child":null},{"id":"469022","areaName":"屯昌","child":null},{"id":"469023","areaName":"澄迈","child":null},{"id":"469024","areaName":"临高","child":null},{"id":"469025","areaName":"白沙","child":null},{"id":"469026","areaName":"昌江","child":null},{"id":"469027","areaName":"乐东","child":null},{"id":"469028","areaName":"陵水","child":null},{"id":"469029","areaName":"保亭","child":null},{"id":"469030","areaName":"琼中","child":null}]},{"id":"500000","areaName":"重庆","child":[{"id":"500100","areaName":"重庆","child":null}]},{"id":"510000","areaName":"四川","child":[{"id":"510100","areaName":"成都","child":null},{"id":"510300","areaName":"自贡","child":null},{"id":"510400","areaName":"攀枝花","child":null},{"id":"510500","areaName":"泸州","child":null},{"id":"510600","areaName":"德阳","child":null},{"id":"510700","areaName":"绵阳","child":null},{"id":"510800","areaName":"广元","child":null},{"id":"510900","areaName":"遂宁","child":null},{"id":"511000","areaName":"内江","child":null},{"id":"511100","areaName":"乐山","child":null},{"id":"511300","areaName":"南充","child":null},{"id":"511400","areaName":"眉山","child":null},{"id":"511500","areaName":"宜宾","child":null},{"id":"511600","areaName":"广安","child":null},{"id":"511700","areaName":"达州","child":null},{"id":"511800","areaName":"雅安","child":null},{"id":"511900","areaName":"巴中","child":null},{"id":"512000","areaName":"资阳","child":null},{"id":"513200","areaName":"阿坝","child":null},{"id":"513300","areaName":"甘孜","child":null},{"id":"513400","areaName":"凉山","child":null}]},{"id":"520000","areaName":"贵州","child":[{"id":"520100","areaName":"贵阳","child":null},{"id":"520200","areaName":"六盘水","child":null},{"id":"520300","areaName":"遵义","child":null},{"id":"520400","areaName":"安顺","child":null},{"id":"520500","areaName":"毕节","child":null},{"id":"520600","areaName":"铜仁","child":null},{"id":"522300","areaName":"黔西南","child":null},{"id":"522600","areaName":"黔东南","child":null},{"id":"522700","areaName":"黔南","child":null}]},{"id":"530000","areaName":"云南","child":[{"id":"530100","areaName":"昆明","child":null},{"id":"530300","areaName":"曲靖","child":null},{"id":"530400","areaName":"玉溪","child":null},{"id":"530500","areaName":"保山","child":null},{"id":"530600","areaName":"昭通","child":null},{"id":"530700","areaName":"丽江","child":null},{"id":"530800","areaName":"普洱","child":null},{"id":"530900","areaName":"临沧","child":null},{"id":"532300","areaName":"楚雄","child":null},{"id":"532500","areaName":"红河","child":null},{"id":"532600","areaName":"文山","child":null},{"id":"532800","areaName":"西双版纳","child":null},{"id":"532900","areaName":"大理","child":null},{"id":"533100","areaName":"德宏","child":null},{"id":"533300","areaName":"怒江","child":null},{"id":"533400","areaName":"迪庆","child":null}]},{"id":"540000","areaName":"西藏","child":[{"id":"540100","areaName":"拉萨","child":null},{"id":"540200","areaName":"日喀则","child":null},{"id":"540300","areaName":"昌都","child":null},{"id":"540400","areaName":"林芝","child":null},{"id":"540500","areaName":"山南","child":null},{"id":"540600","areaName":"那曲","child":null},{"id":"542500","areaName":"阿里","child":null}]},{"id":"610000","areaName":"陕西","child":[{"id":"610100","areaName":"西安","child":null},{"id":"610200","areaName":"铜川","child":null},{"id":"610300","areaName":"宝鸡","child":null},{"id":"610400","areaName":"咸阳","child":null},{"id":"610500","areaName":"渭南","child":null},{"id":"610600","areaName":"延安","child":null},{"id":"610700","areaName":"汉中","child":null},{"id":"610800","areaName":"榆林","child":null},{"id":"610900","areaName":"安康","child":null},{"id":"611000","areaName":"商洛","child":null}]},{"id":"620000","areaName":"甘肃","child":[{"id":"620100","areaName":"兰州","child":null},{"id":"620200","areaName":"嘉峪关","child":null},{"id":"620300","areaName":"金昌","child":null},{"id":"620400","areaName":"白银","child":null},{"id":"620500","areaName":"天水","child":null},{"id":"620600","areaName":"武威","child":null},{"id":"620700","areaName":"张掖","child":null},{"id":"620800","areaName":"平凉","child":null},{"id":"620900","areaName":"酒泉","child":null},{"id":"621000","areaName":"庆阳","child":null},{"id":"621100","areaName":"定西","child":null},{"id":"621200","areaName":"陇南","child":null},{"id":"622900","areaName":"临夏","child":null},{"id":"623000","areaName":"甘南","child":null}]},{"id":"630000","areaName":"青海","child":[{"id":"630100","areaName":"西宁","child":null},{"id":"630200","areaName":"海东","child":null},{"id":"632200","areaName":"海北","child":null},{"id":"632300","areaName":"黄南","child":null},{"id":"632500","areaName":"海南","child":null},{"id":"632600","areaName":"果洛","child":null},{"id":"632700","areaName":"玉树","child":null},{"id":"632800","areaName":"海西","child":null}]},{"id":"640000","areaName":"宁夏","child":[{"id":"640100","areaName":"银川","child":null},{"id":"640200","areaName":"石嘴山","child":null},{"id":"640300","areaName":"吴忠","child":null},{"id":"640400","areaName":"固原","child":null},{"id":"640500","areaName":"中卫","child":null}]},{"id":"650000","areaName":"新疆","child":[{"id":"650100","areaName":"乌鲁木齐","child":null},{"id":"650200","areaName":"克拉玛依","child":null},{"id":"650400","areaName":"吐鲁番","child":null},{"id":"650500","areaName":"哈密","child":null},{"id":"652300","areaName":"昌吉","child":null},{"id":"652700","areaName":"博尔塔拉","child":null},{"id":"652800","areaName":"巴音郭楞","child":null},{"id":"652900","areaName":"阿克苏","child":null},{"id":"653000","areaName":"克孜勒苏柯尔克孜","child":null},{"id":"653100","areaName":"喀什","child":null},{"id":"653200","areaName":"和田","child":null},{"id":"654000","areaName":"伊犁","child":null},{"id":"654200","areaName":"塔城","child":null},{"id":"654300","areaName":"阿勒泰","child":null},{"id":"659001","areaName":"石河子","child":null},{"id":"659002","areaName":"阿拉尔","child":null},{"id":"659003","areaName":"图木舒克","child":null},{"id":"659004","areaName":"五家渠","child":null},{"id":"659005","areaName":"北屯","child":null},{"id":"659006","areaName":"铁门关","child":null},{"id":"659007","areaName":"双河","child":null},{"id":"659008","areaName":"可克达拉","child":null},{"id":"659009","areaName":"昆玉","child":null}]},{"id":"710000","areaName":"台湾","child":[{"id":"710100","areaName":"台北","child":null},{"id":"710200","areaName":"高雄","child":null},{"id":"710300","areaName":"台南","child":null},{"id":"710400","areaName":"台中","child":null},{"id":"710600","areaName":"南投","child":null},{"id":"710700","areaName":"基隆","child":null},{"id":"710800","areaName":"新竹","child":null},{"id":"710900","areaName":"嘉义","child":null},{"id":"711100","areaName":"新北","child":null},{"id":"711200","areaName":"宜兰","child":null},{"id":"711300","areaName":"新竹","child":null},{"id":"711400","areaName":"桃园","child":null},{"id":"711500","areaName":"苗栗","child":null},{"id":"711700","areaName":"彰化","child":null},{"id":"711900","areaName":"嘉义","child":null},{"id":"712100","areaName":"云林","child":null},{"id":"712400","areaName":"屏东","child":null},{"id":"712500","areaName":"台东","child":null},{"id":"712600","areaName":"花莲","child":null},{"id":"712700","areaName":"澎湖","child":null}]},{"id":"810000","areaName":"香港","child":[{"id":"810100","areaName":"香港","child":null}]},{"id":"820000","areaName":"澳门","child":[{"id":"820100","areaName":"澳门","child":null}]}];

/**
 * 金额万元格式
 */
const amountFormat = function(num) {
	let priceA = delcommafy(num);
	let price = '';
	if (Number(priceA) > 100) {
		priceA = (Number(priceA) / 10000).toFixed(2);
		price = priceA + '万';
	} else {
		priceA = Number(priceA).toFixed(2);
		price = priceA;
	}
	return price;
}

// 将金额类型转为数字类型
const toNum = function (str) {
	return str.replace(/\,|\￥/g, "");
}
 
// 保留两位小数（四舍五入）
const toPrice = function (num) {
	if (num) {
		num = parseFloat(toNum(num)).toFixed(2).toString().split(".");
		num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
		return "￥" + num.join(".");
	} else {
		return '--'
	}
	
}

//内容显示
const textShow = function(text){
	if(text){
		return text
	} else {
		return '--'
	}
}

/**
 * 金额去除千位分隔符
 * @param {*} num 
 */
const delcommafy = function(num) {
	    if (num || num == 0) {
	      if ((num + "").trim() == "") {
	        return "--";
	      }
	      num = num.replace(/,/gi, '');
	      return num;
	    } else {
	      return "--";
	    }
}
/**
 * 获取地址参数
 */
const getQueryString = function (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
/**
 * 手机号验证
 */
const	isMobile = function(mobile) {
	const mobile_regex = /^((1[0-9]))\d{9}$/;
	return mobile_regex.test(mobile);
}

//标的类型显示
const bidTypeShow = function (type) {
	for (let i = 0; i < typeList.length; i++) {
		if (typeList[i].id == type) {
			return typeList[i].text
		}
	}
}

//拍卖阶段显示
const stageShow = function (stage) {
	for (let i = 0; i < stageList.length; i++) {
		if (stageList[i].id == stage) {
			return stageList[i].text
		}
	}
}
	
//拍卖状态显示-列表
const statusShow = function (status) {
	return allStatus[status]
}
	
//起拍价、成交价显示
const amountShow = function (item) {
	if (item.status == 13) {
		return item.finalPrice ? amountFormat(item.finalPrice) : '--'
	} else {
		return item.startintPrice ? amountFormat(item.startintPrice) : '--'
	}
}
const amountTextShow = function (status){
	if (status == 13) {
		return '成交价'
	} else {
		return '起拍价'
	}
}

//开拍时间、成交时间显示
const timeShow = function (item) {
	if (item.status == 13) {
		return item.transactionTime ? item.transactionTime : '--'
	} else {
		return item.auctionTime ? item.auctionTime : '--'
	}
}
const timeTextShow = function (status){
	if (status == 13) {
		return '成交时间'
	} else {
		return '开拍时间'
	}
}

