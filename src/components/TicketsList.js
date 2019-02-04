import React from 'react';
import Card from './Card';
import Cards from './Cards';
import {getData} from '../storage'


class TicketsList extends React.Component {
  constructor(props) {
    super(props);
    this.titleInputRef = React.createRef();
    this.addInputRef = React.createRef();
    const {
      list: { title},
    } = props;
    this.state = { isClickedHeader: false, title, isClickedAdd: false, list: props.list };
  }

  //Add new card
  handleFooterAddSubmit = event => {
    event.preventDefault();
    if (!this.state.isClickedAdd) {

      this.setState({ isClickedAdd: true }) ;
    } else {

      //Why let? ))
      let list = Object.assign({},this.state.data);
      const cards = [...this.state.list.cards];
      const lastId =  cards.length > 0 ? cards[(cards.length-1)].id : 1;
      list.cards.push({id: lastId+1, title: (this.addInputRef.current.value).trim()  === '' ? '_':this.addInputRef.current.value, text: '', user: getData("username"),  comments:[] });
      this.setState({ list: list, isClickedAdd: false}, function () { this.props.changeData();})
      //console.log("handleFooterAddSubmit list", this.state.list);

    }
  };

  //Change Title name
  handleHeaderChange = event => {
    // console.log('handleHeaderChange!');
    event.preventDefault();
    this.setState({ title: this.titleInputRef.current.value });
  };

  handleHeaderSubmit = event => {
    event.preventDefault();
    this.setState({ title: this.titleInputRef.current.value, isClickedHeader: false });
    //this.changeData();
    const id = this.props.list.id;
    this.props.onTitleChange(id, this.state.title)
  };

  handleHeaderClick = () => {
    this.setState({ isClickedHeader: true }, () => {
      this.titleInputRef.current.focus();
    });
  };



  onChangeCard = (item) => {
    //console.log("TicketList.onChangeCard", item, this.props.list)
    const cards = this.props.list.cards.map(value => {
      if (value.id === item.id) {
        return {
          ...item
        };
      }
      return value;
    })
    let newList = this.props.list;
    newList.cards = cards;
    this.setState({list: newList}, function () { this.props.changeData(this.props.list.id, this.state.list);})
    //newList = [];
    //this.props.changeData(this.props.list.id, this.state.list);

  }

  render() {
    const { title } = this.state;
    const headText = this.state.isClickedHeader ? (
      <form onSubmit={this.handleHeaderSubmit}>
        <input
          ref={this.titleInputRef}
          className="form-control"
          type="text"
          value={title}
          onChange={this.handleHeaderChange}
          onBlur={this.handleHeaderSubmit}
          required
        />
      </form>
    ) : (
      <h1 className="display-10" onClick={this.handleHeaderClick}>
        {title}
      </h1>
    );

    const footerAdd = this.state.isClickedAdd ? (
      <div>
      <form onSubmit={this.handleFooterAddSubmit}>
        <div className="input-group">
          <input ref={this.addInputRef} className="form-control" type="text" onBlur={this.handleFooterAddSubmit} />
        </div>
      </form>
      <button onClick={this.handleFooterAddSubmit} className="btn btn-success mt-1 w-100">
      Добавить карточку
    </button></div>
    ) : (
      <button onClick={this.handleFooterAddSubmit} className="btn btn-light mt-1 w-100">
      + Добавить еще одну карточку
    </button>
    );
    return (
      <div className="col-sm bg-light m-3">
        {headText}
        <Cards cards={this.props.list.cards} cardRenderer={card => <Card card={card} changeCard={this.onChangeCard}/>} />
        {footerAdd}
      </div>
    );
  }
}

export default TicketsList;
