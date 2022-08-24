import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { image, imageBase64 } from ".";

class Finish extends React.Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);
    }

    download() {
        console.log("jnghbiowefjmewoif")
        const finishedImage = new Image(),
            canvas = document.getElementById('editor-canvas'),
            ctx = canvas.getContext('2d');

        finishedImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAjSURBVGhD7cEBDQAAAMKg909tDwcEAAAAAAAAAAAAAACcqwEwQAABDGBv9QAAAABJRU5ErkJggg=="

        finishedImage.addEventListener('load', () => {
            ctx.canvas.width = 64
            ctx.canvas.height = 64

            //create the black background
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, 64, 64);

            //head
            console.log(image.src)
            console.log("other img")
            ctx.drawImage(image,
                8, 8,   // Start at 70/20 pixels from the left and the top of the image (crop),
                8, 8,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                8, 8,     // Place the result at 0, 0 in the canvas,
                8, 8); // With as width / height: 100 * 100 (scale)

            console.log("please work")
            console.log(finishedImage.src)
        })
    }

    render() {
        return (
            <div id="finish">
                <span className="finish-text">Here's the finished skin.</span>
                <br />
                <button onClick={this.download} className="finish-download-button"><FontAwesomeIcon icon={faDownload} /> Download Skin</button>
                <br />
                <img id="finish-img" className="finish-img" src={imageBase64} alt="final skin"></img>
            </div>
        );
    }
}

export default Finish;
