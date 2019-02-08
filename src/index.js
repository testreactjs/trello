import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HomePage } from './pages';
import * as serviceWorker from './serviceWorker';

// import reducers from './redux/reducers';
// import createStore from './redux/create-store';

// const store = createStore(reducers);

class App extends React.Component {
  render() {
    return <HomePage />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
