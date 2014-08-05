var cc = cc || {};
var lboost = lboost || {};

lboost.S_if_plural = function(n) {
    'use strict';
    return n > 1 ? 's' : '';
};

lboost.come_on_share = ['好东西要和大家分享', '晒成绩', '成绩不错？戳这玩意！'];
lboost.rank = [
    [-1, '未完成游戏，无法评价 T^T', '坚持到底就能有评价了啊 (^ ^;)', '貌似没有到20秒 (-_-)zzz', '撑过20秒，这里会有好东东喔 :-P'],
    [0, '空气', '0%生物', '所有非生物'],
    [1, '乌龟', '蜗牛'],
    [1.5, '80%非人类动物', '0%的外星人'],
    [2, '90%非人类动物', '30%的人类'],
    [2.5, '人类的平均速度', '动物园的所有动物'],
    [3, '1%的外星人', '75%的人类', '自行车级别', '电瓶车级别'],
    [3.5, '1.5%的外星人', '汽车级别'],
    [4, '2%的外星人', '飞机级别', '99%非人类动物'],
    [5, '作弊的开发者', '火箭级别'],
    [6, '严重作弊的开发者', '行星级飞船级别', '宇宙Line Boost大赛入门门槛'],
    [7, '超级作弊的开发者', '恒星级飞船级别', '宇宙Line Boost大赛第100,000,000名'],
    [8, '星系级飞船级别', '宇宙Line Boost大赛第10,000,000名'],
    [9, '宇宙Line Boost大赛第1,000,000名'],
    [10, '宇宙Line Boost大赛第50,000名'],
    [12, '宇宙Line Boost大赛第100名'],
    [14, '宇宙Line Boost大赛季军'],
    [16, '宇宙Line Boost大赛亚军'],
    [18, '宇宙Line Boost大赛冠军']
];

lboost.GameOverDialogue = cc.LayerColor.extend({
    title: '', time: 0, score: 0, speed: 0,
    onEnter: function() {
        'use strict';
        this._super();
        this.setColor(cc.color(0, 0, 0, 192));
        var size = cc.director.getWinSize();

        // calculate data
        this.time = this.time.toFixed(2);
        lboost.share_data.time = this.time;
        lboost.share_data.score = this.score;
        lboost.share_data.total_games++;
        if (this.time == 0) {
            this.speed = 0;
        } else {
            this.speed = (this.score / this.time).toFixed(2);
        }
        for (var i = lboost.rank.length - 1; i >= 0; i--) {
            if (this.speed >= lboost.rank[i][0]) break;
        }
        // calculate the rank and share
        var possible_ranks = lboost.rank[i];
        if (this.time >= lboost.gameTime) {
            this.rank = possible_ranks[lboost.random(1, possible_ranks.length - 1)];
            lboost.share_msg = '我在Line Boost中坚持到底并通过了' + this.score + '个点，超过了' + this.rank + '！你也来试试？';
        } else {
            this.rank = '';
            lboost.share_msg = '我在Line Boost中用' + this.time + '秒通过了' + this.score + '个点，不过怎么也没法坚持到底！你也来试试？';
        }
        // the labels
        var lbl1 = cc.LabelTTF.create(this.title, '', 48);
        lbl1.setPosition(size.width / 2, size.height * 0.9);
        lbl1.setColor(cc.color(255, 64, 64));
        this.addChild(lbl1);
        var lbl2 = cc.LabelTTF.create(
            '游戏结束！\n \n耗时：\n \n得分：\n \n平均速度：', '', 30, cc.size(size.width, 0)
        );
        lbl2.setAnchorPoint(cc.p(0.5, 1));
        lbl2.setPosition(size.width / 2, size.height * 0.85);
        this.addChild(lbl2);
        var lbl2_1 = cc.LabelTTF.create('', '', 44);
        lbl2_1.setPosition(size.width * 0.6, size.height * 0.67);
        lbl2_1.setVisible(false);
        this.addChild(lbl2_1);
        var lbl2_2 = cc.LabelTTF.create('', '', 44);
        lbl2_2.setPosition(size.width * 0.6, size.height * 0.53);
        lbl2_2.setVisible(false);
        this.addChild(lbl2_2);
        var lbl2_3 = cc.LabelTTF.create(this.speed + '/s', '', 36);
        lbl2_3.setPosition(size.width * 0.7, size.height * 0.39);
        lbl2_3.setVisible(false);
        this.addChild(lbl2_3);

        // c'mon, share it!
        var shareHintImg = cc.Sprite.create('res/share.png');
        shareHintImg.setAnchorPoint(cc.p(1, 1));
        shareHintImg.setPosition(size.width, size.height);
        shareHintImg.setVisible(false);
        this.addChild(shareHintImg);
        var shareHintLabel = cc.LabelTTF.create(lboost.come_on_share[lboost.random(0, lboost.come_on_share.length - 1)], '', 16);
        shareHintLabel.setAnchorPoint(cc.p(0.6, 1));
        shareHintLabel.setPosition(0, 0);
        shareHintLabel.setRotation(10);
        shareHintImg.addChild(shareHintLabel);

        // slowly show the result out
        var tot_time = -1;  // delay 1 second before starting to display
        var show_result = function(dt) {
            tot_time += dt;
            if (tot_time > 2.4) {
                this.unschedule(show_result);
                shareHintImg.setVisible(true);
                lbl2_3.setVisible(true);
                if (this.rank == '') {
                    // grab a random encouragement from lboost.rank[0]
                    lbl2.setString(lbl2.getString() + '\n' + lboost.rank[0][lboost.random(1, lboost.rank[0].length - 1)]);
                } else {
                    lbl2.setString(lbl2.getString() + '\n超过了' + this.rank);
                }
            } else if (tot_time > 1) {
                var t = (Math.min(tot_time, 1.6) - 1) / 0.6;
                lbl2_2.setVisible(true);
                lbl2_2.setString((this.score * t).toFixed(0));
            } else if (tot_time > 0) {
                var t = Math.min(tot_time, 0.6) / 0.6;
                lbl2_1.setVisible(true);
                lbl2_1.setString((this.time * t).toFixed(2) + ' s');
            }
        };
        this.schedule(show_result, 0);

        // count it!
        lboost.call_php('php/score_stat.php?time=' + lboost.share_data.time
                + '&score=' + lboost.share_data.score + '&total_games=' + lboost.share_data.total_games);

        // the 'retry' menu
        var retryItem = cc.MenuItemLabel.create(
            cc.LabelTTF.create('再来一次', '', 32), function() {
                cc.director.runScene(cc.TransitionFade.create(1, new lboost.GameScene(), cc.color(0, 0, 0)));
            }, this
        );
        retryItem.setPosition(size.width / 2, size.height * 0.15);
        var menu = cc.Menu.create(retryItem);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu);
    }
});

lboost.GameOverDialogue.create = function(title, time, score) {
    'use strict';
    var dialogue = new lboost.GameOverDialogue();
    dialogue.time = time; dialogue.score = score; dialogue.title = title;
    return dialogue;
};
