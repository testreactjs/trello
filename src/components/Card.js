import React from 'react';
import PopupCard from './PopupCard';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { isClicked: false };
  }

  handleLineClicked = e => {
    this.setState({ isClicked: true });
    console.log('clicked line!');
  };

  handleClose = () => {
    this.setState({ isClicked: false });
    console.log('clickhandleClose!');
  };

  render() {
    // const { card, onChange } = this.props;
    const { title } = this.props.card;

    return (
      <section>
        {this.state.isClicked ? <PopupCard item={this.props.card} closePopup={this.handleClose} /> : ''}
        <div className="alert alert-primary" onClick={this.handleLineClicked}>
          {title}
        </div>
      </section>
      /*
      <li className="list-group-item mt-2" key={card.id}>
        {card.title}
      </li>
      */
    );
  }
}

export default Card;
