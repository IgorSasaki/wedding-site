#!/usr/bin/env sh
# Remova as duas linhas abaixo:
# . "$(dirname -- "$0")/_/husky.sh"

pnpm commitlint --edit $1
