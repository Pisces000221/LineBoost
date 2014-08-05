<?php

    // Usage:
    //  timezone: current timezone.
    //  time: the time that the player stayed alive
    //  score: the player's score
    //  total_games: if the player played 4 games before sharing this, total_games is 4
    //  share_stat.php?time=19.94&score=42&total_games=5
    $f = fopen('share_record.dat', 'a');
    $timezone = $_GET['timezone'];
    fprintf($f, '%s%02d%s', $timezone >= 0 ? '+' : '-',
        $timezone >= 0 ? $timezone : -$timezone, date('YmdHis', time()));
    fprintf($f, " %s%.2f %02d %d\n",
        $_GET['time'] < 10 ? '0' : '',
        $_GET['time'], $_GET['score'], $_GET['total_games']);
    fclose($f);

?>
