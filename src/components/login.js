import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userActions } from '../actions/userActions';

class Login extends Component {
    componentDidMount() {
        this.props.dispatch(userActions.login(username,password));
    }
      
    render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
    user: state
});

export default connect(mapStateToProps)(Login);