import React from 'react';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClickedHeader: false };
    this.commentRef = React.createRef();
  }

  handleChange = () => {
    this.setState({ isClickedHeader: true }, () => {
      this.commentRef.current.focus();
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const text = this.commentRef.current.value;

    if (text !== '') {
      this.setState({ isClickedHeader: false }, this.props.onChange(text, this.commentRef.current.id));
    }
  };

  render() {
    const { isClickedHeader } = this.state;
    const {
      text,
      id,
      user: { avatar, firstName, surname },
    } = this.props.comment;
    const headComment = (
      <section>
        <span className="h3">
          <img src={avatar} width="20" />
          {firstName} {surname} :
        </span>
        <button className="float-right btn btn-info" onClick={() => this.props.onDelete(id)}>
          Delete
        </button>
        <button id={id} className="float-right btn btn-info mr-1" onClick={() => this.handleChange()}>
          Edit
        </button>
      </section>
    );
    return isClickedHeader ? (
      <div key={id} className="mt-3">
        {headComment}
        <div>
          <textarea
            id={id}
            ref={this.commentRef}
            key={id}
            className="form-control mt-2"
            defaultValue={text}
            onBlur={this.handleSaveEditedComment}
          />
          <button className="form-control btn btn-secondary" onClick={() => this.handleSubmit(event)}>
            Save
          </button>
        </div>
      </div>
    ) : (
      <div key={id} className="mt-3">
        {headComment}
        <div key={id} className="form-control mt-2">
          {text}
        </div>
      </div>
    );
  }
}
export default Comment;
