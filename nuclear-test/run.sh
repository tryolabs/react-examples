echo 'Starting contacts API ...'
$(npm bin)/json-server -w db.json &> /dev/null &
export JS_PID=$!
echo 'API started'
echo 'Starting frontend server ...'
cd build
python -m SimpleHTTPServer &> /dev/null &
export HTTP_PID=$!
echo 'frontend started'
trap 'kill -2 $JS_PID && kill -9 $HTTP_PID && echo API and frontend stopped.' SIGINT
trap 'kill -9 $JS_PID && kill -9 $HTTP_PID && echo API and frontend stopped.' SIGKILL
wait
