import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { v4 } from 'uuid';
import { List, Lists, PopupLogin, Card } from '../../components';
import lists from '../../data.js';
import { getData, saveData } from '../../storage';
import PopupCard from '../../components/PopupCard';

class App extends React.Component {
  constructor(props) {
    super(props);
    const user = getData('username');
    this.state = {
      data: lists,
      user: user || '',
      isClickedOnCard: false,
      card: {},
      listId: '',
    };
  }

  // Write on local storage
  componentDidMount() {
    saveData(this.state.data, 'data');
    // saveData(this.state.user, "username");
  }

  // Logout
  handleLogout = () => {
    this.setState({ user: '' });
  };

  // Change Title
  handleListTitleChange = (listId, title) => {
    // console.log('handleListTitleChange ', listId, title);
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
    this.setState(
      {
        data: newData,
      },
      () => {
        saveData(newData, 'data');
      },
    );

    // console.log("newData", newData);
  };

  // Update data
  changeData = (id, list) => {
    const { data } = this.state;
    const newData = data.map(dataItem => {
      if (dataItem.id === id) {
        return {
          ...list,
        };
      }
      return dataItem;
    });
    this.setState(
      {
        data: newData,
      },
      () => {
        saveData(newData, 'data');
      },
    );
  };

  handleAddCard = (listId, title) => {
    // console.log('handleAddCard!!!!', title);
    const { data } = this.state;
    const updatedData = data.map(list => {
      const { id } = list;
      if (id === listId) {
        const { cards } = list;
        return { ...list, cards: [...cards, { id: v4(), title, text: '', user: getData('username'), comments: [] }] };
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

  changeCard = () => {
    console.log('changeCard');
  };

  // Нажатие по карте
  // idList - id большого листа (TODO, testing)

  handleCardClick = (card, idList) => {
    // console.log('handleCardClick', card, idList);
    this.setState({ card, isClickedOnCard: true, listId: idList });
  };

  handleCardChangeTitle = title => {
    const { data, listId, card } = this.state;
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

  handleCardChangeDescription = text => {
    const { data, listId, card } = this.state;
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

  handleAddComment = text => {
    console.log('handleAddComment');
    const { data, listId, card } = this.state;
    const updatedData = data.map(list => {
      const { id } = list;
      if (id === listId) {
        const { cards } = list;
        const newCards = cards.map(item => {
          if (item.id === card.id) {
            const comments = [...item.comments, { id: v4(), text, user: getData('username') }];
            console.log({ ...card, comments });
            return { ...card, comments };
          }
          return item;
        });
        return { ...list, cards: newCards };
      }
      return list;
    });
    // console.log(updatedData);
    this.setState({ data: updatedData }, console.log(this.state.data));
  };

  handleRemoveCard = () => {
    console.log('handleRemoveCard');
    this.setState({ isClickedOnCard: false });
    const { data, listId, card } = this.state;
    const updatedData = data.map(list => {
      const { id } = list;
      if (id === listId) {
        const { cards } = list;
        const newCards = cards.filter(item => item.id !== card.id);
        return { ...list, cards: newCards };
      }
      return list;
    });
    this.setState({ data: updatedData });
  };

  // закрытие карты
  handleClose = () => {
    this.setState({ isClickedOnCard: false });
  };

  handleEditComment = () => {
    console.log('handleEditComment');
  };

  handleDeleteComment = commentId => {
    console.log('handleDeleteComment');
    const { data, listId, card } = this.state;
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
        return { ...list, cards: newCards };
      }
      return list;
    });
    // console.log(updatedData);
    this.setState({ data: updatedData }, console.log(this.state.data));
  };

  render() {
    const { data, isClickedOnCard, card } = this.state;
    console.log('RENDER index.js');
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
          lists={data}
          itemRenderer={list => (
            <List
              list={list}
              onTitleChange={this.handleListTitleChange}
              onAddNewCard={this.handleAddCard}
              itemRenderer={card => (
                <Card card={card} onCardChangeTitle={this.handleCardChangeTitle} onCardClick={this.handleCardClick} />
              )}
            />
          )}
        />
        {this.state.isClickedOnCard ? (
          <PopupCard
            item={card}
            closePopup={this.handleClose}
            onCardSubmitTitle={this.handleCardChangeTitle}
            onCardSubmitDescription={this.handleCardChangeDescription}
            onCardAddComment={this.handleAddComment}
            onCardEditComment={this.handleEditComment}
            onCardDeleteComment={this.handleDeleteComment}
            onCardRemoveCard={this.handleRemoveCard}
            changeCard={this.changeCard}
          />
        ) : (
          ''
        )}
        <pre>{JSON.stringify(this.state.data, 2, 2)}</pre>
      </div>
    );
  }
}

export default App;
