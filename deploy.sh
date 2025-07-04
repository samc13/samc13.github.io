#!/bin/bash
set -e

REPO_DIR=$(pwd)
NEXT_DIR="$REPO_DIR/site" # Adjust if your Next.js app is not in 'site'
OUT_DIR="$NEXT_DIR/out"
DEPLOY_DIR="$REPO_DIR/docs"

echo "Cleaning previous build..."
rm -rf "$OUT_DIR"
rm -rf "$DEPLOY_DIR"/*

echo "Building Next.js app..."
cd "$NEXT_DIR"
npm install
npx next build

echo "Copying exported site to /docs..."
cd "$REPO_DIR"
mkdir -p "$DEPLOY_DIR"
cp -r "$OUT_DIR"/* "$DEPLOY_DIR/"

# Rename docs/home.html to docs/index.html if it exists and rename docs/Home.html to docs/index.html
if [ -f "$DEPLOY_DIR/home.html" ]; then
    if [ -f "$DEPLOY_DIR/index.html" ]; then
        echo "Removing old index.html..."
        rm "$DEPLOY_DIR/index.html"
    fi
  echo "Renaming home.html to index.html..."
  mv "$DEPLOY_DIR/home.html" "$DEPLOY_DIR/index.html"
fi

echo "Deployment files are ready in /docs."
echo "Add, commit, and push changes to publish on GitHub Pages:"
echo ""
echo "git add docs"
echo "git commit -m 'Deploy static site to GitHub Pages'"
echo "git push"