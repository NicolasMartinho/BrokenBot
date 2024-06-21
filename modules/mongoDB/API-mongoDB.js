
//import modules
import express from "express"
import mongoDB from "./mongoDb.js"


const APImongoDB = express();
const PORT = 3000;

APImongoDB.listen(PORT, async () => {
    mongoDB.connect()

  });


//Get on mongoDB operation
APImongoDB.get("/documents/db/:db/collection/:collection", async (req, res) => {
    const collection = req.params.collection
    const db = req.params.db
    const data = await mongoDB.getAllDocument(db, collection)
    return res.send(data)
  })

