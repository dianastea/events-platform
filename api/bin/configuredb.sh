#!/bin/bash

export PGPASSWORD='stemey'

echo "Configuring database: events_db"

dropdb -U stemey events_db
createdb -U stemey events_db 

psql -U stemey events_db < ./bin/sql/events.sql 

echo "events_db configured"