lboost.TutorialScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();
        var __parent = this;

        // the title
        var titleLabel = cc.LabelTTF.create('How to play', '', 48);
        titleLabel.setPosition(size.width / 2, size.height * 0.85);
        this.addChild(titleLabel);
        // the image
        var sprite = cc.Sprite.create('res/tutorial.png');
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                cc.director.runScene(cc.TransitionFade.create(1, new lboost.GameScene(), cc.color(0, 0, 0)));
                return true;
            }
        }, this);
    }
});
