import React, { Component } from 'react';

class EditableH3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: props.title, isClickedHeader: false };
    this.titleInputRef = React.createRef();
  }

  handleHeaderClick = () => {
    this.setState({ isClickedHeader: true }, () => {
      this.titleInputRef.current.focus();
    });
  };

  // Change Title name
  handleHeaderChange = event => {
    // console.log('handleHeaderChange!', this.titleInputRef.current.value);
    event.preventDefault();
    this.setState({ title: this.titleInputRef.current.value });
  };

  handleHeaderSubmit = event => {
    event.preventDefault();
    const { title } = this.state;
    this.setState({ title: this.titleInputRef.current.value, isClickedHeader: false }, this.props.onChange(title));
  };

  onTextChange = event => {
    this.setState({ text: event.target.value });
  };

  render() {
    const { title, isClickedHeader } = this.state;
    return isClickedHeader ? (
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
      <h1 className="display-5" onClick={this.handleHeaderClick}>
        {title}
      </h1>
    );
  }
}
export default EditableH3;
