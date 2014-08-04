var cc = cc || {};
var lboost = lboost || {};

lboost.TutorialScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();

        // the title
        var titleLabel = cc.LabelTTF.create('How to play', '', 48);
        titleLabel.setPosition(size.width / 2, size.height * 0.85);
        this.addChild(titleLabel);
        // the image
        var sprite = cc.Sprite.create('res/tutorial.png');
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite);
        // the 'you' label
        var you = cc.LabelTTF.create("You're here", '', 26);
        you.setPosition(size.width * 0.3, size.height * 0.22);
        you.setRotation(15);
        this.addChild(you);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                cc.director.runScene(cc.TransitionFade.create(1, new lboost.GameScene(), cc.color(0, 0, 0)));
                return true;
            }
        }, this);
    }
});
