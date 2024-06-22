export const upsertOneCardToUser = async (
  client,
  { database, collection },
  { user, card }
) => {
  console.log(user);
  console.log(card);
  const db = client.db(database);
  const users = db.collection(collection);

  const filter = { id: user.id };
  /* Set the upsert option to insert a document if no documents match
  the filter */
  const options = { upsert: true };
  // Specify the update to set a value for the plot field
  const updateDoc = {
    $set: {
      id: user.id,
      cards: [card],
    },
  };
  // Update the first document that matches the filter
  await users.updateOne(filter, updateDoc, options);
  // const cursor = coll.aggregate([
  //   { $match: { rarity: +rarity } },
  //   { $sample: { size: 1 } },
  // ]);
  // const result = [];
  // for await (const doc of cursor) {
  //   result.push(doc);
  // }
  return;
};
