#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# TODO: check for required files

echo "Initializing database"
. $SCRIPT_DIR/download_datasets.sh
. $SCRIPT_DIR/build_db.sh
. $SCRIPT_DIR/install_db.sh
