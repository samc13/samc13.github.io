#!/bin/zsh
set -e # exit immediately if any command fails
set -E # trap ERR from calls within functions
#set -u # does not play nicely with `source $HOME/.zshrc` as it will not be able to find the variable $ZSH_CUSTOM or $ZSH_CACHE_DIR etc. and so on
set -o pipefail # exit immediately if any command in a pipeline (e.g. foo | echo "bar") fails. Otherwise, only rightmost in a pipeline is considered for -e

setup_colors() {
  if [[ -t 2 ]] && [[ -z "${NO_COLOR-}" ]] && [[ "${TERM-}" != "dumb" ]]; then
    NOFORMAT='\033[0m' RED='\033[0;31m' GREEN='\033[0;32m' ORANGE='\033[0;33m' BLUE='\033[0;34m' PURPLE='\033[0;35m' CYAN='\033[0;36m' YELLOW='\033[1;33m'
  else
    NOFORMAT='' RED='' GREEN='' ORANGE='' BLUE='' PURPLE='' CYAN='' YELLOW=''
  fi
}

msg() {
  echo >&2 -e "${1-}"
}

main() {
  REPO_DIR=$(pwd)
  NEXT_DIR="$REPO_DIR/site" # Adjust if your Next.js app is not in 'site'
  OUT_DIR="$NEXT_DIR/out"
  DEPLOY_DIR="$REPO_DIR/docs"

  msg "${GREEN}Cleaning previous build...${NOFORMAT}"
  rm -rf "$OUT_DIR"
  if ls "$DEPLOY_DIR"/* 1> /dev/null 2>&1; then
    rm -rf "$DEPLOY_DIR"/*
  fi

  msg "${GREEN}Building Next.js app...${NOFORMAT}"
  cd "$NEXT_DIR"
  npm install
  npx next build

  msg "${GREEN}Copying exported site to /docs...${NOFORMAT}"
  cd "$REPO_DIR"
  mkdir -p "$DEPLOY_DIR"
  cp -r "$OUT_DIR"/* "$DEPLOY_DIR/"

  msg "${GREEN}Adding .nojekyll${NOFORMAT}";
  touch "$DEPLOY_DIR/.nojekyll";

  msg "${GREEN}Ensuring home page redirects...${NOFORMAT}"
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

  msg "${GREEN}Deployment files are ready in /docs.${NOFORMAT}"
  msg "${GREEN}Add, commit, and push changes to publish on GitHub Pages:${NOFORMAT}"
  msg ""
  msg "${GREEN}git add docs${NOFORMAT}"
  msg "${GREEN}git commit -m 'Deploy static site to GitHub Pages'${NOFORMAT}"
  msg "${GREEN}git push${NOFORMAT}"
}

setup_colors;
main;
exit 0;