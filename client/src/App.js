import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/chatbox/:name" component={ChatRoom} />
        </Switch>
    </Router>
  );
}

export default App;
