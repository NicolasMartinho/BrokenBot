import mongoDB from "mongodb"
//connection parameters
const user = "api_user";
const pass = "nxW1gXVwD1nmVukn";
const url = `mongodb+srv://${user}:${pass}@cluster0.dtzu7gn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;

const client = new mongoDB.MongoClient(url);

const connect = async () => {
  console.log("Trying to connect : " + url);
  await client.connect();
  console.log(`Connection successful`);
};

const getAllDocument = async (database, collection) => {
  const db = client.db(database)
  const coll = db.collection(collection) 
  const cursor = coll.find()
  const result = []
  for await (const doc of cursor) {
    result.push(doc)
  }
  return result
};

export default {
  connect,
  getAllDocument,
  client,
}
