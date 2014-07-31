var StartupScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();

        var total_d = 0;
        var label = cc.LabelTTF.create('0 px', '', 40);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                return true;
            },
            onTouchMoved: function(touch, event) {
                var p = touch.getDelta();
                total_d += Math.sqrt(p.x * p.x + p.y * p.y);
                label.setString(Math.round(total_d).toString() + ' px');
            },
            onTouchEnded: function(touch, event) {
            }
        }, this);
    }
});
