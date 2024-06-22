export const addOneDocument = async (client, { database, collection }, payload) => {
    const body = payload
    const db = client.db(database);
    const coll = db.collection(collection);

    const result = await coll.insertOne(payload);
    return result;
  };
  