#!/bin/bash

target="/graphic-assets/images/*"
let count=0

for f in "/graphic-assets/images/*"
do
    echo $(basename $f)
    let count=count+1
done
echo ""
echo "Count: $count"

$SHELL