# React Amazon Gallery

### Inspired by Amazon's clean display for products.

[![PeerDependencies](https://img.shields.io/david/peer/michaellyons/react-amazon-gallery.svg?style=flat-square)](https://david-dm.org/michaellyons/react-amazon-gallery#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/michaellyons/react-amazon-gallery.svg?style=flat-square)](https://david-dm.org/michaellyons/react-amazon-gallery)
[![DevDependencies](https://img.shields.io/david/dev/michaellyons/react-amazon-gallery.svg?style=flat-square)](https://david-dm.org/michaellyons/react-amazon-gallery#info=devDependencies&view=list)

## [Github Page](https://michaellyons.github.io/react-amazon-gallery)

## Sample Screencap
![Image of Gallery]
(http://i.imgur.com/CHVrtc3.jpg)

## Current Capabilities
1. One Dimensional Gallery View
  * Renders a one dimensional array of image src strings.
2. Two Dimensional Gallery View
  * Allows for clean browsing experience of product variations and similar perspective combinations which would look terrible in a grid.


## Prerequisites

You should be using [NodeJS](https://www.nodejs.org) and [ReactJS](https://facebook.github.io/react/)

## Installation

React Amazon Gallery is available as an [npm package](https://www.npmjs.org/package/react-amazon-gallery).
```sh
npm install react-amazon-gallery [-S]
```
or

```sh
yarn add react-amazon-gallery
```


## Usage

Using React Amazon Gallery is very straightforward. Once it is included in your project, you can use the components this way:

```js
import React from 'react';
import Gallery from 'react-amazon-gallery';

let images = [
  './images/image_1.jpg',
  './images/image_2.jpg',
  './images/image_3.jpg',
  './images/image_4.jpg',
  ...
]

const MyAwesomeReactComponent = () => (
  <Gallery images={images} />
);

export default MyAwesomeReactComponent;
```

## Customization

Key | | Required |  Type | Description
----- | ----- | ----- |  ----- | -----
images | | Array<String>/Array<Array<String>>| A 1D or a 2D Array of images. (2D) Images in Zero Index will be the secondary thumbnails
height | | Integer/String | This will set the total height of the chart.
width | | Integer/String | This will set override the width of the chart.
main | | | object | This is the config object for the main thumbnails
 | orientation | Enum | 'vertical' or 'horizontal' will change the flow of image thumbnails
 | overlay | Boolean | If set, the image thumbnails will not be given gutter padding
 | posY | Enum | 'top' or 'bot' will shift where the thumbnails are positioned
 | posX | Enum | 'left' or 'right' will shift where the thumbnails are positioned
 | spacing | Integer | Distance between image thumbnails
 | size | Integer | Sets the size of the thumbnails
 | hlColor | String | Accepts CSS colors (Hex/Names)
 | hlSize | Integer | Sets the size of the thumbnail's highlight glow effect
style |  | Object | Style that is passed to SVG.
wrapStyle |  | Object | Style for wrapper div (div).

## Contribute

This project is open source of course!. I'd greatly appreciate any [contribution](https://github.com/michaellyons/react-amazon-gallery/blob/master/CONTRIBUTING.md) you make. :)

To get started developing simply run
```
npm start
```
And open your browser to http://localhost:8000/

I like to develop my components in a demo app that doubles as the Github Page.

## Building

This project uses Webpack to develop and bundle the demo page, the config can be found in the config folder.

To transpile the source simply run
```
npm run babel
```

To build a new Demo app, run
```
npm run deploy:prod
```

## License
This project is licensed under the terms of the [MIT license](https://github.com/michaellyons/react-amazon-gallery/blob/master/LICENSE)
