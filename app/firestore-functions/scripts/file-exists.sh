#!/bin/sh
if [ ! -f "$1" ]; then
  echo "Error: File '$1' not found!"
  exit 1
fi
