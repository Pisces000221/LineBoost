lboost.control_button_images = new Array('res/turn.png', 'res/straight.png', 'res/straight.png', 'res/turn.png');
lboost.control_button = function(idx, callback) {
    var item = cc.MenuItemImage.create(
        lboost.control_button_images[idx], lboost.control_button_images[idx],
        function() { callback(idx); });
    item.setAnchorPoint(cc.p(0, 0));
    item.setPosition(cc.p(80 * idx, 0));
    item.setOpacity(0); // for improving image quality. see CONFUSION 1
    var menu = cc.Menu.create(item);
    menu.setPosition(cc.p(0, 0));
    return menu;
};
// see CONFUSION 1
lboost.control_button_sprite = function(idx) {
    var sprite = cc.Sprite.create(lboost.control_button_images[idx]);
    sprite.setAnchorPoint(cc.p(0, 0));
    sprite.setPosition(cc.p(80 * idx, 0));
    sprite.setFlippedX(idx >= 2);
    return sprite;
};

lboost.gameTime = 20;
lboost.GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();
        var __parent = this;

        // call to end the game
        this.endGame = function(title) {
            for (var i = 0; i < 4; i++) {
                this.getChildByTag(10880 + i).setEnabled(false);
            }
            // turn off scheduler
            this.unschedule(updateTime);
            this.addChild(lboost.GameOverDialogue.create(title, lboost.gameTime - timeRemaining, curTournantIdx), 1000);
        }

        // the score display (always on the top)
        var scoreLabel = cc.LabelTTF.create('00', '', 48);
        scoreLabel.setPosition(size.width / 2, size.height * 0.9);
        scoreLabel.setColor(cc.color(64, 255, 64));
        this.addChild(scoreLabel, 100);
        // the time display
        var timeRemaining = lboost.gameTime;
        var timeLabel = cc.LabelTTF.create(timeRemaining.toFixed(1).toString() + ' s', '', 36);
        timeLabel.setPosition(size.width / 2, size.height * 0.8);
        timeLabel.setColor(cc.color(64, 255, 64));
        this.addChild(timeLabel, 100);
        // this will be scheduled later (after the player starts moving)
        var updateTime = function(dt) {
            timeRemaining -= dt;
            timeLabel.setString(timeRemaining.toFixed(1).toString() + ' s');
            if (timeRemaining < 0) {
                timeRemaining = 0;  // prevent things like 20.02s in game over dialogue
                this.endGame('Time up!!');
            }
        }

        // create the white track
        var t = lboost.Track.create();
        t.appendTournant(0, 0);
        t.setPosition(size.width / 2, size.height / 2);
        this.addChild(t);
        // t2 is the blue track, used to display the player's moves
        var t2 = lboost.Track.create();
        t2.themeColour = cc.color(0, 128, 255);
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
            // turn on scheduler if this is the first step
            if (curTournantIdx == 0) __parent.schedule(updateTime, 0.1);
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
                // we don't count the last (wrong) one, so the score is curTournantIdx - 1
                curTournantIdx--;
                __parent.endGame('Ouch!!');
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
        for (var i = 0; i < 4; i++) {
            this.addChild(lboost.control_button(i, dostep), 100, 10880 + i);
            //  *** CONFUSION 1 ***
            // the image quality of MenuItemImage/MenuItemSprite is not good on phones sometimes
            // so we use a sprite instead to display the images, and set menu items to transparent.
            this.addChild(lboost.control_button_sprite(i), 101);
        }
    }
});
