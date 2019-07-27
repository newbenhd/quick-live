import React, {Component} from 'react';
import {connect} from 'react-redux';

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

export default connect(mapStateToProps, null)(Landing);
