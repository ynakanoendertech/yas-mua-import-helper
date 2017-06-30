#!/bin/bash

lessc \
  --source-map-less-inline --source-map-map-inline \
  "less/style.less" > "css/style.css"
