#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DATA_PATH="/home/vagrant/app/data"

# TODO: check for required files

echo "Importing database"
echo "  stations"
mongoimport --drop --db ceresapi --collection stations $DATA_PATH/processed/stations.json
echo "  plants"
mongoimport --drop --db ceresapi --collection plants $DATA_PATH/processed/plants.json
