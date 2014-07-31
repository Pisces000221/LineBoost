lboost.board = {
    direction: { LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3 },
    valid_nextstep: new Array(
        new Array(2, 3), new Array(2, 3),
        new Array(0, 1), new Array(0, 1)),
    move: new Array(cc.p(-1, 0), cc.p(1, 0), cc.p(0, 1), cc.p(0, -1),
        cc.p(1, 1), cc.p(1, -1), cc.p(-1, 1), cc.p(-1, -1)),
    turn_possib: 0.15,
    create: function() {
        var board = {};
        board.data = {};
        board.visible_range = cc.p(2, 3);
        board.visible_centre = cc.p(0, 0);
        board.cur_direction = lboost.board.direction.UP;
        // call this to fill the part of the board which is visible
        // suggested to call after every step
        board.fill = function() {
            var path = new Array();
            var curpos = this.visible_centre;
            while (Math.abs(curpos.x - this.visible_centre.x) <= this.visible_range.x
              && Math.abs(curpos.y - this.visible_centre.y) <= this.visible_range.y) {
                var n = Math.random();
                var nextpos = curpos;
                if (n < lboost.board.turn_possib) {
                    // turn away
                    this.cur_direction = lboost.board.valid_nextstep[this.cur_direction][lboost.random(0, 1)];
                }
                nextpos = cc.pAdd(nextpos, lboost.board.move[this.cur_direction]);
                curpos = nextpos;
                path.push(curpos);
                console.log(this.cur_direction);
            }
            return path;
        };
        return board;
    }
};
