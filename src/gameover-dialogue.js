var cc = cc || {};
var lboost = lboost || {};
var str = str || {};

lboost.GameOverDialogue = cc.LayerColor.extend({
    title: '', time: 0, score: 0, speed: 0,
    calculateData: function() {
        // calculate results
        this.time = this.time.toFixed(2);
        lboost.share_data.time = this.time;
        lboost.share_data.score = this.score;
        lboost.share_data.total_games++;
        this.speed = this.time === 0 ? 0 : (this.score / this.time).toFixed(2);
        // calculate the rank and share
        var i = str.rank.length - 1;
        while (this.speed < str.rank[i][0]) { i--; }
        var possible_ranks = str.rank[i];
        if (this.time >= lboost.gameTime) {
            this.rank = possible_ranks[lboost.random(1, possible_ranks.length - 1)];
            lboost.share_msg = str.share_msg_finished(this.score, this.rank);
        } else {
            this.rank = '';
            lboost.share_msg = str.share_msg_unfinished(this.time, this.score);
        }
    },
    onEnter: function() {
        'use strict';
        this._super();
        this.setColor(cc.color(0, 0, 0, 192));
        var size = cc.director.getWinSize();

        this.calculateData();

        // the labels
        // title (Ouch or Time up depending on the argument passed)
        var lbl1 = cc.LabelTTF.create(this.title, '', 48);
        lbl1.setPosition(size.width / 2, size.height * 0.9);
        lbl1.setColor(cc.color(255, 64, 64));
        this.addChild(lbl1);
        // labels showing the result
        var lbl2 = cc.LabelTTF.create(str.result_label, '', 30, cc.size(size.width, 0));
        lbl2.setAnchorPoint(cc.p(0.5, 1));
        lbl2.setPosition(size.width / 2, size.height * 0.8);
        this.addChild(lbl2);
        var lbl2_1 = cc.LabelTTF.create('', '', 44);
        lbl2_1.setPosition(size.width * 0.6, size.height * 0.8 - 15);
        lbl2_1.setVisible(false);
        this.addChild(lbl2_1);
        var lbl2_2 = cc.LabelTTF.create('', '', 44);
        lbl2_2.setPosition(size.width * 0.6, size.height * 0.8 - 84);
        lbl2_2.setVisible(false);
        this.addChild(lbl2_2);

        // c'mon, share it!
        var shareHintImg = cc.Sprite.create('res/share.png');
        shareHintImg.setAnchorPoint(cc.p(1, 1));
        shareHintImg.setPosition(size.width, size.height);
        shareHintImg.setVisible(false);
        this.addChild(shareHintImg);
        var shareHintLabel = cc.LabelTTF.create(str.share_encouragements[lboost.random(0, str.share_encouragements.length - 1)], '', 16);
        shareHintLabel.setAnchorPoint(cc.p(0.6, 1));
        shareHintLabel.setPosition(0, 0);
        shareHintLabel.setRotation(10);
        shareHintImg.addChild(shareHintLabel);

        // the 'retry' menu
        var retryItem = cc.MenuItemLabel.create(
            cc.LabelTTF.create(str.try_again, '', 32), function() {
                cc.director.runScene(cc.TransitionFade.create(1, new lboost.GameScene(), cc.color(0, 0, 0)));
            }, this
        );
        retryItem.setPosition(size.width / 2, size.height * 0.15);
        retryItem.setEnabled(false);
        retryItem.setOpacity(0);
        var menu = cc.Menu.create(retryItem);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu);

        // slowly show the result out
        var tot_time = -1;  // delay 1 second before starting to display
        var show_result = function(dt) {
            tot_time += dt;
            if (tot_time > 2.4) {
                this.unschedule(show_result);
                shareHintImg.setVisible(true);
                retryItem.runAction(cc.FadeIn.create(0.3));
                retryItem.setEnabled(true);
                retryItem.setOpacity(0);
                var s = lbl2.getString();
                s += ' ' + this.speed + '/s\n';
                if (this.rank === '') {
                    // grab a random encouragement from str.rank[0]
                    lbl2.setString(s + str.rank[0][lboost.random(1, str.rank[0].length - 1)]);
                } else {
                    lbl2.setString(s + str.overran + this.rank);
                }
            } else if (tot_time > 1) {
                var t1 = (Math.min(tot_time, 1.6) - 1) / 0.6;
                lbl2_2.setVisible(true);
                lbl2_2.setString((this.score * t1).toFixed(0));
            } else if (tot_time > 0) {
                var t2 = Math.min(tot_time, 0.6) / 0.6;
                lbl2_1.setVisible(true);
                lbl2_1.setString((this.time * t2).toFixed(2) + ' s');
            }
        };
        this.schedule(show_result, 0);

        // count it!
        lboost.call_php('php/score_stat.php?time=' + lboost.share_data.time +
            '&score=' + lboost.share_data.score + '&total_games=' + lboost.share_data.total_games +
            '&timezone=' + (new Date()).getTimezoneOffset() / 60);
    }
});

lboost.GameOverDialogue.create = function(title, time, score) {
    'use strict';
    var dialogue = new lboost.GameOverDialogue();
    dialogue.title = title; dialogue.time = time; dialogue.score = score;
    return dialogue;
};
