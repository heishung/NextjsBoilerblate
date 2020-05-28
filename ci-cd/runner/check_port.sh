#!/bin/bash

HOST_CHECK=`echo $1 | cut -d "@" -f2`

nc -z $HOST_CHECK $DEPLOY_PORT_PROD -w 3

if [ $? == 1 ]; then
  CHECK_PORT="FAILED"
else
  CHECK_PORT="OK"
fi

echo $CHECK_PORT

