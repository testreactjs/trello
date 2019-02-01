import React from 'react';
import './styles.css';

class PopupLogin extends React.Component {
  state = {
    input: 'Ivan',
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <form
            className="text-center border border-light p-5"
            onSubmit={() => this.props.closePopup(this.refs._input.value)}
          >
            <p className="h4 mb-4">{this.props.text}</p>

            <input ref="_input" type="text" className="form-control mb-4" required />
            <button
              className="btn btn-info btn-block"
              type="submit"
              onSubmit={() => this.props.closePopup(this.refs._input.value)}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default PopupLogin;
