lboost.S_if_plural = function(n) {
    return n > 1 ? 's' : '';
}

lboost.GameOverDialogue = cc.LayerColor.extend({
    title: '', time: 0, score: 0,
    onEnter: function() {
        this._super();
        this.setColor(cc.color(0, 0, 0, 192));
        var size = cc.director.getWinSize();

        // the labels
        var lbl1 = cc.LabelTTF.create(this.title, '', 48);
        lbl1.setPosition(size.width / 2, size.height * 0.9);
        lbl1.setColor(cc.color(255, 64, 64));
        this.addChild(lbl1);
        var lbl2 = cc.LabelTTF.create(
            '游戏结束！你在 ' + this.time.toFixed(2) + ' 秒内通过了 ' + this.score + ' 个点！'
            + '\n \n速度为 ' + (this.score / this.time).toFixed(2) + ' 个点/秒',
            '', 32, cc.size(size.width, 0));
        lboost.share_msg = '我在Line Boost中用' + this.time.toFixed(2) + '秒通过了' + this.score + '个点，'
            + '速度为' + (this.score / this.time).toFixed(2) + '个点/秒！你也来试试？';
        lboost.share_data.time = this.time.toFixed(2);
        lboost.share_data.score = this.score;
        lboost.share_data.total_games++;
        lbl2.setAnchorPoint(cc.p(0.5, 1));
        lbl2.setPosition(size.width / 2, size.height * 0.85);
        this.addChild(lbl2);

        // count it!
        lboost.call_php('php/score_stat.php?time=' + lboost.share_data.time
                + '&score=' + lboost.share_data.score + '&total_games=' + lboost.share_data.total_games);

        // the 'retry' menu
        var retryItem = cc.MenuItemLabel.create(
            cc.LabelTTF.create('再来一次', '', 32), function() {
                cc.director.runScene(cc.TransitionFade.create(1, new lboost.GameScene(), cc.color(0, 0, 0)));
            }, this);
        retryItem.setPosition(size.width / 2, size.height * 0.25);
        var menu = cc.Menu.create(retryItem);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu);
    }
});

lboost.GameOverDialogue.create = function(title, time, score) {
    var god = new lboost.GameOverDialogue();
    god.time = time; god.score = score; god.title = title;
    return god;
}
