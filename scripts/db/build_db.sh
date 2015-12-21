#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Building database collections"
for f in $(ls build_db-*)
do
  COLLECTION=$(echo $f | sed 's/build_db-//' | sed 's/.py//')
  echo "  Building: $COLLECTION"
  . $SCRIPT_DIR/$f
done

echo "Done building database collections"

