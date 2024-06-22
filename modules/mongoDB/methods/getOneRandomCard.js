export const getOneRandomCard = async (
  client,
  { database, collection },
  { rarity }
) => {
  const db = client.db(database);
  const coll = db.collection(collection);
  const cursor = coll.aggregate([
    { $match: { rarity: +rarity } },
    { $sample: { size: 1 } },
  ]);
  const result = [];
  for await (const doc of cursor) {
    result.push(doc);
  }
  return result[0];
};
