import React from 'react';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// import logo from './logo.svg';
import './App.css';

 //Pages 
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import adddevice from './pages/adddevice'
import devicedetails from './pages/devicedetails'
const theme = createMuiTheme({

  typography: {
    useNextVariants: true,
  }
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
      <Router>
      {/* <Navbar /> */}
        <div className="container">
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/login" component={login} />
          <Route exact path="/signup" component={signup} />
          <Route exact path="/adddevice" component={adddevice}/>
          <Route exact path="/devicedetail" component={devicedetails}/>
        </Switch>
        </div>
      </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
