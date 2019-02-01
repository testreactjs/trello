import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { TicketsList, Ticket, Lists, PopupLogin } from '../../components';
import lists from '../../data.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: lists,
      userName: 'ss',
    };
  }

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
  };

  handleOnCardClick = card => {
    <h1 onClick={cardId => this.handleCardChange(list.id, cardId)}>Hello</h1>;
  };

  handleCardChange = (listId, cardId, title) => {};

  togglePopup = value => {
    this.setState({ userName: value });
  };

  render() {
    console.log('lists', lists);
    return this.state.userName === '' ? (
      <PopupLogin text="Enter your name:" closePopup={this.togglePopup} />
    ) : (
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-5">One more...Trello</h1>
          <p className="lead">
            Hello, <b>{this.state.userName}</b>
          </p>
        </div>
        <Lists
          lists={lists}
          itemRenderer={list => (
            /*
            <TicketsList
              list={list}
              onTitleChange={this.handleListTitleChange}
              cardRenderer={card => <h1 onClick={cardId => this.handleCardChange(list.id, cardId)}>Hello</h1>}
            />
            */
            <TicketsList list={list} onTitleChange={this.handleListTitleChange} cardRenderer={this.handleOnCardClick} />
          )}
        />
        <pre>{JSON.stringify(this.state.data, 2, 2)}</pre>
      </div>
    );
  }
}

export default App;
