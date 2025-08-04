#!/bin/bash
cd /home/kavia/workspace/code-generation/poll-engagement-analytics-dashboard-20160/fanengage_analytics_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

