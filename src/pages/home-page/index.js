import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TicketsList from '../../components/TicketsList';
import cards from '../../data';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-5">One more...Trello</h1>
          <p className="lead">Hello, userNAME</p>
        </div>
        <div className="row">
          <TicketsList cards={cards} />
          <div className="col-sm">
            <h1 className="display-10">In Progress</h1>
            ....
          </div>
          <div className="col-sm">
            <h1 className="display-10">Testing</h1>
            ....
          </div>
          <div className="col-sm">
            <h1 className="display-10">Done</h1>
            ....
          </div>
        </div>
      </div>
    );
  }
}

export default App;
