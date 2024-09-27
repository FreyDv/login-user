#!/bin/bash
set -e
echo "Running build-all"

start=$(date +%s)

echo "Building start: $start"

docker compose -f docker-compose.yml  up --build

end=$(date +%s)
echo "Building End: $end"
echo "Building Execution time was $(expr $end - $start) seconds."