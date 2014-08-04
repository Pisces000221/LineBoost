// the track, a widget of cocos2d-x.
// this does not control the data structures. that's what [board.js] does!

var cc = cc || {};
var lboost = lboost || {};

lboost.steplen = 100;
lboost.dataPosToGLPos = function(p) {
    'use strict';
    return cc.pMult(p, lboost.steplen);
};

lboost.Track = cc.DrawNode.extend({
    tournants: null, lastTournant: null, themeColour: cc.color(255, 255, 255),
    appendTournant: function(x, y) {
        'use strict';
        var tournant = lboost.dataPosToGLPos(cc.p(x, y));
        if (this.lastTournant !== null) {
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
    'use strict';
    var t = new lboost.Track();
    if (themeColour) t.setThemeColour(themeColour);
    t.tournants = new Array();
    return t;
};
