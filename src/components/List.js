import React from 'react';

import EditableH3 from './widgets/EditableH3';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.titleInputRef = React.createRef();
    this.addInputRef = React.createRef();
    this.state = { isClickedHeader: false, isClickedAdd: false };
  }

  // Add new card
  handleFooterAddSubmit = event => {
    event.preventDefault();
    const { isClickedAdd } = this.state;
    const {
      onAddNewCard,
      list: { id },
    } = this.props;

    if (!isClickedAdd) {
      this.setState({ isClickedAdd: true });
    } else {
      this.setState({ isClickedAdd: false });
      const title = this.addInputRef.current.value;
      return onAddNewCard({ id, title });
    }
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

  // Change Title name
  handleTitleChange = title => {
    const {
      list: { id },
      onTitleChange,
    } = this.props;
    return onTitleChange({ id, title });
  };

  render() {
    const {
      list: { title },
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
