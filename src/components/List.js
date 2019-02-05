import React from 'react';
import Card from './Card';
import Cards from './Cards';
import { getData } from '../storage';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.titleInputRef = React.createRef();
    this.addInputRef = React.createRef();

    const {
      list: { title },
    } = props;
    this.state = { isClickedHeader: false, title, newCard: '', isClickedAdd: false };

    // console.log(this.props);
  }

  // Add new card
  handleFooterAddSubmit = event => {
    event.preventDefault();
    this.setState({ isClickedAdd: true , newCard: });
  };

  renderCards = () => {
    const { itemRenderer, list } = this.props;
    const { cards } = list;
    return cards.map(card => {
      return React.cloneElement(itemRenderer(card), {
        key: card.id,
      });
    });
  };

  /*
  // Удаление карточки
  removeCard = idRemove => {
    // console.log('removeCard this.state.list, idRemove', this.state.list, idRemove);
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
*/
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
    this.setState({ isClickedHeader: true });
  };

  /*
  onChangeCard = item => {
    // console.log('TicketList.onChangeCard', item, this.props.list);
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
*/

  headTextFunc = title => {
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

    return headText;
  };

  render() {
    const { title: stateTitle } = this.state;
    const {
      onAddNewCard,
      list: { id, title },
    } = this.props;

    const footerAdd = this.state.isClickedAdd ? (
      <div>
        <form
          onSubmit={() => {
            onAddNewCard(id, stateTitle);
          }}
        >
          <div className="input-group">
            <input ref={this.addInputRef} className="form-control" type="text" onBlur={this.handleFooterAddSubmit} />
          </div>
        </form>
        <button
          onClick={() => {
            onAddNewCard(id, stateTitle);
          }}
          className="btn btn-success mt-1 w-100"
        >
          Добавить карточку
        </button>
      </div>
    ) : (
      <button onClick={this.handleFooterAddSubmit} className="btn btn-light mt-1 w-100">
        + Добавить еще одну карточку
      </button>
    );

    return (
      <div className="col-sm bg-light m-3">
        {this.headTextFunc(title)}
        {this.renderCards()}
        {footerAdd}
      </div>
    );
  }
}

export default List;
