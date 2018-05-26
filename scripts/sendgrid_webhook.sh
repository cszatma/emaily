#!/usr/bin/env bash

localtunnel() {
  lt -s "appsterdantum" --port 5000
}

until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
