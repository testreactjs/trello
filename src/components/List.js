import React from 'react';
import { convertPatternsToTasks } from 'fast-glob/out/managers/tasks';
import Card from './Card';
import Cards from './Cards';
import EditableH3 from './widgets/EditableH3';
import { getData } from '../storage';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.titleInputRef = React.createRef();
    this.addInputRef = React.createRef();

    const {
      list: { title },
    } = props;

    this.state = { isClickedHeader: false, title, titleNewCard: '', isClickedAdd: false };
  }

  // Add new card
  handleFooterAddSubmit = event => {
    event.preventDefault();
    const { isClickedAdd } = this.state;
    const {
      onAddNewCard,
      list: { id, title },
    } = this.props;

    if (!isClickedAdd) {
      this.setState({ isClickedAdd: true });
    } else {
      this.setState({ isClickedAdd: false });
      return onAddNewCard(id, this.addInputRef.current.value);
    }
  };

  renderCards = () => {
    const { itemRenderer, list } = this.props;
    const { cards } = list;
    // console.log('this.props List', this.props);
    // console.log('Cards', this.props);
    return cards.map(card => {
      return React.cloneElement(itemRenderer(card), {
        key: card.id,
      });
    });
  };

  // Change Title name
  handleTitleChange = title => {
    const { id } = this.props.list;
    const { onAddNewCard } = this.props;
    // console.log('handleTitleChange', title, id);
    return this.props.onTitleChange(id, title);
  };

  render() {
    const {
      onAddNewCard,
      list: { id, title },
    } = this.props;

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

    return (
      <div className="col-sm bg-light m-3">
        <EditableH3 title={title} onChange={this.handleTitleChange} />
        {this.renderCards()}
        {footerAdd}
      </div>
    );
  }
}

export default List;
