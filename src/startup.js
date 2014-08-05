var lboost = {};

// generate a random integer in range [low, high]
lboost.random = function(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

// game startup
window.onload = function() {
    cc.game.onStart = function() {
        cc.Director._getInstance().setDisplayStats(false);
        cc.view.adjustViewPort(true);
        if (cc.sys.isMobile) {
            cc.view.setDesignResolutionSize(320, 480, cc.ResolutionPolicy.FIXED_WIDTH);
        } else {
            cc.view.setDesignResolutionSize(320, 480, cc.ResolutionPolicy.SHOW_ALL);
        }
        cc.view.resizeWithBrowserSize(true);
        // resources were not large, so we just start running scenes directly
        cc.director.runScene(new lboost.StartupScene());
    };
    cc.game.run('game_canvas');
};