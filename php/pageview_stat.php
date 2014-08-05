<?php

    // Usage:
    //  timezone: current timezone.
    //  pageview_stat.php
    $f = fopen('pageview_record.dat', 'a');
    $timezone = $_GET['timezone'];
    fprintf($f, '%s%02d%s', $timezone >= 0 ? '+' : '-',
        $timezone >= 0 ? $timezone : -$timezone, date('YmdHis', time()));
    fclose($f);

?>
