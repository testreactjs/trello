export const constants = {
  ADD_CARD: 'ADD_CARD',
  REMOVE_CARD: 'REMOVE_CARD',
  CHANGE_TITLE_CARD: 'CHANGE_TITLE_CARD',
};

const cardReducer = (state, action) => {
  switch (action.type) {
    case constants.ADD_CARD:
      return [
        ...state,
        {
          listId: action.listId,
          userId: action.userId,
          id: action.id,
          title: action.title,
          text: action.text,
        },
      ];
    case constants.REMOVE_CARD:
      return [...state.filter(card => card.id != action.id)];
    case constants.CHANGE_TITLE_CARD:
      return {
        id: action.id,
      };
    default:
      return state;
  }
};

export default cardReducer;
