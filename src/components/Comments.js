import React from 'react';
import Comment from './Comment';

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
        <Comment comment={this.props.comment} onChange={}/>
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
