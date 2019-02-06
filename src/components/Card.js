import React from 'react';
import PopupCard from './PopupCard';

class Card extends React.Component {
  state = {
    isShowingModal: false,
  };

  renderModal = () => {
    const { idList } = this.props;
    return this.props.modalRenderer(idList);
  };

  handleLineClicked = () => {
    this.setState({ isShowingModal: true });
  };

  handleCardClose = () => {
    this.setState({ isShowingModal: false });
  };

  render() {
    const { isShowingModal } = this.state;
    const {
      card,
      onSubmitDescription,
      onCardSubmitTitle,
      onCardAddComment,
      onCardDeleteComment,
      onCardRemoveCard,
      onCardEditComment,
    } = this.props;
    const { title, comments } = card;
    return (
      <section>
        {isShowingModal && (
          <PopupCard
            data={card}
            onCardSubmitTitle={onCardSubmitTitle}
            onCardAddComment={onCardAddComment}
            onCardEditComment={onCardEditComment}
            onCardDeleteComment={onCardDeleteComment}
            onCardRemoveCard={onCardRemoveCard}
            onSubmitDescription={onSubmitDescription}
            onClose={this.handleCardClose}
          />
        )}
        <div className="alert alert-primary" onClick={this.handleLineClicked}>
          {title}
          <div className="float-right">
            {comments ? comments.length : 0} {String.fromCodePoint(0x1f4ac)}{' '}
          </div>
        </div>
      </section>
    );
  }
}

export default Card;

/*
  renderCards = () => {
    const {
      itemRenderer,
      list: { cards },
    } = this.props;

    return cards.map(card => {
      return React.cloneElement(itemRenderer(card), {
        key: card.id,
      });
    });
  };
*/
