import React from 'react';
import Ticket from './Ticket';

class TicketsList extends React.Component {
  constructor(props) {
    super(props);
    this.titleInputRef = React.createRef();
    const {
      list: { title },
    } = props;
    this.state = { isClickedHeader: false, title, isClickedAdd: false };
  }

  handlerFooterAddChange = event => {
    this.setState();
  };

  handlerFooterAddSubmit = event => {
    this.setState({ isClickedAdd: false });
  };

  handlerHeaderChange = event => {
    // console.log('handlerHeaderChange!');
    event.preventDefault();
    this.setState({ title: this.titleInputRef.current.value });

    // this.setState({ title: event.target.value });
  };

  handlerHeaderSubmit = event => {
    event.preventDefault();
    this.setState({ title: this.titleInputRef.current.value, isClickedHeader: false });
    // this.setState({ title: event.target.value });
    // console.log('handlerHeaderSubmit');
    // this.setState({ title: this.titleInputRef._getText() });
    // this.setState({ isClickedHeader: false });
  };

  handlerHeaderClick = () => {
    this.setState({ isClickedHeader: true }, () => {
      this.titleInputRef.current.focus();
    });
  };

  changeData = () => {
    const {
      onTitleChange,
      list: { id },
    } = this.props;
    onTitleChange(id, this.state.title);
    console.log(this.props);
    console.log(onTitleChange);
  };

  handlerAddButtonClick = () => {
    // console.log(this.state.title);
  };

  render() {
    const { title } = this.state;
    const headText = this.state.isClickedHeader ? (
      <form onSubmit={this.handlerHeaderSubmit}>
        <input
          ref={this.titleInputRef}
          className="form-control"
          type="text"
          value={title}
          onChange={this.handlerHeaderChange}
          onBlur={this.handlerHeaderSubmit}
        />
      </form>
    ) : (
      <h1 className="display-10" onClick={this.handlerHeaderClick}>
        {title}
      </h1>
    );

    const footerAdd = this.state.isClickedAdd ? (
      <form onSubmit={this.handlerFooterAddSubmit}>
        <div className="input-group mb-3">
          <input className="form-control" type="text" onBlur={this.handlerFooterAddSubmit} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">
              Add
            </button>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">
              Del
            </button>
          </div>
        </div>
      </form>
    ) : (
      ''
    );

    return (
      <div className="col-sm bg-light">
        {headText}
        <Ticket lists={this.props.list} onChange={this.changeData} />
        {footerAdd}
        <div>
          <button onClick={this.changeData} className="btn btn-secondary mt-1">
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default TicketsList;
