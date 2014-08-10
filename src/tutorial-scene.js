var cc = cc || {};
var lboost = lboost || {};
var str = str || {};

lboost.TutorialScene = cc.Scene.extend({
    onEnter: function () {
        'use strict';
        this._super();
        var size = cc.director.getWinSize();
        lboost.enableTapToStart(this, new lboost.GameScene());

        // the title
        var titleLabel = cc.LabelTTF.create(str.tutorial_title, '', 48);
        titleLabel.setPosition(size.width / 2, size.height * 0.85);
        this.addChild(titleLabel);
        // the image
        var sprite = cc.Sprite.create('res/tutorial.png');
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite);
        // the 'you' label
        var you = cc.LabelTTF.create(str.you_are_here, '', 26);
        you.setPosition(size.width * 0.3, size.height * 0.22);
        you.setRotation(15);
        this.addChild(you);
    }
});
