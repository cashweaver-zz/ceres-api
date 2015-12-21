#!/usr/bin/env bash
# Run mongo-express

# Start mongod (if it isn't running)
if [[ ! $(ps -eadf | grep "[m]ongod") ]]
then
  echo "Stating mongod"
  mongod &
fi

echo "Starting mongo-express"
node /home/vagrant/app/node_modules/mongo-express/app.js

# mongod auto-exists when this script is terminated
