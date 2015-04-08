#!/usr/bin/env bash

PY_VERSION=`python -c 'import sys; print("%i" % (sys.hexversion<0x03000000))'`

if [ $PY_VERSION -eq 0 ]; then
    python -m http.server
else
    python -m SimpleHTTPServer
fi
