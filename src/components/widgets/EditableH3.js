import React, { Component } from 'react';

class EditableH3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClickedHeader: false };
    this.titleInputRef = React.createRef();
  }

  handleHeaderClick = () => {
    this.setState({ isClickedHeader: true }, () => {
      this.titleInputRef.current.focus();
    });
  };

  handleHeaderSubmit = event => {
    event.preventDefault();
    const title = this.titleInputRef.current.value;
    // console.log(title);
    this.setState({ title: this.titleInputRef.current.value, isClickedHeader: false }, this.props.onChange(title));
  };

  render() {
    const { isClickedHeader } = this.state;
    const { title } = this.props;
    return isClickedHeader ? (
      <form onSubmit={this.handleHeaderSubmit}>
        <input
          ref={this.titleInputRef}
          className="form-control"
          type="text"
          defaultValue={title}
          onBlur={this.handleHeaderSubmit}
          required
        />
      </form>
    ) : (
      <h1 className="display-5" onClick={this.handleHeaderClick}>
        {title}
      </h1>
    );
  }
}
export default EditableH3;
