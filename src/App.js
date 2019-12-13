import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './logo.png';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Welcome! 
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
            <Button variant="outlined"><Link to={'/customers'}> Customers </Link></Button>
            <Button variant="outlined"><Link to={'/trainings'}> Trainings </Link></Button>
          <Switch>
            <Route path="/customers" component={Customerlist} />
            <Route path='/trainings' component={Traininglist} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;


