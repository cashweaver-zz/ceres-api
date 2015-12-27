#!/usr/bin/env bash
# Run mongo-express

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

. $SCRIPT_DIR/mongod-start.sh

echo "Starting mongo-express..."
echo "  Username: admin"
echo "  Password: pass"
node /home/vagrant/app/node_modules/mongo-express/app.js

# mongod auto-exists when this script is terminated
