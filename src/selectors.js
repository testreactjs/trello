import { createSelector } from 'reselect';

export const commentsSelector = data => data.comments;
export const usersSelector = data => data.users;
export const cardsSelector = data => data.cards;
export const listsSelector = data => data.lists;

export const getComments = createSelector(
  [commentsSelector, usersSelector],
  (comments, users) => {
    return comments.map(comment => {
      const { userId } = comment;
      const user = users.find(item => item.id === userId);
      return {
        ...comment,
        user,
      };
    });
  },
);

export const getCards = createSelector(
  [cardsSelector, usersSelector, getComments],
  (cards, users, comments) => {
    return cards.map(card => {
      const { userId, id } = card;
      const user = users.find(value => value.id === userId);
      const cardComments = comments.filter(value => value.cardId === id);

      return {
        ...card,
        user,
        comments: cardComments,
      };
    });
  },
);

export const getList = createSelector(
  [listsSelector, getCards],
  (lists, cards) => {
    return lists.map(list => {
      const { id } = list;
      const listCards = cards.filter(item => item.listId === id);
      return {
        ...list,
        cards: listCards,
      };
    });
  },
);
