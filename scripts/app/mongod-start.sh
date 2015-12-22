#!/usr/bin/env bash
# Start mongod if it's not already running

if [[ ! $(ps -eadf | grep "[m]ongod") ]]
then
  echo "Stating mongod"
  mongod &
fi
