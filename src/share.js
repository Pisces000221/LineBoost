lboost.share_msg = '';  // put the text to share here
lboost.share_data = {}; // put the data that are used to upload record
lboost.share_data.total_games = 0;

WeixinApi.ready(function(Api) {

    // 微信分享的数据
    var wxData = {
        'appId': '',
        'imgUrl' : 'http://www.baidufe.com/fe/blog/static/img/weixin-qrcode-2.jpg',
        'link' : 'http://www.baidufe.com',
        'desc' : '我正在玩 Line Boost，根本停不下来！',
        'title' : "Line Boost"
    };

    // 分享的回调
    var wxCallbacks = {
        ready : function() {
            wxData['desc'] = lboost.share_msg;
        },
        cancel : function(resp) {
        },
        fail : function(resp) {
        },
        confirm : function(resp) {
            // share finished
            // TODO: upload your own stat/analytics here
        },
        all : function(resp) {
        }
    };

    Api.shareToFriend(wxData, wxCallbacks);
    Api.shareToTimeline(wxData, wxCallbacks);
    Api.shareToWeibo(wxData, wxCallbacks);
});
