import React from 'react';
import './styles.css';

class PopupCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClickedHeader: false, title: 'title' };
  }

  handlerHeaderClick = e => {
    console.log('handlerHeaderClick');
  };

  handlerHeaderChange = e => {
    console.log('handlerHeaderClick');
  };

  handlerHeaderSubmit = e => {
    this.setState({ title: this.refs._title.value, isClickedHeader: false });
    e.preventDefault();
  };

  render() {
    const titleText = this.state.isClickedHeader ? (
      <form onSubmit={this.handlerHeaderSubmit}>
        <input
          ref="_title"
          className="form-control"
          type="text"
          onBlur={this.handlerHeaderSubmit}
          required
          /*
          ref={this.titleInputRef}
          className="form-control"
          type="text"
          value={title}
          onChange={this.handlerHeaderChange}


        */
        />
      </form>
    ) : (
      <h1 className="display-10" onClick={() => this.setState({ isClickedHeader: true })}>
        {this.state.title}
      </h1>
    );
    return (
      <div className="popup">
        <div className="popup_inner">
          <button className="btn btn-secondary float-right" onClick={() => this.props.closePopup(true)}>
            Close
          </button>
          {titleText}
        </div>
      </div>
    );
  }
}

export default PopupCard;
