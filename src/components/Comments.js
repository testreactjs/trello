import React from 'react';
import Comment from './Comment';

class Comments extends React.Component {
  showComment = (comment, i) => {
    return <Comment key={i} comment={comment} onChange={this.props.onEdit} onDelete={this.props.onDelete} />;
  };

  render() {
    const { comments } = this.props;
    // console.log('render comments');
    return comments.map(this.showComment);
  }
}

export default Comments;
