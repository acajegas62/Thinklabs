#!/bin/zsh
cd -- "${0:A:h}" || exit 1
if ! command -v python3 >/dev/null 2>&1; then
  print 'Python 3 is required to run this launcher.'
  read -r '?Press Return to close.'
  exit 1
fi
python3 serve.py
result=$?
if (( result != 0 )); then
  read -r '?Press Return to close.'
fi
exit "$result"
