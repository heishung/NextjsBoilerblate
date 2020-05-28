#!/bin/bash

# Stop script when error
set -e;

DEPLOY_HOST=$1
DEPLOY_PORT=$2
PROJECT_LOCATION=$3
PM2_NAME=$4
BUILD_ENV=$5

# Deploy via ssh
ssh $DEPLOY_HOST -p $DEPLOY_PORT <<EOT
    set -e;
    cd $PROJECT_LOCATION;
    echo "Step 1: Get new all code from git"
    git fetch;
    git reset --hard $CI_BUILD_REF;
    echo "Step 2: rsync build dir to root"
    rsync -rahq --delete tmp/.next/ .next/
    rsync -rahq --delete tmp/node_modules/ node_modules/
    echo "Step 3: reload pm2";
    pm2 reload $PM2_NAME --update-env;
EOT
