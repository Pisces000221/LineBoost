lboost.steplen = 100;
lboost.dataPosToGLPos = function(p) {
    return cc.pMult(p, lboost.steplen);
};

lboost.Track = cc.DrawNode.extend({
    tournants: null, lastTournant: null, themeColour: cc.color(255, 255, 255), _className: "Track",
    appendTournant: function(x, y) {
        var tournant = lboost.dataPosToGLPos(cc.p(x, y));
        if (this.lastTournant != null) {
            this.drawSegment(this.lastTournant, tournant, 5, this.themeColour);
        }
        this.drawDot(tournant, 10, this.themeColour);
        this.lastTournant = tournant;
        this.tournants.push(cc.p(x, y));
    }, setThemeColour: function(colour) {
        this.themeColour = colour;
    }
});
lboost.Track.create = function(themeColour) {
    var t = new lboost.Track();
    if (themeColour) t.setThemeColour(themeColour);
    t.tournants = new Array();
    return t;
};
