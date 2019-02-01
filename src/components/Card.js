import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleLineClicked = () => {
    console.log('clicked line');
  };

  render() {
    // const { card, onChange } = this.props;
    const { title } = this.props.card;
    return (
      <div className="alert alert-primary" onClick={this.handleLineClicked}>
        {title}
      </div>
      /*
      <li className="list-group-item mt-2" key={card.id}>
        {card.title}
      </li>
      */
    );
  }
}

export default Card;
