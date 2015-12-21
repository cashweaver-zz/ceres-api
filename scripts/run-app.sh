#!/usr/bin/env bash
# Run the main garden app server

# Start mongod (if it isn't running)
if [[ ! $(ps -eadf | grep "[m]ongod") ]]
then
  echo "Stating mongod"
  mongod &
fi

node /home/vagrant/app/server.js

# mongod auto-exists when this script is terminated
