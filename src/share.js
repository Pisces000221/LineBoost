lboost.share_msg = '';  // put the text to share here
lboost.share_data = {}; // put the data that are used to upload record
lboost.share_data.total_games = 0;

WeixinApi.ready(function(Api) {

    // 微信分享的数据
    var wxData = {
        'appId': '',
        'imgUrl' : '',
        'link' : window.location.href,
        'desc' : '我正在玩 Line Boost，根本停不下来！',
        'title' : 'Line Boost'
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
            // sharing finished
            // http://zhidao.baidu.com/link?url=kJD--Uae8dgzfHvUu-uaXodhPFdyJC3ttssX69qpWMGuHN98QQ7FO9YresAC9dEb4xPKAdKZb_aAvugSp6pl3weJm7OiT45HuD8WevE-cpC
            // http://www.cnblogs.com/penny/archive/2008/09/01/1281293.html
            // TODO: upload your own stat/analytics here
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'php/share_stat.php?time=' + lboost.share_data.time
                + '&score=' + lboost.share_data.score + '&total_games=' + lboost.share_data.total_games;
            document.body.appendChild(script);
        },
        all : function(resp) {
        }
    };

    Api.shareToFriend(wxData, wxCallbacks);
    Api.shareToTimeline(wxData, wxCallbacks);
    Api.shareToWeibo(wxData, wxCallbacks);
});
