import React, { Component } from 'react';
import { Link } from 'react-router';
import MentorList from '../containers/MentorList.jsx';


class LandingPage extends Component {
  render() {
    return (
     <div>
     	<div>
	     	<img className="placeholder" src="http://imgur.com/l3g52Tu.jpg"/>
	     	 <br />
        <h2 className="welcome_padawan">
	     		Meet our favorite mentors!
	     		<br />
	     	</h2>
     		<MentorList />
     	</div>
     </div>
    )
  }
}

export default LandingPage;