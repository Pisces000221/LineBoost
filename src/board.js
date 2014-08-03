lboost.board = {
    direction: { LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3 },
    turn_direction: [[2, 3], [2, 3], [0, 1], [0, 1]],
    move: [cc.p(-1, 0), cc.p(1, 0), cc.p(0, 1), cc.p(0, -1)],
    turn_possib: 0.25,
    visible_range: cc.p(1.6, 2.4),
    max_visible_points: 15, // (floor(1.6) * 2 + 1) * (floor(2.4) * 2 + 1)
    generate: function(num, startpos, vcentre, direction) {
        var is_visible = function(p) {
            return Math.abs(p.x - vcentre.x) <= lboost.board.visible_range.x
              && Math.abs(p.y - vcentre.y) <= lboost.board.visible_range.y;
        }
        var used = [];
        var path = [];
        var ___ = function(num, p, direction) {
            if (num == 0) {
                // we did it!
                return true;
            } else if (is_visible(p) || used[p.x] && used[p.x][p.y]) {
                // oh no! that's invalid.
                return false;
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
            if (used[p.x] == null) used[p.x] = new Array();
            used[p.x][p.y] = true;
            if (___(num - 1, cc.pAdd(p, lboost.board.move[c1]), c1)
                || ___(num - 1, cc.pAdd(p, lboost.board.move[c2]), c2)
                || ___(num - 1, cc.pAdd(p, lboost.board.move[c3]), c3)) return true;
            path.pop();
            return false;
        };
        ___(num, startpos, direction);
        return path;
    }
};
