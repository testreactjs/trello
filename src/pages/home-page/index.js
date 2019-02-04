import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { v4 } from 'uuid';
import { TicketsList, Lists, PopupLogin } from '../../components';
import lists from '../../data.js';
import { getData, saveData } from '../../storage';

class App extends React.Component {
  constructor(props) {
    super(props);
    const user = getData('username');
    this.state = {
      data: lists,
      user: user || '',
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
    const { data } = this.state;
    const updatedData = data.map(list => {
      const { id } = list;
      if (id === listId) {
        const { cards } = list;
        return { ...list, cards: [...cards, { id: v4(), title, comments: [] }] };
      }
      return list;
    });

    this.setState({ data: updatedData }, () => {
      console.log('Updated data: ', this.state.data);
    });
  };

  // Удаление карточки
  removeCard = idRemove => {
    console.log('remove', this.state.list, idRemove);
    /*
    const list = this.state.list;
    const cards = this.state.list.cards.filter(value => {
      if (value.id != idRemove) {
        return value;
      }
    });
    list.cards = cards;

    // console.log(list);
    this.setState({ list }, () => {
      this.props.changeData(this.props.list.id, this.state.list);
    });
    */
  };

  // Login
  togglePopup = value => {
    // console.log("togglePopup". value);
    this.setState({ user: value });
    saveData(value, 'username');
  };

  render() {
    const { data } = this.state;
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
            <TicketsList
              list={list}
              onTitleChange={this.handleListTitleChange}
              onAddNewCard={this.handleAddCard}
              changeData={this.changeData}
              removeCard={this.removeCard}
            />
          )}
        />
        <pre>{JSON.stringify(this.state.data, 2, 2)}</pre>
      </div>
    );
  }
}

export default App;
/*

              itemRenderer={() => (
                <Card
                  onCArdTitleChange={this.handleCardTitleChange}
                  commentsRenderer={() => (
                    <Comments itemRenderer={() => <Comment onChange={this.handleCommentChange} />} />
                  )}
                />
              )}
              */
