import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { TicketsList, Ticket, Lists } from '../../components';

const lists = [
  {
    id: 1,
    title: 'TODO',
    cards: [
      {
        id: 1,
        title: 'Card 1 title',
      },
      {
        id: 2,
        title: 'Card 2 title',
      },
    ],
  },
  {
    id: 2,
    title: 'In Progress',
    cards: [
      {
        id: 3,
        title: 'Card 3 title',
      },
      {
        id: 4,
        title: 'Card 4 title',
      },
    ],
  },
  {
    id: 3,
    title: 'Testing',
    cards: [
      {
        id: 3,
        title: 'Card 5 title',
      },
      {
        id: 4,
        title: 'Card 6 title',
      },
    ],
  },
  {
    id: 4,
    title: 'Done',
    cards: [
      {
        id: 1,
        title: 'Card 6 title',
      },
      {
        id: 1,
        title: 'Card 7 title',
      },
    ],
  },
];

class App extends React.Component {
  state = {
    data: lists,
  };

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

  handleCardChange = (listId, cardId, title) => {};

  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-5">One more...Trello</h1>
          <p className="lead">Hello, userNAME</p>
        </div>
        <Lists
          lists={lists}
          itemRenderer={list => (
            <TicketsList
              list={list}
              onTitleChange={this.handleListTitleChange}
              cardRenderer={card => <h1 onClick={cardId => this.handleCardChange(list.id, cardId)}>Hello</h1>}
            />
          )}
        />
        <pre>{JSON.stringify(this.state.data, 2, 2)}</pre>
      </div>
    );
  }
}

export default App;
