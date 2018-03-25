import React, { Component } from 'react';
import Facebook from 'react-oauth2';

export default class Auth extends Component{
  constructor(){
    super();
    this.state = {
      "data": {
        "id": "", "name": "", "email": "", "gender": "", "location": { "id": "", "name": "" }
      }
    };
  }

  facebook(err, res){
    if (!err) {
      this.setState({ data: res.profile })
    } else {
      this.setState({ data: 'something happen wrong' })
    }
  }

  render(){
    return (<div>
        <Facebook url={'http://localhost:3000/'}
          clientId={'124701455037662'}
          clientSecret={'783032aba12cc1a48916cc5ab753ee0e'}
          redirectUri={'http://localhost:3000/'}
          scope={'email,user_location'}
          width={300}
          height={300}
          callback={this.facebook}
          style={{ color: 'green' }}
        >
          Login With Facebook From component
    </Facebook>
        <hr />
        {JSON.stringify(this.state)}
      </div>
    );
  }
}