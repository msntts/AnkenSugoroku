#!/bin/bash

if [ $# = 0 ]; then
  npm install && ng build --prod
else 
  ${@:1:($#)}
fi
