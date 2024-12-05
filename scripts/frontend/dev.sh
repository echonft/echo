#!/bin/sh

dir=$(cd "$(dirname "$0")" && pwd)
ENV=development "$dir"/../../app/frontend/scripts/dev.sh
