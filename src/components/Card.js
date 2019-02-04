import React from 'react';
import PopupCard from './PopupCard';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isClicked: false };
    //console.log(this.props)
  }

  handleLineClicked = e => {
    this.setState({ isClicked: true });
    //console.log('clicked line!');
    //console.log("this.props", this.props );
  };

  handleClose = () => {
    this.setState({ isClicked: false });
    //console.log('clickhandleClose!');
  };

  changeCard = (item) => this.props.changeCard(item)



  render() {
    // const { card, onChange } = this.props;
    const { title } = this.props.card;
    //console.log(this.props.card)
    const {comments} = this.props.card;

    return (
      <section>
        {this.state.isClicked ? <PopupCard item={this.props.card} closePopup={this.handleClose} changeCard={this.changeCard} /> : ''}
        <div className="alert alert-primary" onClick={this.handleLineClicked}>
          {title} <div className="float-right">{comments?comments.length:0} {String.fromCodePoint(0x1F4AC)} </div>

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
