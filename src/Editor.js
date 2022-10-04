import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleCheck, faMaximize, faUpDownLeftRight } from '@fortawesome/free-solid-svg-icons'
import { imageBase64, setImage } from ".";

export let color = "#000000";

export let wrap = false;

let sx;
let sy;
let sw;
let sh;
let dw;
let dh;

let openedAdvancedMenu = false;

let scaleAspectRatio = false;

//draws the new edited image to the canvas
function sync() {
    console.log(`${sx} ${sy} ${sw} ${sh}`)

    const image = new Image(),
        canvas = document.getElementById('editor-canvas'),
        ctx = canvas.getContext('2d');

    image.src = imageBase64

    image.addEventListener('load', () => {
        //fill the bg
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 16, 32);

        //draw the image
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
        document.getElementById('size-aspect-ratio').max = image.width * 2


        //set input range value
        document.getElementById('sx').value = sx
        document.getElementById('sy').value = sy
        document.getElementById('sw').value = sw
        document.getElementById('sh').value = sh
        document.getElementById('size-aspect-ratio').value = sw

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

        this.openAdvanced = this.openAdvanced.bind(this);
        this.colorInput = this.colorInput.bind(this);
        this.wrapInput = this.wrapInput.bind(this);
        this.aspectRatio = this.aspectRatio.bind(this);

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

    sizeAspectRatio() {
        sh = (document.getElementById('size-aspect-ratio').value * sh) / sw
        sw = document.getElementById('size-aspect-ratio').value

        document.getElementById('sw').value = sw
        document.getElementById('sh').value = sh
        sync()
    }

    openAdvanced() {
        if (openedAdvancedMenu) {
            document.getElementById('advanced-dropdown-div').style.display = "none"
            openedAdvancedMenu = false
        } else {
            document.getElementById('advanced-dropdown-div').style.display = "block"
            openedAdvancedMenu = true
        }
    }

    colorInput() {
        color = document.getElementById('clr-input').value
        sync()
    }

    wrapInput() {
        wrap = document.getElementById('wrap-input').checked
    }

    aspectRatio() {
        if (scaleAspectRatio) {
            scaleAspectRatio = false;
            document.getElementById('editor-size-control-div').style.display = "block"
            document.getElementById('editor-aspect-ratio-size-control-div').style.display = "none"
        } else {
            scaleAspectRatio = true;
            document.getElementById('editor-size-control-div').style.display = "none"
            document.getElementById('editor-aspect-ratio-size-control-div').style.display = "block"
        }
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
                    <span className="editor-text">Edit Image</span>
                    <br />
                    <span>Use the sliders to edit skin.</span>
                </div>

                <div className="editor-grid-left">
                    <div>
                        <span className="editor-input-label"><FontAwesomeIcon icon={faUpDownLeftRight} /> Move Left & Right</span>
                        <br />
                        <input id="sx" className="editor-range-input" onChange={this.sx} type="range" min="1" max="100"></input>
                    </div>

                    <div>
                        <span className="editor-input-label"><FontAwesomeIcon icon={faUpDownLeftRight} /> Move Up & Down</span>
                        <br />
                        <input id="sy" className="editor-range-input" onChange={this.sy} type="range" min="1" max="100"></input>
                    </div>

                    <div id="editor-size-control-div">
                        <div>
                            <span className="editor-input-label"><FontAwesomeIcon icon={faMaximize} /> Size Left & Right</span>
                            <br />
                            <input id="sw" className="editor-range-input invert-input" onChange={this.sw} type="range" min="1" max="100"></input>
                        </div>

                        <div>
                            <span className="editor-input-label"><FontAwesomeIcon icon={faMaximize} /> Size Up & Down</span>
                            <br />
                            <input id="sh" className="editor-range-input invert-input" onChange={this.sh} type="range" min="1" max="100"></input>
                        </div>
                    </div>

                    <div id="editor-aspect-ratio-size-control-div" className="editor-aspect-ratio-size-control-div">
                        <span className="editor-input-label"><FontAwesomeIcon icon={faMaximize} /> Size Aspect Ratio</span>
                        <br />
                        <input id="size-aspect-ratio" className="editor-range-input invert-input" onChange={this.sizeAspectRatio} type="range" min="1" max="100"></input>
                    </div>

                    <div className="advanced-dropdown-bg">
                        <button onClick={this.openAdvanced} className="advanced-button"><FontAwesomeIcon icon={faBars} /> Advanced Settings</button>

                        <div id="advanced-dropdown-div" className="advanced-dropdown-div">
                            <div>
                                <input onChange={this.colorInput} type="color" id="clr-input" className="clr-input" />
                                <span className="editor-input-label"> Rest of Skin Color</span>
                            </div>

                            <div>
                                <input onClick={this.wrapInput} type="checkbox" id="wrap-input" className="wrap-input" />
                                <span className="editor-input-label"> Wrap Image (2px)</span>
                            </div>

                            <div>
                                <input onClick={this.aspectRatio} type="checkbox" id="aspect-ratio-input" className="aspect-ratio-input" />
                                <span className="editor-input-label"> Scale to Aspect Ratio</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={this.finish} className="editor-finish-button"><FontAwesomeIcon icon={faCircleCheck} /> Finish Edit</button>
                </div>

                <div className="editor-grid-right">
                    <canvas id="editor-canvas" className="editor-canvas"></canvas>
                </div>
            </div>
        );
    }
}

export default Editor;
