#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

mkdir -p "/home/vagrant/app/data/processed"

echo "Building database collections"
for BUILDER_PATH in $(ls $SCRIPT_DIR/build_db-*); do
  COLLECTION="$( echo "$BUILDER_PATH" | sed 's/.*build_db-//' | sed 's/.py//')"
  echo "  Building: $COLLECTION"
  python $BUILDER_PATH
done

echo "Done building database collections"

