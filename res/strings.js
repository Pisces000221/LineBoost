var str = str || {};

// This one contains string resources used in game.
// I'm sure I'll use GNU gettext if I'm developing a C++ program!
// This project is using Code Climate and it warns me about every Chinese string!
// So I moved all of them here, and luckily, this has no JSHint problems!!
// And it is excluded from Code Climate analyzation. So, will this help increasing our GPA?

str.start = '猛戳开始';
str.engine_ack = '强力外援: Cocos2d-x HTML5';
str.version = 'Rev 21';

str.tutorial_title = '玩法';
str.you_are_here = "You're here";

str.default_share_msg = '我正在玩 Line Boost，根本停不下来！';

str.share_encouragements = ['好东西要和大家分享', '土豪秀成绩', '成绩不错？戳这里！', '很好玩对不对？', '如果这里有个按钮……'];
str.rank = [
    [-12138, '未完成游戏，无法评价 T^T', '坚持到底就能有评价了啊 (^ ^;)', '貌似没有到20秒 (-_-)zzz', '撑过20秒，这里会有好东东喔 :-P', '想秀成绩？先保证不“掉线”！ :)', '如果你降低一点掉线率，我或许会帮你看看…… :/', '加油！努力！到20秒，要用力！'],
    [0, '空气', '1%的动物', '所有非生物', '珊瑚', '所有的微生物'],
    [0.5, '乌龟', '蜗牛', '蚂蚁', '昆虫', '龟兔赛跑中的兔子', '几乎所有的植物'],
    [1, '80%非人类动物', '0.0001%的外星人'],
    [1.33, '90%非人类动物', '三轮车级别', '兔子', '猫', '滑板级别'],
    [1.66, '动物园的所有动物', '自行车级别', '加载图标的转速'],
    [2, '40%的人类', '电瓶车级别', '电脑光标闪动的速度'],
    [2.33, '人类的平均速度', '超速电瓶车级别', '一般玩家走直线的速度'],
    [2.66, '1~2个外星人', '摩托车级别', '人类速度的中位数'],
    [2.95, '该游戏的开发者，一点不多，一点不少'],    // well, I got 59 pts in 20 seconds...
    [3, '0.5%的外星人', '75%的人类', '汽车级别', '鼠标的最快点击速度'],
    [3.33, '1.2%的外星人', '飞机级别', '99%非人类动物'],
    [3.66, '作弊的开发者', '火箭级别', '99.99%非人类动物'],
    [4, '严重作弊的开发者', '行星级飞船级别', '宇宙Line Boost大赛入门门槛'],
    [5, '超级作弊的开发者', '恒星级飞船级别', '宇宙Line Boost大赛第1万亿名'],
    [6, '星系级飞船级别', '宇宙Line Boost大赛第1百亿名', '几乎所有的人类', '打键盘的最快速度'],
    [8, '宇宙Line Boost大赛第1千万名', '一些三体人'],
    [10, '宇宙Line Boost大赛第5万名', '一些天渊族人'],
    [12, '宇宙Line Boost大赛第800名'],
    [14, '宇宙Line Boost大赛季军'],
    [16, '宇宙Line Boost大赛亚军'],
    [18, '宇宙Line Boost大赛冠军'],
    [25, '光速']  // hey who did this?!
];

str.share_msg_finished = function (score, rank) {
    'use strict';
    return '我在Line Boost中坚持到底并通过了' + score + '个点，超过了' + rank + '！求超越！！';
};

str.share_msg_unfinished = function (time, score) {
    'use strict';
    return '我在Line Boost中用' + time + '秒通过了' + score + '个点，不过拼了老命也没坚持到底！你也来试试？';
};

str.result_label = '耗时：\n \n得分：\n \n平均速度：';
str.try_again = '再来一次';
str.overran = '超过了';