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
        lbl2.setAnchorPoint(cc.p(0.5, 1));
        lbl2.setPosition(size.width / 2, size.height * 0.85);
        this.addChild(lbl2);

        // the 'share' & 'retry' menu
        var shareItem = cc.MenuItemLabel.create(
            cc.LabelTTF.create('分享成绩到朋友圈', '', 32), function() {
                console.log('TODO: share');
            }, this);
        shareItem.setPosition(size.width / 2, size.height * 0.3);
        var retryItem = cc.MenuItemLabel.create(
            cc.LabelTTF.create('再来一次', '', 32), function() {
                cc.director.runScene(cc.TransitionFade.create(1, new lboost.GameScene(), cc.color(0, 0, 0)));
            }, this);
        retryItem.setPosition(size.width / 2, size.height * 0.2);
        var menu = cc.Menu.create(shareItem, retryItem);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu);
    }
});

lboost.GameOverDialogue.create = function(title, time, score) {
    var god = new lboost.GameOverDialogue();
    god.time = time; god.score = score; god.title = title;
    return god;
}
