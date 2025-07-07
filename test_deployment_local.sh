#!/bin/bash

cd "$(dirname "$0")/docs" || { echo "Could not find 'docs' directory"; exit 1; }
python3 -m http.server 8080;