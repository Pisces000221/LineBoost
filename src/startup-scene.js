var StartupScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();

        var t = lboost.Track.create();
        t.appendTournant(0, 0);
        t.setPosition(size.width / 2, size.height / 2);
        this.addChild(t);
        var t2 = lboost.Track.create();
        t2.themeColour = cc.color(96, 96, 255);
        t2.appendTournant(0, 0);
        t.addChild(t2);
        var b = lboost.board.create();
        var path = b.fill(true);
        var curTournantIdx = 0;
        for (i = 0; i < path.length; i++) {
            t.appendTournant(path[i].x, path[i].y);
        }

        var lastBeganPoint = cc.p(0, 0);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                b.visible_centre = t.tournants[++curTournantIdx];
                console.log(curTournantIdx + ' ' + b.visible_centre.x + ' ' + b.visible_centre.y);
                t2.appendTournant(b.visible_centre.x, b.visible_centre.y);
                var path = b.fill();
                for (i = 0; i < path.length; i++) {
                    t.appendTournant(path[i].x, path[i].y);
                }
                t.runAction(cc.EaseSineOut.create(cc.MoveTo.create(
                    0.15, cc.pSub(cc.p(size.width / 2, size.height / 2), lboost.dataPosToGLPos(b.visible_centre)))));
                return true;
            }
        }, this);
    }
});
