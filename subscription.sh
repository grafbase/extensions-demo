#!/bin/bash

curl -N http://localhost:5000/graphql \
    --header 'Accept: text/event-stream' \
    --header "Content-Type: application/json" \
    --data '{"query": "subscription { sales(subject: \"bookSales\") { price isbn }  }", "variables": {}}'
