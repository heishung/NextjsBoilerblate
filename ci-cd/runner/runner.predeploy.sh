#!/bin/bash

# Stop script when error
set -e;

DEPLOY_HOST=$1
DEPLOY_PORT=$2
PROJECT_LOCATION=$3
# Run predeploy script
ssh $DEPLOY_HOST -p $DEPLOY_PORT <<EOT
    set -e;
    cd $PROJECT_LOCATION;
    echo "Runner step 1: Fetch code from git server";
    git fetch;
    echo "Runner step 3: Run predeploy script";
    # Set build ref to environment
    export CI_BUILD_REF=$CI_BUILD_REF;

EOT
