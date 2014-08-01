lboost.control_button = function(idx, callback) {
    var images = new Array('res/turn.png', 'res/straight.png', 'res/straight.png', 'res/turn.png');
    var item = cc.MenuItemImage.create(images[idx], images[idx],
        function() { callback(idx); });
    item.setAnchorPoint(cc.p(0, 0));
    item.setPosition(cc.p(80 * idx, 0));
    if (idx >= 2) {
        item.getNormalImage().setFlippedX(true);
        item.getSelectedImage().setFlippedX(true);
    }
    var menu = cc.Menu.create(item);
    menu.setPosition(cc.p(0, 0));
    return menu;
}
var StartupScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();

        // create the track
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

        // behaviour when tapped on the control buttons
        var dostep = function(idx) {
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
        // add control buttons. stay on the top
        for (var i = 0; i < 4; i++)
            this.addChild(lboost.control_button(i, dostep), 100);
    }
});
