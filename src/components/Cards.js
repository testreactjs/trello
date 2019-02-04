import React, { Component } from 'react';

export default class Cards extends Component {
  renderCard = cards => {
    const { cardRenderer } = this.props;
    return cards.map(item => {
      const { id } = item;
      return React.cloneElement(cardRenderer(item), {
        key: id,
      });
    });
  };

  render() {
    const { cards } = this.props;
    return <div>{this.renderCard(cards)}</div>;
  }
}
