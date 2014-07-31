lboost.steplen = 100;

lboost.Track = cc.DrawNode.extend({
    lastTournant: null, themeColour: cc.color(255, 255, 255), _className: "Track",
    appendTournant: function(x, y) {
        var tournant = cc.p(x * lboost.steplen, y * lboost.steplen);
        if (this.lastTournant != null) {
            this.drawSegment(this.lastTournant, tournant, 5, this.themeColour);
        }
        this.drawDot(tournant, 10);
        this.lastTournant = tournant;
    }, setThemeColour: function(colour) {
        this.themeColour = colour;
    }
});
lboost.Track.create = function(themeColour) {
    var t = new lboost.Track();
    if (themeColour) t.setThemeColour(themeColour);
    return t;
};
