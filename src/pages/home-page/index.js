import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { connect } from 'react-redux';

import { List, Lists, PopupLogin, Card } from '../../components';
import { getData, saveData } from '../../storage';
import { getList } from '../../selectors';

import { changeTitleListAction } from '../../redux/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    const user = getData('username');
    // const { data } = this.state;

    this.state = {
      user: user || '',
    };
    console.log('this.props', this.props);
  }

  // Logout
  handleLogout = () => {
    this.setState({ user: '' });
  };

  // Change Title
  /*
  handleListTitleChange = (listId, title) => {
    const {
      data: { lists: listsFromState },
    } = this.state;
    const lists = listsFromState.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          title,
        };
      }
      return list;
    });
    this.setState({
      data: { ...this.state.data, lists },
    });
  };
*/
  // Add new card
  handleAddCard = (listId, title) => {
    /*
    const {
      data: { cards: cardsFromState },
    } = this.state;

    const lastCard = cardsFromState[cardsFromState.length - 1];
    const cards = [...cardsFromState, { userId: lastCard.userId, listId, id: lastCard.id + 1, title }];
    this.setState({
      data: { ...this.state.data, cards },
    });
    */
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

  // Change Title Card
  // changed!!
  handleCardChangeTitle = (title, id) => {
    /*
    const {
      data: { cards: cardsFromState },
    } = this.state;
    const cards = cardsFromState.map(card => {
      if (id === card.id) {
        return { ...card, title };
      }
      return card;
    });
    this.setState({ data: { ...this.state.data, cards } });
    */
  };

  // changed!!
  handleCardChangeDescription = (text, cardId) => {
    /*
    const {
      data: { cards: cardsFromState },
    } = this.state;
    const cards = cardsFromState.map(card => {
      if (cardId === card.id) {
        return { ...card, text };
      }
      return card;
    });
    this.setState({ data: { ...this.state.data, cards } });
    */
  };

  // Add new comment
  // changed
  handleAddComment = (text, cardId) => {
    /*
    const {
      data: { comments: commentsFromState },
    } = this.state;
    const lastComment = commentsFromState[commentsFromState.length - 1];
    const comments = [...commentsFromState, { userId: lastComment.userId, cardId, id: lastComment.id + 1, text }];
    this.setState({ data: { ...this.state.data, comments } });
    */
  };

  // Del card
  // changed
  handleRemoveCard = cardId => {
    /*
    const {
      data: { cards: cardsFromState },
    } = this.state;
    const cards = cardsFromState.filter(card => cardId !== card.id);
    this.setState({ data: { ...this.state.data, cards } });
    */
  };

  // Change comment
  // changed
  handleEditComment = (text, idComment) => {
    /*
    // console.log('handleEditComment', text, idComment);
    const {
      data: { comments: commentsFromState },
    } = this.state;
    const comments = commentsFromState.map(comment => {
      if (comment.id === idComment) {
        return { ...comment, text };
      }
      return comment;
    });
    this.setState({ data: { ...this.state.data, comments } });
    */
  };

  // Delete comment
  handleDeleteComment = commentId => {
    /*
    const {
      data: { comments: commmentsFromState },
    } = this.state;
    const comments = commmentsFromState.filter(comment => comment.id !== Number(commentId));
    this.setState({ data: { ...this.state.data, comments } });
    */
  };

  render() {
    const { list: mappedListData, handleChangeListTitle } = this.props;
    console.log(handleChangeListTitle);
    const { user } = this.state;
    console.log('render', mappedListData);
    return user === '' ? (
      <PopupLogin text="Введите свое имя:" closePopup={this.togglePopup} />
    ) : (
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-5">One more...Trello</h1>
          <button className="btn float-right" onClick={this.handleLogout}>
            Logout
          </button>
          <p className="lead">
            Hello, <b>{user}</b>
          </p>
        </div>
        <Lists
          lists={mappedListData}
          itemRenderer={list => (
            <List
              list={list}
              onTitleChange={handleChangeListTitle}
              onAddNewCard={this.handleAddCard}
              itemRenderer={card => (
                <Card
                  onCardSubmitTitle={title => this.handleCardChangeTitle({ title, cardId: card.id })}
                  onSubmitDescription={text => this.handleCardChangeDescription(text, card.id)}
                  onCardAddComment={text => this.handleAddComment(text, card.id)}
                  onCardEditComment={(text, id) => this.handleEditComment(text, id)}
                  onCardDeleteComment={id => this.handleDeleteComment(id)}
                  onCardRemoveCard={cardId => this.handleRemoveCard(card.id)}
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

const mapStateToProps = store => {
  return {
    list: getList(store),
  };
};

const mapDispatchToProps = {
  handleChangeListTitle: changeTitleListAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
