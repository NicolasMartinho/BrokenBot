import { MongoClient } from "mongodb"
//connection parameters
const user = "api_user";
const pass = "nxW1gXVwD1nmVukn";
const url = `mongodb+srv://${user}:${pass}@cluster0.dtzu7gn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;

const client = new MongoClient(url);

const connect = async () => {
  console.log("Trying to connect : " + url);
  const connection = await client.connect();
  console.log(`Connection successful`);
  console.log(connection)
};

const getAllDocument = (database, collection) => {
  const db = client.db(database)
  //console.log(db)
  const data = db.collection(collection).find()
  console.log(data)
  return data
};

export default {
  connect,
  getAllDocument,
}
