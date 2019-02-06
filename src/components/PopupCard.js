import React from 'react';
import './styles.css';
import EditableH3 from './widgets/EditableH3';
import { getData } from '../storage';
import Comments from './Comments';

class PopupCard extends React.Component {
  constructor(props) {
    super(props);

    const { title, text } = props.data;

    /*
    title - name
    text - description
    comment - add comment
    */
    console.log('PopupCard', props);
    this.state = {
      title,
      text,
      comment: '',
    };
  }

  handleTitleSubmit = title => {
    this.props.onCardSubmitTitle(title);
  };

  // Change description for card
  handleDescription = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmitDescription = e => {
    const { onSubmitDescription } = this.props;
    const { text } = this.state;
    onSubmitDescription(text);
  };

  // Add new comment
  handleTextareaComment = e => {
    this.setState({ comment: e.target.value });
  };

  handleButtonAddComment = () => {
    const { comment } = this.state;
    if (comment.trim() === '') return;
    this.props.onCardAddComment(comment);
    this.setState({ isClickedAdd: false, comment: '' });
  };

  render() {
    const { text, title, comment } = this.state;

    const { onClose, data, id } = this.props;

    const { firstName, surname, avatar } = data.user;
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
            Создал:{' '}
            <b>
              <img src={avatar} height="25" />
              {firstName} {surname}
            </b>
          </div>
          <label className="pt-3">Описание:</label>
          <textarea
            rows="3"
            className="form-control"
            value={text}
            onBlur={this.handleSubmitDescription}
            onChange={this.handleDescription}
          />
          <label className="pt-3">Добавление комментария:</label>
          <textarea
            rows="3"
            className="form-control"
            value={comment}
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
            onClick={() => this.props.onCardRemoveCard(id)}
          >
            Удалить карточку
          </button>
        </div>
      </div>
    );
  }
}

export default PopupCard;
