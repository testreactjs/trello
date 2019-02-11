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
  deleteCardAction,
  addCommentAction,
  editCommentAction,
  delCommentAction,
} from '../../redux/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    const user = getData('username');
    // const { data } = this.state;

    this.state = {
      user: user || '',
    };
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

  render() {
    const {
      list: mappedListData,
      handleChangeListTitle,
      handleAddCard,
      handleCardChangeTitle,
      handleCardChangeDescription,
      handleDeleteCard,
      handleAddComment,
      handleEditComment,
      handleDeleteComment,
    } = this.props;

    const { user } = this.state;

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
                  onCardEditComment={handleEditComment}
                  onCardDeleteComment={handleDeleteComment}
                  onCardRemoveCard={handleDeleteCard}
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
  handleDeleteCard: deleteCardAction,
  handleAddComment: addCommentAction,
  handleEditComment: editCommentAction,
  handleDeleteComment: delCommentAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
