#!/bin/sh

# How to use:
# 1) Copy the src folder to path/to/lineboost
#  * You need to do this every time you compile
#    for the compile script will delete it after success.
#  ** Files in src/libs will be compiled before startup.js,
#     and startup.js will be compiled before files in src.
#     (Other Javascript files: Why startup.js est avant nous?!!)
# 2) Run tools/compile.sh
# 3) Have fun!

echo 'First compression...'
mv src/libs ./libs
mv src/startup.js ./startup.js
java -jar tools/compiler.jar --js_output_file=c1.js 'libs/**.js' startup.js 'src/**.js'

echo 'Second compression...'
sed -e 's/lboost/LB/g' c1.js > game.min.js

echo 'Replacing PHP calls with real PHPs...'
sed -e 's/php\//http:\/\/cg-u2.cn.gp\/lboost\/php\//g' c1.js > game.min.js

echo 'Removing unused files...'
rm c1.js
rm startup.js
rm -r src
rm -r libs

echo 'Finished. Enjoy game.min.js!'
