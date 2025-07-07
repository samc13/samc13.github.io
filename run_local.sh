#!/bin/bash

cd "$(dirname "$0")/site" || { echo "Could not find 'site' directory"; exit 1; }
npm run dev;