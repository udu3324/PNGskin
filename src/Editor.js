import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faMaximize, faUpDownLeftRight } from '@fortawesome/free-solid-svg-icons'
import { imageBase64, setImage } from ".";

let sx;
let sy;
let sw;
let sh;
let dw;
let dh;

//draws the new edited image to the canvas
function sync() {
    
    console.log(`${sx} ${sy} ${sw} ${sh} ${dw} ${dh}`)

    const image = new Image(),
        canvas = document.getElementById('editor-canvas'),
        ctx = canvas.getContext('2d');

    image.src = imageBase64

    image.addEventListener('load', () => {
        ctx.drawImage(image,
            sx, sy,   // Start at 70/20 pixels from the left and the top of the image (crop),
            sw, sh,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
            0, 0,     // Place the result at 0, 0 in the canvas,
            dw, dh); // With as width / height: 100 * 100 (scale)

        //create the silhouette 
        ctx.fillStyle = '#36393f';
        ctx.fillRect(0, 0, 4, 8);
        ctx.fillRect(12, 0, 4, 8);
        ctx.fillRect(0, 20, 4, 12);
        ctx.fillRect(12, 20, 4, 12);
    })
}

//set the canvas image from outside the js file
export function setCanvasImg() {
    const image = new Image(),
        canvas = document.getElementById('editor-canvas'),
        ctx = canvas.getContext('2d');

    image.src = imageBase64

    image.addEventListener('load', () => {
        ctx.canvas.width = 16
        ctx.canvas.height = 32

        ctx.drawImage(image, 0, 0)

        //set initial values
        sx = 0
        sy = 0
        sw = image.width
        sh = image.height

        dw = (32 * image.width) / image.height
        dh = 32

        //set input range min
        document.getElementById('sx').min = -image.width
        document.getElementById('sy').min = -image.height

        //set input range maxes
        document.getElementById('sx').max = image.width
        document.getElementById('sy').max = image.height
        document.getElementById('sw').max = image.width * 2
        document.getElementById('sh').max = image.height * 2

        //set input range value
        document.getElementById('sx').value = sx
        document.getElementById('sy').value = sy
        document.getElementById('sw').value = sw
        document.getElementById('sh').value = sh

        sync()
    });
}

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.sx = this.sx.bind(this);
        this.sy = this.sy.bind(this);
        this.sw = this.sw.bind(this);
        this.sh = this.sh.bind(this);

        this.finish = this.finish.bind(this);
    }

    sx() {
        sx = document.getElementById('sx').value
        sync()
    }

    sy() {
        sy = document.getElementById('sy').value
        sync()
    }

    sw() {
        sw = document.getElementById('sw').value
        sync()
    }

    sh() {
        sh = document.getElementById('sh').value
        sync()
    }

    finish() {
        //make editor content invisible and show finish content
        document.getElementById('editor').style.display = "none"
        document.getElementById('finish').style.display = "block"

        //save the canvas
        setImage(document.getElementById('editor-canvas').toDataURL())

        document.getElementById('finish-img').src = document.getElementById('editor-canvas').toDataURL()
    }

    render() {
        return (
            <div id="editor" className="editor-grid">
                <div className="editor-grid-top">
                    <span className="editor-text">Edit Image to Skin</span>
                    <br />
                    <span>Use the sliders to create your skin.</span>
                </div>
                <div className="editor-grid-left">
                    <span className="editor-input-label"><FontAwesomeIcon icon={faUpDownLeftRight} /> Move Left & Right</span>
                    <br />
                    <input id="sx" className="editor-range-input" onChange={this.sx} type="range" min="1" max="100"></input>
                    <br />
                    <span className="editor-input-label"><FontAwesomeIcon icon={faUpDownLeftRight} /> Move Up & Down</span>
                    <br />
                    <input id="sy" className="editor-range-input" onChange={this.sy} type="range" min="1" max="100"></input>
                    <br />
                    <span className="editor-input-label"><FontAwesomeIcon icon={faMaximize} /> Size Left & Right</span>
                    <br />
                    <input id="sw" className="editor-range-input" onChange={this.sw} type="range" min="1" max="100"></input>
                    <br />
                    <span className="editor-input-label"><FontAwesomeIcon icon={faMaximize} /> Size Up & Down</span>
                    <br />
                    <input id="sh" className="editor-range-input" onChange={this.sh} type="range" min="1" max="100"></input>
                    <br />
                    <button onClick={this.finish} className="editor-finish-button"><FontAwesomeIcon icon={faCircleCheck} /> Finish Edit</button>
                </div>
                <div className="editor-grid-right">
                    <canvas id="editor-canvas"></canvas>
                </div>
            </div>
        );
    }
}

export default Editor;
