import React from 'react';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClickedHeader: false };
    this.commentRef = React.createRef();
  }

  handleHeaderClick = () => {
    this.setState({ isClickedHeader: true }, () => {
      this.commentRef.current.focus();
    });
  };

  handleHeaderSubmit = event => {
    event.preventDefault();
    const text = this.commentRef.current.value;
    // console.log(title);
    this.setState({ isClickedHeader: false }, this.props.onChange(text));
  };

  render() {
    const { isClickedHeader } = this.state;
    const { text, id } = this.props;
    return isClickedHeader ? (
      <div>
        <textarea
          ref={this.commentRef}
          key={id}
          className="form-control mt-2"
          defaultValue={text}
          onBlur={this.handleSaveEditedComment}
        />
        <button className="form-control btn btn-secondary" onClick={() => this.handleHeaderSubmit()}>
          Save
        </button>
      </div>
    ) : (
      <div key={id} className="form-control mt-2">
        {text}
      </div>
    );
  }
}
export default Comment;
