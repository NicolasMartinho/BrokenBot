export const upsertOneCardToUser = async (
  client,
  { database, collection },
  { user, card }
) => {
  const db = client.db(database);
  const users = db.collection(collection);

  const filter = { id: user.id };

  const currentUser = await users.findOne(filter);
  let cards = [];
  if (currentUser) {
    cards = currentUser.cards;
  }

  let cardsToInsert = [];
  const indexOfCard = cards.findIndex((elem) => elem.id === card.id);
  if (indexOfCard !== -1) {
    const preArray = cards.slice(0, indexOfCard);
    const cardWithUpdatedQuantity = {
      ...cards[indexOfCard],
      quantity: cards[indexOfCard].quantity + 1,
    };
    const postArray = cards.slice(indexOfCard + 1);

    cardsToInsert = [...preArray, cardWithUpdatedQuantity, ...postArray];
  } else {
    cardsToInsert = [...cards, { ...card, quantity: 1 }];
  }

  const updateDoc = {
    $set: {
      id: user.id,
      name: user.username,
      cards: cardsToInsert,
    },
  };

  const options = { upsert: true };

  await users.updateOne(filter, updateDoc, options);
  return;
};
