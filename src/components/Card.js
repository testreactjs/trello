import React from 'react';

class Card extends React.Component {
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
  handleLineClicked = e => {
    this.props.onCardClick(this.props.card, this.props.idList);
  };

  render() {
    // console.log('this.props Card', this.props);

    const { title, comments } = this.props.card;
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
