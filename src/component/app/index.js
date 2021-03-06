import './_app.scss';
import React from 'react';
import Navbar from '../navbar';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import {tokenSet} from '../../action/auth-actions';
import LandingContainer from '../landing-container';
import DashboardContainer from '../dashboard-container';
import DirectionsContainer from '../directions-container';
import HomePage from '../homepage';
import AboutContainer from '../about-container';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import SettingsContainer from '../settings-container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

const getTheme = () => {
  let overwrites = {
    'palette': {
      'accent1Color': '#ef9a9a',
    },
    'drawer': {
      'color': '#bdbdbd',
    },
  };
  return getMuiTheme(darkBaseTheme, overwrites);
};

const muiTheme = getTheme();

class App extends React.Component {
  componentDidMount() {
    let token = utils.cookieFetch('X-Sluggram-Token');
    if (token) this.props.tokenSet(token);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="application">
          <div className='narcan'>
            <BrowserRouter>
              <div>
                <Navbar />
                <Route path="/welcome/:auth" component={LandingContainer}/>
                <Route exact path="/settings" component={() => this.props.auth ? <SettingsContainer/> : <Redirect to="/" />}/>
                <Route exact path='/learn-narcan' component={() => this.props.auth ? <AboutContainer/> : <Redirect to ="/" />}/>
                <Route exact path='/give-narcan' component={() => this.props.auth ? <DirectionsContainer/> : <Redirect to ="/" />}/>
                <Route exact path="/" component={() => this.props.auth ? <DashboardContainer/> : <Redirect to="/" />}/>
                <Route exact path="/" component={() => !this.props.auth ? <HomePage/> : <Redirect to="/" />}/>
              </div>
            </BrowserRouter>
          </div>
        </div>
      </MuiThemeProvider>

    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

let mapDispatchToProps = dispatch => ({
  tokenSet: token => dispatch(tokenSet(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
