import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';
import App from './App';
import { setCanvasImg } from './Editor';

export var image = new Image();

export var imageBase64;

export function setImage(base64) {
  console.log("img has been set. ")

  image.src = base64;

  image.onload = function () {
    //stop if image is too small
    if (image.width < 16 || image.height < 32) 
      return alert("The image you uploaded is too small!")

    //stop showing the start content
    document.getElementById('start').style.display = "none"

    imageBase64 = image.src

    //show the editor or final based on image size
    if (image.width === 16 && image.height === 32) {
      document.getElementById('finish').style.display = "block"
      document.getElementById('finish-img').src = image.src
    } else {
      document.getElementById('editor').style.display = "grid"
      setCanvasImg()
    }
  };
}

console.log("pngskin by udu3324 (https://github.com/udu3324)")

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);