import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import ChatRoom from './pages/ChatRoom/ChatRoom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/chatroom/:id" component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default App;
