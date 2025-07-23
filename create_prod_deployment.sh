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

echo "Adding .nojekyll";
touch "$DEPLOY_DIR/.nojekyll";

echo "Ensuring home page redirects..."
cat > docs/index.html <<EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="0; url=/home" />
    <title>Redirecting...</title>
  </head>
  <body>
    <p>Redirecting to <a href="/home">/home</a></p>
    <script>
      window.location.replace("/home");
    </script>
  </body>
</html>
EOF

echo "Deployment files are ready in /docs."
echo "Add, commit, and push changes to publish on GitHub Pages:"
echo ""
echo "git add docs"
echo "git commit -m 'Deploy static site to GitHub Pages'"
echo "git push"