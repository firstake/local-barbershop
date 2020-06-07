FROM mongo:4.2.6

COPY ./dump ./dump

EXPOSE 27017

CMD [ "mongod" ]

# Create a volume to store db files locally
# docker volume create --name mongodata

# To run container:
# docker build -t mongodb .
# docker run -v mongodata:/data/db -p 37017:27017 -d mongodb

# To restore data:
# docker ps
# docker exec -it <CONTAINER ID> bash
# mongorestore
# exit
