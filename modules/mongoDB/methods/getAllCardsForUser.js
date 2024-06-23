export const getAllCardsForUser = async (
  client,
  { database, collection },
  { user }
) => {
  const db = client.db(database);
  const users = db.collection(collection);

  const filter = { id: user.id };

  const currentUser = await users.findOne(filter);

  let cards = [];
  if (currentUser) {
    cards = currentUser.cards;
  }
  return cards;
};
