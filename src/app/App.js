import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const DefaultLayout = React.lazy(() => import('../containers/Layout/Default'));

// Pages
const Login = React.lazy(() => import('../containers/Pages/Login'));
const Register = React.lazy(() => import('../containers/Pages/Register'));
const Page404 = React.lazy(() => import('../containers/Pages/Page404'));

class App extends Component {

  	render() {
		return (
			<BrowserRouter>
				<Suspense fallback={loading()}>
					<Switch>
						<Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
						<Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
						<Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
						<Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		);
  	}
}

export default App;
