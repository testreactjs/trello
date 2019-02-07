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

  handleSaveEditedComment = event => {
    const text = this.commentRef.current.value;
    if (text !== '') {
      this.setState({ id: '' });
      this.props.onEdit(text, this.commentRef.current.id);
    }
  };

  // Show comment after map comments
  showComment = (value, i) => {
    const { id } = this.state;
    const {
      user: { avatar, firstName, surname },
    } = value;
    // console.log('id this.state.id', typeof id, typeof this.state.id);
    const comment =
      id == value.id ? (
        <div>
          <textarea
            ref={this.commentRef}
            key={value.id}
            id={value.id}
            className="form-control mt-2"
            defaultValue={value.text}
            onBlur={this.handleSaveEditedComment}
          />
          <button className="form-control btn btn-secondary" onClick={this.handleSaveEditedComment} id={value.id}>
            Save
          </button>
        </div>
      ) : (
        <div key={value.id} className="form-control mt-2">
          {value.text}
        </div>
      );

    return (
      <div key={value.id} id={value.id} className="mt-3">
        <span className="h3">
          <img src={avatar} width="20" />
          {firstName} {surname} :
        </span>
        <button className="float-right btn btn-info" onClick={() => this.props.onDelete(value.id)} id={value.id}>
          Delete
        </button>
        <button id={value.id} className="float-right btn btn-info mr-1" onClick={this.handleClickChangeComment}>
          Edit
        </button>
        {comment}
      </div>
    );
  };

  render() {
    const { data } = this.props;
    // console.log('render comments');
    return data.map(this.showComment);
  }
}

export default Comments;
