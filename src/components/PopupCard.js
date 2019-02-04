import React from 'react';
import './styles.css';

import { getData } from '../storage';

class PopupCard extends React.Component {
  constructor(props) {
    super(props);

    const { item } = props;
    // doesnt work
    // {title, comments }
    const title = item.title;
    // Doesnt Work, Why?
    // const {title} = item
    // console.log('PopupCard constructor', item);

    this.state = {
      isClickedHeader: false,
      title,
      data: item,
      comment: '',
      editComment: 0,
      textChangeComment: '',
      username: getData('username'),
    };
    this.titleCardRef = React.createRef();
    this.textCardRef = React.createRef();
    this.commentCardRef = React.createRef();
    this.changeElement = React.createRef();
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
    const item = Object.assign({}, this.state.data);
    item.title = this.titleCardRef.current.value.trim() === '' ? '_' : this.titleCardRef.current.value;

    this.setState({ title: item.title, isClickedHeader: false, data: item }, () => {
      this.changeCard();
    });

    // console.log("this.state.data",this.state.data)
  };

  changeCard = () => {
    //console.log('Изменяем данные changeCard', this.state.data);
    this.props.changeCard(this.state.data);
  };

  // Change description for card
  handleDescription = () => {
    const item = Object.assign({}, this.state.data);
    item.text = this.textCardRef.current.value;
    // console.log(item, this.state.data)
    this.setState({ data: item }, () => {
      this.changeCard();
    });
  };

  // Add new comment
  handleTextareaComment = () => {
    // console.log("handleComment")
    this.setState({ comment: this.commentCardRef.current.value });
  };

  handleButtonAddComment = e => {
    if (this.commentCardRef.current.value.trim() === '') return;
    const list = Object.assign({}, this.state.data);
    // console.log(this.state.data)
    const comments = [...this.state.data.comments];
    const lastId = comments.length > 0 ? comments[comments.length - 1].id : 1;
    list.comments.push({
      id: lastId + 1,
      user: this.state.username,
      text: this.commentCardRef.current.value.trim() === '' ? '_' : this.commentCardRef.current.value,
    });
    this.setState({ isClickedAdd: false, data: list, comment: '' }, () => {
      this.changeCard();
    });
    // console.log(list)
    // item.text = this.textCardRef.current.value;
    // this.setState({data: item});
    // this.changeCard();
  };

  // Delete comment
  handleClickDeleteComment = event => {
    let list = Object.assign({}, this.state.data);
    // console.log(list, this.state.data, event.currentTarget.id);
    const comments = this.state.data.comments.filter(item => {
      return item.id != event.currentTarget.id;
    });
    list.comments = comments;
    // console.log(list, this.state.data);

    // Hack! Тоже не работает
    /*
    let nextState = Object.assign({}, this.state, { data: list});
    console.log(nextState);
    this.setState(nextState);
    */
    this.setState({ data: list }, () => {
      this.changeCard();
    });

    list = [];
    // console.log(list, this.state.data);
  };

  handleClickChangeComment = event => {
    const comments = this.state.data.comments.filter(item => {
      return item.id != event.currentTarget.id;
    });

    if (comments.length != 0) {
      this.setState({ textChangeComment: comments[0].text });
    }
    this.setState({ editComment: event.currentTarget.id });
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
    // Save edited comment
    if (this.state.editComment > 0) {
      // console.log(this.changeElement.current.value);
      // console.log(this.state.data.comments);
      const list = Object.assign({}, this.state.data);
      const comments = this.state.data.comments.map(item => {
        if (item.id == event.currentTarget.id) {
          item.text = this.changeElement.current.value;
        }
        return item;
      });
      list.comments = comments;
      // list = list.comments.comments.text = this.changeElement.current.value;
      // console.log(comments);
      this.setState({ data: list, editComment: 0 }, () => {
        this.changeCard();
      });
    }
  };

  handleRemoveCard = () => {
    // console.log(this.state.data);
    const id = this.state.data.id;
    this.props.closePopup(true);
    this.props.removeCard(id);
  };

  // Show comment after map comments
  showComment = (value, i) => {
    const comment =
      this.state.editComment > 0 && this.state.editComment == value.id ? (
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
        <button className="float-right btn btn-info" onClick={this.handleClickDeleteComment} id={value.id}>
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
    const { title } = this.state;
    // const {comments} = this.state.data;

    const titleText = this.state.isClickedHeader ? (
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
        {this.state.title}
      </h3>
    );

    const styleButtonAddComment =
      this.state.comment === '' ? 'form-control btn btn-light mt-1 w-10' : 'form-control btn btn-success mt-1';
    const { data } = this.state;
    //console.log('Popup card render ', this.state.data);
    return (
      <div className="popup">
        <div className="popup_inner2 form-group">
          <button className="btn btn-info float-right " onClick={() => this.props.closePopup(true)}>
            Close
          </button>
          {titleText}
          <div>
            Создал: <b>{this.state.data.user}</b>
          </div>

          <label className="pt-3">Описание:</label>
          <textarea
            ref={this.textCardRef}
            rows="3"
            className="form-control"
            value={this.state.data.text}
            onBlur={this.handleDescription}
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
          <button type="button" className="btn btn-secondary form-control mt-4" onClick={this.handleRemoveCard}>
            Удалить карточку
          </button>
        </div>
      </div>
    );
  }
}

export default PopupCard;
