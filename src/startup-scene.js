var StartupScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();

        var t = lboost.Track.create();
        t.appendTournant(0, 0);
        t.setPosition(size.width / 2, size.height / 2);
        this.addChild(t);
        var b = lboost.board.create();
        var path = b.fill();
        for (i = 0; i < path.length; i++) {
            t.appendTournant(path[i].x, path[i].y);
            console.log(path[i].x + ' ' + path[i].y);
        }

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                return true;
            },
            onTouchMoved: function(touch, event) {
                t.setPosition(cc.pAdd(t.getPosition(), touch.getDelta()));
            },
            onTouchEnded: function(touch, event) {
            }
        }, this);
    }
});
