import React from 'react';
import Card from './Card';
import Cards from './Cards';
import { getData } from '../storage';

class TicketsList extends React.Component {
  constructor(props) {
    super(props);
    this.titleInputRef = React.createRef();
    this.addInputRef = React.createRef();

    const {
      list: { title },
    } = props;
    this.state = { isClickedHeader: false, title, isClickedAdd: false, list: props.list };
  }

  // Add new card
  handleFooterAddSubmit = event => {
    event.preventDefault();
    if (!this.state.isClickedAdd) {
      this.setState({ isClickedAdd: true });
    } else {
      // Why let? ))
      const list = Object.assign({}, this.state.list);
      const cards = [...this.state.list.cards];
      const lastId = cards.length > 0 ? cards[cards.length - 1].id : 1;

      list.cards.push({
        id: lastId + 1,
        title: this.addInputRef.current.value.trim() === '' ? '_' : this.addInputRef.current.value,
        text: '',
        user: getData('username'),
        comments: [],
      });
      console.log('handleFooterAddSubmit new list', list);
      this.setState({ list, isClickedAdd: false }, () => {
        // this.onChangeCard(list)
        this.props.changeData(this.props.list.id, this.state.list);
      });
    }
  };

  // Удаление карточки
  removeCard = idRemove => {
    console.log('removeCard this.state.list, idRemove', this.state.list, idRemove);
    const list = this.state.list;
    const cards = this.state.list.cards.filter(value => {
      if (value.id != idRemove) {
        return value;
      }
    });
    list.cards = cards;

    console.log('removeCard list', list);
    this.setState({ list }, () => {
      this.props.changeData(this.props.list.id, this.state.list);
    });
  };

  // Change Title name
  handleHeaderChange = event => {
    // console.log('handleHeaderChange!');
    event.preventDefault();
    this.setState({ title: this.titleInputRef.current.value });
  };

  handleHeaderSubmit = event => {
    event.preventDefault();
    this.setState({ title: this.titleInputRef.current.value, isClickedHeader: false });
    // this.changeData();
    const { id } = this.props.list;
    this.props.onTitleChange(id, this.state.title);
  };

  handleHeaderClick = () => {
    this.setState({ isClickedHeader: true }, () => {
      this.titleInputRef.current.focus();
    });
  };

  onChangeCard = item => {
    console.log('TicketList.onChangeCard', item, this.props.list);
    const cards = this.props.list.cards.map(value => {
      if (value.id === item.id) {
        return {
          ...item,
        };
      }
      return value;
    });
    const newList = this.props.list;
    newList.cards = cards;
    this.setState({ list: newList }, () => {
      this.props.changeData(this.props.list.id, this.state.list);
    });
    // newList = [];
    // this.props.changeData(this.props.list.id, this.state.list);
  };

  render() {
    const { title } = this.state;
    const headText = this.state.isClickedHeader ? (
      <form onSubmit={this.handleHeaderSubmit}>
        <input
          ref={this.titleInputRef}
          className="form-control"
          type="text"
          value={title}
          onChange={this.handleHeaderChange}
          onBlur={this.handleHeaderSubmit}
          required
        />
      </form>
    ) : (
      <h1 className="display-10" onClick={this.handleHeaderClick}>
        {title}
      </h1>
    );

    const footerAdd = this.state.isClickedAdd ? (
      <div>
        <form onSubmit={this.handleFooterAddSubmit}>
          <div className="input-group">
            <input ref={this.addInputRef} className="form-control" type="text" onBlur={this.handleFooterAddSubmit} />
          </div>
        </form>
        <button onClick={this.handleFooterAddSubmit} className="btn btn-success mt-1 w-100">
          Добавить карточку
        </button>
      </div>
    ) : (
      <button onClick={this.handleFooterAddSubmit} className="btn btn-light mt-1 w-100">
        + Добавить еще одну карточку
      </button>
    );
    // console.log('TicketList Render', this.state.list);
    return (
      <div className="col-sm bg-light m-3">
        {headText}
        <Cards
          cards={this.state.list.cards}
          cardRenderer={card => <Card card={card} changeCard={this.onChangeCard} removeCard={this.removeCard} />}
        />

        {footerAdd}
      </div>
    );
  }
}

export default TicketsList;
