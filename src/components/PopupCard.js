import React from 'react';
import './styles.css';
import EditableH3 from './widgets/EditableH3';
import { getData } from '../storage';
import Comments from './Comments';

class PopupCard extends React.Component {
  constructor(props) {
    super(props);

    const { data } = props;

    const { title, text } = props.data;

    this.state = {
      isClickedHeader: false, // click on title
      title,
      data,

      username: getData('username'),
      text,
    };

    this.textCardRef = React.createRef();
    this.commentCardRef = React.createRef();
  }

  handleTitleSubmit = title => {
    this.props.onCardSubmitTitle(title);
  };

  // Change description for card
  handleDescription = () => {
    this.setState({ text: this.textCardRef.current.value });
  };

  handleSubmitDescription = e => {
    const { onSubmitDescription } = this.props;
    onSubmitDescription(e.target.value);
  };

  // Add new comment
  handleTextareaComment = () => {
    this.setState({ comment: this.commentCardRef.current.value });
  };

  handleButtonAddComment = e => {
    if (this.commentCardRef.current.value.trim() === '') return;
    const { comment } = this.state;
    this.props.onCardAddComment(comment);
    this.setState({ isClickedAdd: false, comment: '' });
  };

  render() {
    const { text, title } = this.state;
    const { onClose, data } = this.props;
    // console.log(data);
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
          <EditableH3 title={title} onChange={this.handleTitleSubmit} />
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
          {data.comments.length === 0 ? (
            ' Нет'
          ) : (
            <Comments
              data={data.comments}
              onEdit={(text, id) => this.props.onCardEditComment(text, id)}
              onDelete={id => this.props.onCardDeleteComment(id)}
            />
          )}
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
