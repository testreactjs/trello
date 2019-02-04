import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { TicketsList, Lists, PopupLogin } from '../../components';
import lists from '../../data.js';
import { getData, saveData } from '../../storage';
import { combinator } from 'postcss-selector-parser';

class App extends React.Component {
    constructor(props) {
      super(props);
      const user = getData("username")
      this.state  = {
        data: lists,
        user: user?user:'',
      }
  }




  //Write on local storage
  componentDidMount() {
    saveData(this.state.data, "data");
    //saveData(this.state.user, "username");
  }

  //Logout
  handleLogout = () =>
  {
    this.setState({user:''})
  }


  //Change Title
  handleListTitleChange = (listId, title) => {
    //console.log('handleListTitleChange ', listId, title);
    const { data } = this.state;
    const newData = data.map(dataItem => {
      if (dataItem.id === listId) {
        return {
          ...dataItem,
          title,
        };
      }
      return dataItem;
    });
    this.setState({
      data: newData,
    });

    //console.log("newData", newData);
  };

  //Update data
  changeData = (id, list) => {
    //console.log('Change data!! NEW ', id, list);
    const { data } = this.state;
    //console.log(data);
    const newData = data.map(dataItem => {
      if (dataItem.id === id) {
        return {
          ...list
        };
      }
      return dataItem;
    });
    this.setState({
      data: newData,
    });
    //console.log(data);
  };

  //Login
  togglePopup = value => {
    //console.log("togglePopup". value);
    this.setState({ user: value});
    saveData(value, "username");
  };

  render() {
    return this.state.user === '' ? (
      <PopupLogin text="Введите свое имя:" closePopup={this.togglePopup} />
    ) : (
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-5">One more...Trello</h1>
          <button className="btn float-right" onClick={this.handleLogout}>Logout</button>
          <p className="lead">
            Hello, <b>{this.state.user}</b>
          </p>
        </div>
        <Lists
          lists={lists}
          itemRenderer={list => (
            <TicketsList list={list} onTitleChange={this.handleListTitleChange} changeData={this.changeData} />
          )}
        />
        <pre>{JSON.stringify(this.state.data, 2, 2)}</pre>
      </div>

    );
  }
}

export default App;
