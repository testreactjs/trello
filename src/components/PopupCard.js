import React from 'react';
import './styles.css';

import { getData } from '../storage';

class PopupCard extends React.Component {
  constructor(props) {
    super(props);

    const { item, idList } = props;

    const { title, text } = props.item;

    this.state = {
      isClickedHeader: false, // click on title
      title,
      data: item,
      comment: '',
      editComment: 0,
      textChangeComment: '',
      username: getData('username'),
      text,
      idList,
    };

    this.titleCardRef = React.createRef();
    this.textCardRef = React.createRef();
    this.commentCardRef = React.createRef();
    this.changeElement = React.createRef();
    console.log('PopupCard', this.props);
  }

  handleHeaderClick = () => {
    // console.log('handleHeaderClick');
  };

  handleTitleChange = () => {
    this.setState({ title: this.titleCardRef.current.value });
    // console.log('handleHeaderClick');
  };

  handleTitleSubmit = e => {
    e.preventDefault();
    const { onCardSubmitTitle } = this.props;
    this.setState({ isClickedHeader: false });
    this.props.onCardSubmitTitle(this.titleCardRef.current.value);
  };

  // Change description for card
  handleDescription = () => {
    this.setState({ text: this.textCardRef.current.value });
  };

  // Add new comment
  handleTextareaComment = () => {
    // console.log("handleComment")
    this.setState({ comment: this.commentCardRef.current.value });
  };

  handleButtonAddComment = e => {
    if (this.commentCardRef.current.value.trim() === '') return;
    const { comment } = this.state;
    this.props.onCardAddComment(comment);
    this.setState({ isClickedAdd: false, comment: '' });
  };

  handleClickChangeComment = event => {
    // console.log('handleClickChangeComment');
    const { comments } = this.state.data;
    const tempComments = comments.filter(item => {
      return item.id != event.currentTarget.id;
    });
    // console.log('tempComments', tempComments);
    if (comments.length !== 0) {
      this.setState({ textChangeComment: comments[0].text });
    }
    this.setState({ editComment: event.currentTarget.id });
    // console.log('tempComments', comments[0].text, event.currentTarget.id );
  };

  handleChangeClickComment = () => {
    this.setState({ textChangeComment: this.changeElement.current.value });
  };

  handleChangeComment = event => {
    // event.currentTarget.id
    event.preventDefault();
    this.setState({ textChangeComment: this.changeElement.current.value });
  };

  handleSaveEditedComment = event => {
    const { editComment } = this.state;
    if (editComment !== 0) {
      // / lkdjlkdjflk ajdlkf lkafdj. j.f j.adksfj l.ajfl ajlfdk jaslfj laksjf lajsflk jsfk jsjf
      this.props.onCardEditComment(this.changeElement.current.value);
      /*
      const list = Object.assign({}, this.state.data);
      const comments = this.state.data.comments.map(item => {
        if (item.id == event.currentTarget.id) {
          item.text = this.changeElement.current.value;
        }
        return item;
      });
      list.comments = comments;
      */
      // list = list.comments.comments.text = this.changeElement.current.value;
      // console.log(comments);
      this.setState({ editComment: 0 });
    }
  };

  handleSubmitDescription = e => {
    const { onSubmitDescription } = this.props;
    onSubmitDescription(e.target.value);
  };

  // Show comment after map comments
  showComment = (value, i) => {
    const { data, onCardDeleteComment, onCardEditComment } = this.props;
    const { editComment } = this.state;
    const comment =
      editComment !== 0 && editComment === value.id ? (
        <div>
          <textarea
            key={i}
            ref={this.changeElement}
            id={value.id}
            className="form-control mt-2"
            value={this.state.textChangeComment}
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
        <span className="h3">{value.user}:</span>
        <button
          className="float-right btn btn-info"
          onClick={() => this.props.onCardDeleteComment(value.id)}
          id={value.id}
        >
          Delete
        </button>
        <button id={value.id} className="float-right btn btn-info mr-1" onClick={this.handleClickChangeComment}>
          Edit
        </button>
        {comment}
      </div>
    );
  };

  showTitle = () => {
    const { title } = this.state;
    return this.state.isClickedHeader ? (
      <form onSubmit={this.handleTitleSubmit}>
        <input
          ref={this.titleCardRef}
          value={title}
          type="text"
          onBlur={this.handleTitleSubmit}
          required
          className="form-control"
          onChange={this.handleTitleChange}
        />
      </form>
    ) : (
      <h3 className="display-10" onClick={() => this.setState({ isClickedHeader: true })}>
        {title}
      </h3>
    );
  };

  render() {
    const { title, text } = this.state;
    const { onClose, onSubmitDescription, onCardAddComment, onCardRemoveCard } = this.props;
    const data = this.props.item;

    const styleButtonAddComment =
      this.state.comment === '' ? 'form-control btn btn-light mt-1 w-10' : 'form-control btn btn-success mt-1';

    return (
      <div className="popup">
        <div className="popup_inner2 form-group">
          <button
            className="btn btn-info float-right "
            onClick={e => {
              onClose();
            }}
          >
            Close
          </button>
          {this.showTitle()}
          <div>
            Создал: <b>{data.user}</b>
          </div>
          <label className="pt-3">Описание:</label>
          <textarea
            ref={this.textCardRef}
            rows="3"
            className="form-control"
            value={text}
            onBlur={this.handleSubmitDescription}
            onChange={this.handleDescription}
          />
          <label className="pt-3">Добавление комментария:</label>
          <textarea
            ref={this.commentCardRef}
            rows="3"
            className="form-control"
            value={this.state.comment}
            onBlur={this.handleTextareaComment}
            onChange={this.handleTextareaComment}
          />
          <button className={styleButtonAddComment} onClick={this.handleButtonAddComment}>
            Добавить комментарий
          </button>
          <label className="pt-3">Комментарии:</label>
          {data.comments.length != 0 ? data.comments.map(this.showComment) : ' Нет'}
          <button
            type="button"
            className="btn btn-secondary form-control mt-4"
            onClick={() => this.props.onCardRemoveCard()}
          >
            Удалить карточку
          </button>
        </div>
      </div>
    );
  }
}

export default PopupCard;
