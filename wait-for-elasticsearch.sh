##!/bin/sh
#
## Wait for Elasticsearch to become responsive
#until curl -s http://elasticsearch:9200 -o /dev/null; do
#  echo "Waiting for Elasticsearch to become available..."
#  sleep 5
#done
#
## Once Elasticsearch is ready, execute the provided command
#exec "$@"

#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

until nc -z -v -w30 "$host" 9200
do
  echo "Waiting for Elasticsearch to start..."
  sleep 2
done

echo "Elasticsearch is up and running, executing the specified command."
exec $cmd
