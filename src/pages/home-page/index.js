import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { connect } from 'react-redux';

import { List, Lists, PopupLogin, Card } from '../../components';
import { getData, saveData } from '../../storage';
import { getList } from '../../selectors';

import {
  changeTitleListAction,
  addCardAction,
  changeTitleCardAction,
  changeDescriptionCardAction,
  addCommentAction,
} from '../../redux/actions';

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

  // Login
  togglePopup = value => {
    // console.log("togglePopup". value);
    this.setState({ user: value });
    saveData(value, 'username');
  };

  handleCardClick = card => {
    this.setState({ card, isClickedOnCard: true });
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
    const {
      list: mappedListData,
      handleChangeListTitle,
      handleAddCard,
      handleCardChangeTitle,
      handleCardChangeDescription,
      handleAddComment,
    } = this.props;

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
              onAddNewCard={handleAddCard}
              itemRenderer={card => (
                <Card
                  onCardSubmitTitle={handleCardChangeTitle}
                  onSubmitDescription={handleCardChangeDescription}
                  onCardAddComment={handleAddComment}
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
  handleAddCard: addCardAction,
  handleCardChangeTitle: changeTitleCardAction,
  handleCardChangeDescription: changeDescriptionCardAction,
  handleAddComment: addCommentAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
