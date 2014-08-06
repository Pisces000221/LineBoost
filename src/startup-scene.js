var cc = cc || {};
var lboost = lboost || {};

lboost.StartupScene = cc.Scene.extend({
    onEnter: function () {
        'use strict';
        this._super();
        var size = cc.director.getWinSize();

        // the title
        var titleLabel = cc.LabelTTF.create('Line Boost', '', 58);
        titleLabel.setPosition(size.width / 2, size.height * 0.8);
        this.addChild(titleLabel);
        var descLabel = cc.LabelTTF.create('猛戳开始', '', 36);
        descLabel.setPosition(size.width / 2, size.height * 0.4);
        descLabel.setOpacity(0);
        this.addChild(descLabel);
        descLabel.runAction(cc.Sequence.create(
            cc.DelayTime.create(1),
            cc.FadeIn.create(1.2 * 255 / 192),
            cc.CallFunc.create(function() {
                descLabel.runAction(cc.RepeatForever.create(cc.Sequence.create(
                    cc.FadeTo.create(1.2, 192), cc.FadeTo.create(1.2, 255)
                )));
            })
        ));
        // the version display
        var verLabel = cc.LabelTTF.create('Rev 21', '', 28);
        verLabel.setAnchorPoint(cc.p(0, 0));
        verLabel.setPosition(cc.p(0, 20));
        this.addChild(verLabel);
        // the acknowledgement
        var engineLabel = cc.LabelTTF.create('强力外援: Cocos2d-x HTML5', '', 20);
        engineLabel.setColor(cc.color(128, 128, 255));
        engineLabel.setAnchorPoint(cc.p(0.5, 0));
        engineLabel.setPosition(cc.p(size.width / 2, 0));
        this.addChild(engineLabel);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                cc.director.runScene(cc.TransitionFade.create(1, new lboost.TutorialScene(), cc.color(0, 0, 0)));
                return true;
            }
        }, this);
    }
});
