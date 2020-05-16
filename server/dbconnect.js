const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

let connectedClient;

const dbConnect = async () => {
  if (!connectedClient) {
    connectedClient = await mongoClient.connect();
    return connectedClient;
  }
  return connectedClient;
}

module.exports = dbConnect;
