// the data structure of the game. this does not communicate with user interface.
// that's what [track.js] does!

var cc = cc || {};
var lboost = lboost || {};

lboost.board = {
    direction: { LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3 },
    turn_direction: [[2, 3], [2, 3], [0, 1], [0, 1]],
    move: [cc.p(-1, 0), cc.p(1, 0), cc.p(0, 1), cc.p(0, -1)],
    turn_possib: 0.25,
    visible_range: cc.p(1.6, 2.4),
    max_visible_points: 15, // (floor(1.6) * 2 + 1) * (floor(2.4) * 2 + 1)
    used: [],
    generate: function(num, startpos, vcentre, direction) {
        'use strict';
        var is_visible = function(p) {
            return Math.abs(p.x - vcentre.x) <= lboost.board.visible_range.x
              && Math.abs(p.y - vcentre.y) <= lboost.board.visible_range.y;
        };
        var path = [];
        // force is the 'immunity' remaining
        // it will decrease every time we meet a blocked (G * F * W??) point.
        // if force = 1 doesn't work, we'll let maxforce = 2 and force = 2
        // by parity of reasoning, we'll let maxforce = 3 next, and 4, 5, 6...
        var force = 0, maxforce = 0;
        if (lboost.board.used[startpos.x]) {
            lboost.board.used[startpos.x][startpos.y] = false;
        }
        // we use an algorithm similar to DFS
        // hey, JHZ, that's depth-first searching
        var internal_call = function(num, p, direction) {
            if (num === 0) {
                // we did it!
                return true;
            } else if (is_visible(p) || lboost.board.used[p.x] && lboost.board.used[p.x][p.y]) {
                // oh no! that's invalid.
                // force > 0 means we have no other choices..
                if (force > 0) force--; else return false;
            }
            var n = Math.random();
            var c1, c2, c3;
            if (n < lboost.board.turn_possib) {
                // turn away
                var a = lboost.random(0, 1);
                c1 = lboost.board.turn_direction[direction][a];
                c2 = lboost.board.turn_direction[direction][1 - a];
                c3 = direction;
            } else {
                var a = lboost.random(0, 1);
                c1 = direction;
                c2 = lboost.board.turn_direction[direction][a];
                c3 = lboost.board.turn_direction[direction][1 - a];
            }
            // go one step ahead
            path.push(p);
            if (lboost.board.used[p.x] === undefined) lboost.board.used[p.x] = new Array();
            lboost.board.used[p.x][p.y] = true;
            if (internal_call(num - 1, cc.pAdd(p, lboost.board.move[c1]), c1)
              || internal_call(num - 1, cc.pAdd(p, lboost.board.move[c2]), c2)
              || internal_call(num - 1, cc.pAdd(p, lboost.board.move[c3]), c3)) {
                return true;
            }
            path.pop();
            return false;
        };
        // prevent generation failure
        while (!internal_call(num, startpos, direction)) {
            // uh oh... failed to generate.
            // we have no choice but to place one point on an existing point.
            // if someone reaches this, there are two possibilities:
            //  1) his RP (that's how we say 'luck' in China) is very good;
            //  2) he's not a human being and has an EXTREMELY AMAZING speed of tapping and reaction. maybe he's a trisolaran...?
            // developer who hacked it: why you gotta be so rude? don't you know I'm a human too?! :/
            force = ++maxforce;
        }
        return path;
    }
};
