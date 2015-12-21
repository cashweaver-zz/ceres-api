#!/usr/bin/env bash
# Use data from the NCDC to construct a database of weather data

REQUIRED_SCRIPTS=(
"build_database-stations.py"
)
for FILEPATH in "${REQUIRED_SCRIPTS[@]}"
do
  if [[ ! -f "$FILEPATH" ]]
  then
    echo "$FILEPATH is required to build the database. Aborting."
    exit 1;
  fi
done

echo "Building Database:  Stations"
time python build_database-stations.py

# Start mongod (if it isn't running)
KILL_MONGOD=false
if [[ ! $(ps -eadf | grep "[m]ongod") ]]
then
  echo "Stating mongod"
  KILL_MONGOD=true
  mongod &
  # Wait for mongod to start up
  sleep 5s
fi

echo "Dropping gardendb.stations"
mongo gardendb --eval "db.stations.drop()"

echo "Importing new stations data"
mongoimport --db gardendb --collection stations --file ../data/stations-temperature-location.json

# TODO: Ensure this is set up correctly. I'm not sure it is.
echo "Setting 2dsphere index"
mongo gardendb --eval "db.stations.createIndex({'location.lnglat': '2dsphere'})"

if [[ $KILL_MONGOD ]]
then
  kill $(ps -eadf | grep "[m]ongod" | awk '{print $2}')
fi
