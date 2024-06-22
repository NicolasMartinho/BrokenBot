import mongoDB from "mongodb";
//connection parameters
const user = "api_user";
const pass = "nxW1gXVwD1nmVukn";
const url = `mongodb+srv://${user}:${pass}@cluster0.dtzu7gn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;

const mongoDbClient = new mongoDB.MongoClient(url);

export default mongoDbClient;
