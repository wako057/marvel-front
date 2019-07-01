#!/bin/bash

curl -sS localhost:8080/v1/status |grep -E '^OK$' || exit 1
