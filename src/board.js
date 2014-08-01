lboost.board = {
    direction: { LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3 },
    valid_nextstep: [[2, 3], [2, 3], [0, 1], [0, 1]],
    move: [cc.p(-1, 0), cc.p(1, 0), cc.p(0, 1), cc.p(0, -1),
        cc.p(1, 1), cc.p(1, -1), cc.p(-1, 1), cc.p(-1, -1)],
    turn_possib: 0.25,
    create: function() {
        var board = {};
        board.has_tournant = new Array();
        board.visible_range = cc.p(1.6, 2.4);
        board.visible_centre = cc.p(0, 0);
        board.last_pos = board.visible_centre;
        board.cur_direction = lboost.board.direction.UP;
        board.is_visible = function(p) {
            return Math.abs(p.x - this.visible_centre.x) <= this.visible_range.x
              && Math.abs(p.y - this.visible_centre.y) <= this.visible_range.y;
        }
        board.almost_visible = function(p) {
            return Math.abs(p.x - this.visible_centre.x) <= this.visible_range.x + 1
              && Math.abs(p.y - this.visible_centre.y) <= this.visible_range.y + 1;
        }
        // call this to fill the part of the board which is visible
        // suggested to call after every step
        // pass anything to force if you want to fill the board anyway, will not consider the visible range
        // e.g. call board.fill(true) at the beginning of the game
        board.fill = function(force) {
            var path = new Array();
            var curpos = this.last_pos;
            while (this.almost_visible(curpos)) {
                var nextpos, direction;
                var ct = 0;
                do {
                    if (++ct > 100) {
                        console.log('ouch!');
                        force = true;
                    }
                    nextpos = curpos;
                    var n = Math.random();
                    if (n < lboost.board.turn_possib) {
                        // turn away
                        direction = lboost.board.valid_nextstep[this.cur_direction][lboost.random(0, 1)];
                    } else {
                        direction = this.cur_direction;
                    }
                    // go one step ahead
                    nextpos = cc.pAdd(nextpos, lboost.board.move[direction]);
                } while (!force && (this.is_visible(nextpos) || this.has_tournant[nextpos.x] && this.has_tournant[nextpos.x][nextpos.y]));
                this.cur_direction = direction;
                curpos = nextpos;
                path.push(curpos);
                if (board.has_tournant[curpos.x] == null) board.has_tournant[curpos.x] = new Array();
                board.has_tournant[curpos.x][curpos.y] = true;
            }
            board.last_pos = curpos;
            return path;
        };
        return board;
    }
};
