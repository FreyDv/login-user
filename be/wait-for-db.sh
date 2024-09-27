#!/bin/sh

retry_count=30
retry_interval=5

attempt=0

until [ "$(docker inspect --format='{{.State.Health.Status}}' db)" = "healthy" ] || [ $attempt -ge $retry_count ];
do
    echo "Waiting for db to be healthy... attempt $((attempt+1))/retry_count"
    sleep $retry_interval
    attempt=$((attempt+1))
done

if [ "$(docker inspect --format='{{.State.Health.Status}}' db)" != "healthy" ]; then
    echo "bd container did not become healthy after $retry_count attempts."
    exit 1
fi

echo "DB container is healthy!"
exit 0