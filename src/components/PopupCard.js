import React from 'react';
import './styles.css';

class PopupCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClickedHeader: true };
  }

  handlerHeaderClick = e => {
    console.log('handlerHeaderClick');
  };

  handlerHeaderChange = e => {
    console.log('handlerHeaderClick');
  };

  handlerHeaderSubmit = e => {
    console.log('handlerHeaderSubmit');
  };

  render() {
    const headText = this.state.isClickedHeader ? (
      <form onSubmit={this.handlerHeaderSubmit}>
        <input
        /*
          ref={this.titleInputRef}
          className="form-control"
          type="text"
          value={title}
          onChange={this.handlerHeaderChange}
          onBlur={this.handlerHeaderSubmit}
          required
        */
        />
      </form>
    ) : (
      <h1 className="display-10" onClick={this.handlerHeaderClick}>
        title
      </h1>
    );
    return (
      <div className="popup">
        <div className="popup_inner">
          <button className="btn btn-secondary float-right" onClick={() => this.props.closePopup(true)}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default PopupCard;
