import { listFactory, userFactory, cardFactory, commentFactory } from '../../factories';

export const fakeLists = listFactory(10);
export const fakeUsers = userFactory(20);
export const fakeCards = cardFactory(200, {
  listId: fakeLists,
  userId: fakeUsers,
});
export const fakeComments = commentFactory(2000, {
  userId: fakeUsers,
  cardId: fakeCards,
});
