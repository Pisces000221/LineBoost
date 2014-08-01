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
};

lboost.GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();
        var __parent = this;

        // the score display (always on the top)
        var scoreLabel = cc.LabelTTF.create('00', '', 48);
        scoreLabel.setPosition(size.width / 2, size.height * 0.9);
        scoreLabel.setColor(cc.color(64, 255, 64));
        this.addChild(scoreLabel, 100);

        // create the white track
        var t = lboost.Track.create();
        t.appendTournant(0, 0);
        t.setPosition(size.width / 2, size.height / 2);
        this.addChild(t);
        // t2 is the blue track, used to display the player's moves
        var t2 = lboost.Track.create();
        t2.themeColour = cc.color(96, 96, 255);
        t2.appendTournant(0, 0);
        t.addChild(t2);
        var b = lboost.board.create();
        var path = b.fill(true);
        for (i = 0; i < path.length; i++) {
            t.appendTournant(path[i].x, path[i].y);
        }
        // create the arrow
        var arrow = cc.Sprite.create('res/arrow.png');
        arrow.setAnchorPoint(cc.p(0.5, 0));
        t.addChild(arrow);

        var curTournantIdx = 0; // index of the player's current tournant. it's also the score
        var turn = [[3, 0, 0, 2], [2, 1, 1, 3], [0, 2, 2, 1], [1, 3, 3, 0]];
        var rotation = [270, 90, 0, 180];
        var cur_direction;
        for (var i = 0; i < 4; i++)
            if (cc.pFuzzyEqual(lboost.board.move[i], path[0], 0)) {
                cur_direction = i;
                break;
            }
        arrow.setRotation(rotation[cur_direction]);
        // behaviour when tapped on the control buttons
        var dostep = function(idx) {
            // turn according to the button tapped.
            // if idx is 1 or 2 (tapped 'go straight ahead'), cur_direction will not change.
            cur_direction = turn[cur_direction][idx];
            arrow.setRotation(rotation[cur_direction]);
            // move
            b.visible_centre = cc.pAdd(b.visible_centre, lboost.board.move[cur_direction]);
            arrow.setPosition(lboost.dataPosToGLPos(b.visible_centre));
            t.runAction(cc.EaseSineOut.create(cc.MoveTo.create(
                0.15, cc.pSub(cc.p(size.width / 2, size.height / 2), lboost.dataPosToGLPos(b.visible_centre)))));
            // lose?
            if (!cc.pFuzzyEqual(b.visible_centre, t.tournants[++curTournantIdx], 0)) {
                // ouch!!
                t2.themeColour = cc.color(255, 64, 64);
                arrow.setColor(cc.color(128, 128, 128));
                for (var i = 0; i < 4; i++) {
                    __parent.getChildByTag(10880 + i).setEnabled(false);
                }
                __parent.addChild(lboost.GameOverDialogue.create(0.8, curTournantIdx), 1000);
                //__parent.removeAllChildren(true);
                //__parent.onEnter();
            } else {
                // update score display
                scoreLabel.setString((curTournantIdx < 10 ? '0' : '') + curTournantIdx.toString());
            }
            t2.appendTournant(b.visible_centre.x, b.visible_centre.y);
            // fill the board again
            var path = b.fill();
            for (i = 0; i < path.length; i++) {
                t.appendTournant(path[i].x, path[i].y);
            }
            return true;
        }

        // add control buttons. stay on the top
        // tags are 10881~10884
        for (var i = 0; i < 4; i++)
            this.addChild(lboost.control_button(i, dostep), 100, 10880 + i);
    }
});
