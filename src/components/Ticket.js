import React from 'react';

class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { card, onChange } = this.props;
    return <li className="list-group-item mt-2">{card.title}</li>;
  }
}

export default Ticket;
