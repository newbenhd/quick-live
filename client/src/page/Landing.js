import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/user.action';

class Landing extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className={"page landing"}>
        <div>Hello, landing!</div>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {auth}
};

export default connect(mapStateToProps, actions)(Landing);
