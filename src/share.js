var cc = cc || {};
var lboost = lboost || {};
var WeixinApi = WeixinApi || {};

lboost.share_msg = '我正在玩 Line Boost，根本停不下来！';   // put the text to share here
lboost.share_data = {}; // put the data that are used to upload record
lboost.share_data.total_games = 0;

lboost.call_php = function(php) {
    'use strict';
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = php;
    document.body.appendChild(script);
};

WeixinApi.ready(function(Api) {
    'use strict';

    // 微信分享的数据
    var wxData = {
        appId: '',
        imgUrl : window.location.href + 'res/icon.png',
        link : window.location.href,
        desc : '',
        title : 'Line Boost'
    };

    // 分享的回调
    var wxCallbacks = {
        ready : function() {
            wxData.desc = lboost.share_msg;
        },
        cancel : function(resp) {
        },
        fail : function(resp) {
        },
        confirm : function(resp) {
            // sharing finished, let's count it
            // http://zhidao.baidu.com/link?url=kJD--Uae8dgzfHvUu-uaXodhPFdyJC3ttssX69qpWMGuHN98QQ7FO9YresAC9dEb4xPKAdKZb_aAvugSp6pl3weJm7OiT45HuD8WevE-cpC
            // http://www.cnblogs.com/penny/archive/2008/09/01/1281293.html
            lboost.call_php('php/share_stat.php?time=' + lboost.share_data.time
                + '&score=' + lboost.share_data.score + '&total_games=' + lboost.share_data.total_games);
        },
        all : function(resp) {
        }
    };

    Api.shareToFriend(wxData, wxCallbacks);
    Api.shareToTimeline(wxData, wxCallbacks);
    Api.shareToWeibo(wxData, wxCallbacks);
});
