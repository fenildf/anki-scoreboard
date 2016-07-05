FROM mongo

COPY datasets /tmp/datasets

RUN mkdir -p /data/db
VOLUME /data/db

RUN echo "Importing sample data ..."
RUN cat /tmp/datasets/players.json
RUN mkdir -p /data/db && mongod --fork --logpath=/tmp/mongodb.log && sleep 20 && \
mongoimport  --db ankiDemo --collection players --drop --jsonArray --file /tmp/datasets/players.json  && mongod --shutdown
RUN echo "DONE"
