export const getAllDocument = async (client, { database, collection }) => {
  const db = client.db(database);
  const coll = db.collection(collection);
  const cursor = coll.find();
  const result = [];
  for await (const doc of cursor) {
    result.push(doc);
  }
  return result;
};

