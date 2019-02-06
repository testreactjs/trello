import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { v4 } from 'uuid';
import { List, Lists, PopupLogin, Card } from '../../components';
import lists from '../../data';
import { getData, saveData } from '../../storage';
import { usersSelector, getList, commentsSelector, listsSelector, cardsSelector } from '../../selectors';
import { listFactory, userFactory, cardFactory, commentFactory } from '../../factories';

const fakeLists = listFactory(10);
const fakeUsers = userFactory(20);
const fakeCards = cardFactory(200, {
  listId: fakeLists,
  userId: fakeUsers,
});
const fakeComments = commentFactory(2000, {
  userId: fakeUsers,
  cardId: fakeCards,
});
class App extends React.Component {
  constructor(props) {
    super(props);
    const user = getData('username');
    // const { data } = this.state;
    const mappedData = getList({
      users: fakeUsers,
      lists: fakeLists,
      cards: fakeCards,
      comments: fakeComments,
    });

    this.state = {
      data: mappedData,
      user: user || '',
    };
  }

  // Logout
  handleLogout = () => {
    this.setState({ user: '' });
  };

  // Change Title
  handleListTitleChange = (listId, title) => {
    const { data } = this.state;
    const newData = data.map(dataItem => {
      if (dataItem.id === listId) {
        return {
          ...dataItem,
          title,
        };
      }
      return dataItem;
    });
    this.setState({
      data: newData,
    });

    // console.log("newData", newData);
  };

  handleAddCard = (listId, title) => {
    const { data } = this.state;
    const updatedData = data.map(list => {
      const { id } = list;
      if (id === listId) {
        const { cards } = list;
        const idCard = v4();
        return { ...list, cards: [...cards, { listId, id: idCard, title, text: '', user: [], comments: [] }] };
      }
      return list;
    });

    this.setState({ data: updatedData });
  };

  // Login
  togglePopup = value => {
    // console.log("togglePopup". value);
    this.setState({ user: value });
    saveData(value, 'username');
  };

  handleCardClick = card => {
    this.setState({ card, isClickedOnCard: true });
  };

  handleCardChangeTitle = (title, card, listId) => {
    const { data } = this.state;
    const updatedData = data.map(list => {
      const { id } = list;
      if (id === listId) {
        const { cards } = list;
        const newCards = cards.map(item => {
          if (item.id === card.id) {
            return { ...card, title };
          }
          return item;
        });
        return { ...list, cards: newCards };
      }
      return list;
    });
    this.setState({ data: updatedData });
  };

  handleCardChangeDescription = (text, card, listId) => {
    const { data } = this.state;
    const updatedData = data.map(list => {
      const { id } = list;
      if (id === listId) {
        const { cards } = list;
        const newCards = cards.map(item => {
          if (item.id === card.id) {
            return { ...card, text };
          }
          return item;
        });
        return { ...list, cards: newCards };
      }
      return list;
    });
    this.setState({ data: updatedData });
  };

  // Add new comment
  handleAddComment = (text, card, listId) => {
    const { data } = this.state;
    const updatedData = data.map(list => {
      const { id } = list;
      if (id === listId) {
        const { cards } = list;
        const newCards = cards.map(item => {
          if (item.id === card.id) {
            const comments = [
              ...item.comments,
              {
                id: v4(),
                text,
                user: {
                  id: 100000,
                  firstName: 'Ivan',
                  surname: 'Ivanov',
                  avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                },
              },
            ];
            return { ...card, comments };
          }
          return item;
        });
        return { ...list, cards: newCards };
      }
      return list;
    });
    this.setState({ data: updatedData });
  };

  // Del card
  handleRemoveCard = (cardId, listId) => {
    // console.log(cardId, listId);
    const { data } = this.state;
    const updatedData = data.map(list => {
      const { id } = list;
      if (id === listId) {
        const { cards } = list;
        console.log('cards', cards);
        const newCards = cards.filter(item => item.id !== cardId);
        return { ...list, cards: newCards };
      }
      return list;
    });
    this.setState({ data: updatedData });
  };

  // change comment
  handleEditComment = (text, idComment, card, listId) => {
    // console.log('handleEditComment', text, idComment, card, listId);
    const { data } = this.state;
    const updatedData = data.map(list => {
      const { id } = list;
      if (id === listId) {
        const { cards } = list;
        const newCards = cards.map(item => {
          if (item.id === card.id) {
            const comments = item.comments.map(value => {
              // console.log('Rvalue.id === idComment', value.id, idComment);
              if (value.id == idComment) {
                // console.log('Return', { idComment, text, user: value.user, text });
                return { id: idComment, text, user: value.user };
              }
              return value;
            });
            return { ...card, comments };
          }
          return item;
        });
        return { ...list, cards: newCards };
      }
      return list;
    });
    this.setState({ data: updatedData });
  };

  handleDeleteComment = (commentId, card, listId) => {
    const { data, isClickedOnCard } = this.state;
    const updatedData = data.map(list => {
      const { id } = list;
      if (id === listId) {
        const { cards } = list;
        const newCards = cards.map(item => {
          if (item.id === card.id) {
            const comments = item.comments.filter(item => item.id !== commentId);
            return { ...card, comments };
          }
          return item;
        });
        // this.setState({ card: newCards });
        return { ...list, cards: newCards };
      }
      return list;
    });
    // console.log(updatedData);
    this.setState({ data: updatedData });
  };

  render() {
    return this.state.user === '' ? (
      <PopupLogin text="Введите свое имя:" closePopup={this.togglePopup} />
    ) : (
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-5">One more...Trello</h1>
          <button className="btn float-right" onClick={this.handleLogout}>
            Logout
          </button>
          <p className="lead">
            Hello, <b>{this.state.user}</b>
          </p>
        </div>
        <Lists
          lists={this.state.data}
          itemRenderer={list => (
            <List
              list={list}
              onTitleChange={this.handleListTitleChange}
              onAddNewCard={this.handleAddCard}
              itemRenderer={card => (
                <Card
                  onCardSubmitTitle={title => this.handleCardChangeTitle(title, card, list.id)}
                  onSubmitDescription={text => this.handleCardChangeDescription(text, card, list.id)}
                  onCardAddComment={text => this.handleAddComment(text, card, list.id)}
                  onCardEditComment={(text, id) => this.handleEditComment(text, id, card, list.id)}
                  onCardDeleteComment={id => this.handleDeleteComment(id, card, list.id)}
                  onCardRemoveCard={cardId => this.handleRemoveCard(card.id, list.id)}
                  card={card}
                />
              )}
            />
          )}
        />
      </div>
    );
  }
}
/*
        <pre>{JSON.stringify(this.state.data, 2, 2)}</pre>
        */
export default App;
