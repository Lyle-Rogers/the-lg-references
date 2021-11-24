import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';

class GuardedRoute extends Component {
  constructor(props){
    super(props)

  }

  render() {
    const Component = this.props.component
    return (
      <Route path={this.props.path} render={(props) => (
        this.props.auth === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )}
      
      />
      );
  }
}

export default GuardedRoute;
