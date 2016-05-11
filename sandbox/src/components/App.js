import React from 'react';
import { Gallery } from 'react-amazon-gallery';

var App = React.createClass({
  render() {
  	let imageArray = [
  		'/img/land1.jpg',
  		'/img/land2.jpg',
  		'/img/land3.jpg',
  		'/img/land4.jpg',
  		'/img/land5.jpg',
  	];
    return (
    <div>
    	<Gallery images={imageArray} />
  	</div>
    );
  }
});

export default App;