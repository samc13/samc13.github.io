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

PORT=${1:-4000}

main() {
    if command -v python3 &>/dev/null; then
        msg "${GREEN}Serving at http://localhost:$PORT${NOFORMAT}"
        python3 -m http.server "$PORT"
    elif command -v python &>/dev/null; then
        msg "${GREEN}Serving at http://localhost:$PORT${NOFORMAT}"
        python -m SimpleHTTPServer "$PORT"
    else
        msg "${YELLOW}Python is not installed. Please install Python 3 or 2.${NOFORMAT}"
        exit 1
    fi
}

setup_colors;
main;
exit 0;