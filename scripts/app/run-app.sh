#!/usr/bin/env bash
# Run the main garden app server

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

. $SCRIPT_DIR/mongod-start.sh

echo "Starting application..."
node /home/vagrant/app/server.js

# mongod auto-exists when this script is terminated
