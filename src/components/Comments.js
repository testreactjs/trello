import React from 'react';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      comment: '',
      text: '',
    };
  }

  handleClickChangeComment = event => {
    this.setState({ id: event.currentTarget.id });
    // console.log(event.currentTarget.id);
  };

  handleChangeClickComment = event => {
    this.setState({ text: event.target.value });
  };

  handleChangeComment = event => {
    this.setState({ text: event.target.value });
  };

  handleSaveEditedComment = event => {
    const { text } = this.state;
    if (text !== '') {
      this.setState({ id: '', text: '' });
      this.props.onEdit(text, event.currentTarget.id);
    }
  };

  // Show comment after map comments
  showComment = (value, i) => {
    const { id } = this.state;

    const {
      user: { avatar, firstName, surname },
    } = value;
    // console.log('id this.state.id', typeof id, typeof this.state.id);
    const text = this.state.text === '' ? value.text : this.state.text;
    const comment =
      id == value.id ? (
        <div>
          <textarea
            key={value.id}
            id={value.id}
            className="form-control mt-2"
            value={text}
            onClick={this.handleChangeClickComment}
            onChange={this.handleChangeComment}
            onBlur={this.handleSaveEditedComment}
          />
          <button className="form-control btn btn-secondary" onClick={this.handleSaveEditedComment} id={value.id}>
            Save
          </button>
        </div>
      ) : (
        <div key={i} className="form-control mt-2">
          {value.text}
        </div>
      );

    return (
      <div key={i} id={value.id} className="mt-3">
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
