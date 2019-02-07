import React from 'react';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
    this.commentRef = React.createRef();
  }

  handleClickChangeComment = event => {
    this.setState({ id: event.currentTarget.id });
    // console.log(event.currentTarget.id);
  };

  handleSaveEditedComment = () => {
    const text = this.commentRef.current.value;
    if (text !== '') {
      this.setState({ id: '' });
      this.props.onEdit(text, this.commentRef.current.id);
    }
  };

  // Show comment after map comments
  showComment = (comment, i) => {
    const { id } = this.state;
    const {
      user: { avatar, firstName, surname },
    } = comment;
    // console.log('id this.state.id', typeof id, typeof this.state.id);
    const elemComment =
      id == comment.id ? (
        <div>
          <textarea
            ref={this.commentRef}
            key={comment.id}
            id={comment.id}
            className="form-control mt-2"
            defaultValue={comment.text}
            onBlur={this.handleSaveEditedComment}
          />
          <button
            className="form-control btn btn-secondary"
            onClick={() => this.handleSaveEditedComment()}
            id={comment.id}
          >
            Save
          </button>
        </div>
      ) : (
        <div key={comment.id} className="form-control mt-2">
          {comment.text}
        </div>
      );

    return (
      <div key={comment.id} id={comment.id} className="mt-3">
        <span className="h3">
          <img src={avatar} width="20" />
          {firstName} {surname} :
        </span>
        <button className="float-right btn btn-info" onClick={() => this.props.onDelete(comment.id)} id={comment.id}>
          Delete
        </button>
        <button id={comment.id} className="float-right btn btn-info mr-1" onClick={this.handleClickChangeComment}>
          Edit
        </button>
        {elemComment}
      </div>
    );
  };

  render() {
    const { comments } = this.props;
    // console.log('render comments');
    return comments.map(this.showComment);
  }
}

export default Comments;
