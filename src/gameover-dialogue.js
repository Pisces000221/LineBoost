lboost.S_if_plural = function(n) {
    return n > 1 ? 's' : '';
}

lboost.GameOverDialogue = cc.LayerColor.extend({
    time: 0, score: 0,
    onEnter: function() {
        this._super();
        this.setColor(cc.color(0, 0, 0, 192));
        var size = cc.director.getWinSize();

        // the labels
        var lbl1 = cc.LabelTTF.create('Ouch!!', '', 48);
        lbl1.setPosition(size.width / 2, size.height * 0.9);
        lbl1.setColor(cc.color(255, 64, 64));
        this.addChild(lbl1);
        var lbl2 = cc.LabelTTF.create(
            'You went through ' + this.score + ' point' + lboost.S_if_plural(this.score)
            + ' in ' + this.time + ' second' + lboost.S_if_plural(this.time),
            '', 40, cc.size(size.width, 0));
        lbl2.setAnchorPoint(cc.p(0.5, 1));
        lbl2.setPosition(size.width / 2, size.height * 0.85);
        this.addChild(lbl2);
    }
});

lboost.GameOverDialogue.create = function(time, score) {
    var god = new lboost.GameOverDialogue();
    god.time = time; god.score = score;
    return god;
}
