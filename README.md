#React Amazon Gallery
[![npm package](https://img.shields.io/npm/v/react-amazon-gallery.svg?style=flat-square)](https://www.npmjs.org/package/react-amazon-gallery)

[![PeerDependencies](https://img.shields.io/david/peer/michaellyons/react-amazon-gallery.svg?style=flat-square)](https://david-dm.org/michaellyons/react-amazon-gallery#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/michaellyons/react-amazon-gallery.svg?style=flat-square)](https://david-dm.org/michaellyons/react-amazon-gallery)
[![DevDependencies](https://img.shields.io/david/dev/michaellyons/react-amazon-gallery.svg?style=flat-square)](https://david-dm.org/michaellyons/react-amazon-gallery#info=devDependencies&view=list)


This is a React JS Component inspired by clean gallery design.

###Sample Screencap
![Image of Gallery]
(http://i.imgur.com/CHVrtc3.jpg)

###Current Capabilities
1. List Gallery View
  * Renders a one dimensional array of image src strings.

###Future Capabilities
1. Variation Gallery View
  * Allows for clean browsing experience of product variations and similar perspective combinations which would look terrible in a grid.
  * Should have injectable image array option to render flavor options in custom/external div

## Prerequisites

You should be using [NodeJS](https://www.nodejs.org) and [ReactJS](https://facebook.github.io/react/)

## Installation

React Amazon Gallery is available as an [npm package](https://www.npmjs.org/package/react-amazon-gallery).
```sh
npm install react-amazon-gallery [-S] (Optional save tag)
```
After npm install, you'll find all the .jsx files in the /src folder and their compiled versions in the /lib folder.


## Usage

Using React Amazon Gallery is very straightforward. Once it is included in your project, you can use the components this way:

```js
import React from 'react';
import Gallery from 'react-amazon-gallery';

let imageArray = [
	'/link/to/image1.png',
	'/link/to/image2.png',
	'/link/to/image3.png'
];

let config = {
  orientation: 'horizontal',
  overlay: true, 
  posY: 'bot',
  hlColor: '#ff8c00',
  hlSize: 16,
};

const MyAwesomeReactComponent = () => (
  <Gallery config={config} images={imageArray} />
);

export default MyAwesomeReactComponent;
```

## Customization

The component has a Config prop that may be passed an object with these keys:

Key | Type | Description
----- | ----- | -----
cHeight | Integer/String | If set, this will override the Gallery's height from 100% to the pixels indicated
orientation | Enum | 'vertical' or 'horizontal' will change the flow of image thumbnails
overlay | Boolean | If set, the image thumbnails will not be given gutter padding
posY | Enum | 'top' or 'bot' will shift where the thumbnails are positioned
posX | Enum | 'left' or 'right' will shift where the thumbnails are positioned
jewelSpacing | Integer | Distance between image thumbnails
jewelSize | Integer | Sets the size of the thumbnails
hlColor | String | Accepts CSS colors (Hex/Names)
hlSize | Integer | Sets the size of the thumbnail's highlight glow effect

## Sandbox

There is a sandbox app that you can look at to get started. It can be found in the [sandbox folder](https://github.com/michaellyons/react-amazon-gallery/tree/master/sandbox). The sandbox uses [webpack](https://webpack.github.io/) for module bundling and building.

## Contribute

This project is actually just a small module that I built for another. I'd greatly appreciate any [contribution](https://github.com/michaellyons/react-amazon-gallery/blob/master/CONTRIBUTING.md) you make. :)

## License
This project is licensed under the terms of the [MIT license](https://github.com/michaellyons/react-amazon-gallery/blob/master/LICENSE)
