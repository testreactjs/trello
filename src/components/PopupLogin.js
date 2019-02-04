import React from 'react';
import './styles.css';

class PopupLogin extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.closePopup(this.refs._input.value);
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <form className="text-center border border-light p-5" onSubmit={this.handleSubmit}>
            <p className="h4 mb-4">{this.props.text}</p>
            <input ref="_input" type="text" className="form-control mb-4" required />
            <button className="btn btn-info btn-block" type="submit" onSubmit={this.handleSubmit}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default PopupLogin;
