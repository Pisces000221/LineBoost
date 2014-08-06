var cc = cc || {};
var lboost = lboost || {};

lboost.come_on_share = ['好东西要和大家分享', '土豪秀成绩', '成绩不错？戳这里！', '很好玩对不对？', '如果这里有个按钮……'];
lboost.rank = [
    [-12138, '未完成游戏，无法评价 T^T', '坚持到底就能有评价了啊 (^ ^;)', '貌似没有到20秒 (-_-)zzz', '撑过20秒，这里会有好东东喔 :-P', '想秀成绩？先保证不“掉线”！ :)', '如果你降低一点掉线率，我或许会帮你看看…… :/'],
    [0, '空气', '1%的动物', '所有非生物', '珊瑚', '所有的微生物'],
    [0.5, '乌龟', '蜗牛', '蚂蚁', '昆虫', '龟兔赛跑中的兔子', '几乎所有的植物'],
    [1, '80%非人类动物', '0.0001%的外星人'],
    [1.33, '90%非人类动物', '三轮车级别', '兔子', '猫', '滑板级别'],
    [1.66, '动物园的所有动物', '自行车级别', '加载图标的转速'],
    [2, '40%的人类', '电瓶车级别', '电脑光标闪动的速度'],
    [2.33, '人类的平均速度', '超速电瓶车级别', '一般玩家走直线的速度'],
    [2.66, '1~2个外星人', '摩托车级别', '人类速度的中位数'],
    [2.95, '该游戏的开发者，一点不多，一点不少'],    // well, I got 59 pts in 20 seconds...
    [3, '0.5%的外星人', '75%的人类', '汽车级别', '鼠标的最快点击速度'],
    [3.33, '1.2%的外星人', '飞机级别', '99%非人类动物'],
    [3,66, '作弊的开发者', '火箭级别', '99.99%非人类动物'],
    [4, '严重作弊的开发者', '行星级飞船级别', '宇宙Line Boost大赛入门门槛'],
    [5, '超级作弊的开发者', '恒星级飞船级别', '宇宙Line Boost大赛第1万亿名'],
    [6, '星系级飞船级别', '宇宙Line Boost大赛第1百亿名', '几乎所有的人类', '打键盘的最快速度'],
    [8, '宇宙Line Boost大赛第1千万名', '一些三体人'],
    [10, '宇宙Line Boost大赛第5万名', '一些天渊族人'],
    [12, '宇宙Line Boost大赛第800名'],
    [14, '宇宙Line Boost大赛季军'],
    [16, '宇宙Line Boost大赛亚军'],
    [18, '宇宙Line Boost大赛冠军'],
    [25, '光速']  // hey who did this?!
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
            lboost.share_msg = '我在Line Boost中坚持到底并通过了' + this.score + '个点，超过了' + this.rank + '！求超越！！';
        } else {
            this.rank = '';
            lboost.share_msg = '我在Line Boost中用' + this.time + '秒通过了' + this.score + '个点，不过拼了老命也没坚持到底！你也来试试？';
        }
        // the labels
        var lbl1 = cc.LabelTTF.create(this.title, '', 48);
        lbl1.setPosition(size.width / 2, size.height * 0.9);
        lbl1.setColor(cc.color(255, 64, 64));
        this.addChild(lbl1);
        var lbl2 = cc.LabelTTF.create(
            '耗时：\n \n得分：\n \n平均速度：', '', 30, cc.size(size.width, 0)
        );
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
        var shareHintLabel = cc.LabelTTF.create(lboost.come_on_share[lboost.random(0, lboost.come_on_share.length - 1)], '', 16);
        shareHintLabel.setAnchorPoint(cc.p(0.6, 1));
        shareHintLabel.setPosition(0, 0);
        shareHintLabel.setRotation(10);
        shareHintImg.addChild(shareHintLabel);

        // the 'retry' menu
        var retryItem = cc.MenuItemLabel.create(
            cc.LabelTTF.create('再来一次', '', 32), function() {
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
                if (this.rank == '') {
                    // grab a random encouragement from lboost.rank[0]
                    lbl2.setString(s + lboost.rank[0][lboost.random(1, lboost.rank[0].length - 1)]);
                } else {
                    lbl2.setString(s + '超过了' + this.rank);
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
                + '&score=' + lboost.share_data.score + '&total_games=' + lboost.share_data.total_games
                + '&timezone=' + (new Date()).getTimezoneOffset() / 60);
    }
});

lboost.GameOverDialogue.create = function(title, time, score) {
    'use strict';
    var dialogue = new lboost.GameOverDialogue();
    dialogue.time = time; dialogue.score = score; dialogue.title = title;
    return dialogue;
};
