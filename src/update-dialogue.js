var cc = cc || {};
var lboost = lboost || {};
var str = str || {};

// http://www.w3school.com.cn/js/js_cookies.asp
function setCookie(c_name, value, expiredays) {
    'use strict';
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + '=' + escape(value) +
        ((expiredays === null) ? '' : ';expires=' + exdate.toGMTString());
}

function getCookie(c_name) {
    'use strict';
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + '=');
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(';', c_start);
            if (c_end === -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}

lboost.UpdateDialogue = cc.LayerColor.extend({
    onEnter: function() {
        'use strict';
        this._super();
        this.setColor(cc.color(0, 0, 0, 192));
        var size = cc.director.getWinSize();
        var jslinthappy__parent = this;

        var lastPlayedVer = getCookie('last_ver');
        if (lastPlayedVer !== lboost.rev.toString()) {
            var label = cc.LabelTTF.create(lboost.update_desc, '', 30, cc.size(size.width, 0));
            label.setAnchorPoint(cc.p(0, 1));
            label.setPosition(cc.p(0, size.height));
            this.addChild(label);
            setCookie('last_ver', lboost.rev.toString());
            var l = {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function(touch, event) {
                    jslinthappy__parent.runAction(cc.Sequence.create(
                        cc.EaseSineIn.create(cc.MoveBy.create(0.3, cc.p(-size.width, 0))),
                        cc.RemoveSelf.create()));
                    return true;
                }
            };
            cc.eventManager.addListener(l, this);
            cc.eventManager.setPriority(l, -10);
        } else {
            this.removeFromParent();
        }
    }
});

lboost.UpdateDialogue.create = function() {
    'use strict';
    return new lboost.UpdateDialogue();
};
