import React, {Component} from 'react';
import axios from 'axios';

class Landing extends Component {
  async componentDidMount() {
    try{
      const res = await axios.get('/api/user', {headers: {'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDNhYWRkMjA4NWQ5YzVhYTMxODZhZTkiLCJpYXQiOjE1NjQxMjY2NzQsImV4cCI6MTU2NDE0NDY3NH0.ET1Sd4nwkeN4kfxb8OXTr3aY7dagaRRQuXiu9xBG7E0"}});
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={"page landing"}>
        <div>Hello, landing!</div>
      </div>
    );
  }
}

export default Landing;
