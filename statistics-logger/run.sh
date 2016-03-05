
mkdir -p $STAT_LOG_PATH
while true
do
  node get.js | tee -a $STAT_LOG_PATH/listeners.log
  sleep 60
done
