import React from 'react'
import Ticket from './Ticket'

class TicketsList extends React.Component {
  state = { isClickedHeader: false, onHeaderText: "TODO", isClickedAdd: false }

  onFooterAddChange = (event) => {
    this.setState();
  }
  onFooterAddSubmit = (event) => {
    this.setState({ isClickedAdd: false })
    event.preventDefault();
  }

  onHeaderChange = (event) => {
    this.setState({ onHeaderText: event.target.value });
  }
  onHeaderSubmit = (event) => {
    this.setState({ isClickedHeader: false })
    event.preventDefault();
  }
  onHeaderClick = () => {
    this.setState({ isClickedHeader: true })
  }

  onAddButtonClick = () => {
    this.setState({ isClickedAdd: true });
  }





  render() {
    const headText = this.state.isClickedHeader ?
      <form onSubmit={this.onHeaderSubmit}>
        <input className="form-control" type="text" onChange={this.onHeaderChange} onBlur={this.onHeaderSubmit} />
      </form> :
      <h1 className="display-10" onClick={this.onHeaderClick}>{this.state.onHeaderText}</h1>

    const footerAdd = this.state.isClickedAdd ?
      <form onSubmit={this.onFooterAddSubmit}>
        <div class="input-group mb-3">
          <input className="form-control" type="text" onChange={this.onFooterAddChange} onBlur={this.onFooterAddSubmit} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Add</button>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Del</button>
          </div>
        </div>
      </form> :
      ""


    return (
      <div className="col-sm bg-light">
        {headText}
        <Ticket />
        {footerAdd}
        <div><button onClick={this.onAddButtonClick} className="btn btn-secondary mt-1">Add</button></div>
      </div>

    )
  }

}

export default TicketsList;