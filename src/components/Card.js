import React from 'react';
import PopupCard from './PopupCard';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isClicked: false };

    console.log('Cards props', this.props);
  }

  renderCards = () => {
    console.log('Card', this.props);
    const { itemRenderer, list } = this.props;
    const { cards } = list;
    return cards.map(card => {
      return React.cloneElement(itemRenderer(card), {
        key: card.id,
      });
    });
  };

  handleLineClicked = e => {
    this.props.onCardClick(this.props.card);
  };

  render() {
    const { title } = this.props.card;
    const { comments } = this.props.card;

    return (
      <div className="alert alert-primary" onClick={this.handleLineClicked}>
        {title}
        <div className="float-right">
          {comments ? comments.length : 0} {String.fromCodePoint(0x1f4ac)}{' '}
        </div>
      </div>
    );
  }
}

export default Card;
