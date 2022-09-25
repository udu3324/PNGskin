import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faDownload } from '@fortawesome/free-solid-svg-icons'
import { image, imageBase64 } from ".";
import { color, resetColor } from "./Editor";

// tysm https://dev.to/sbodi10/download-images-using-javascript-51a9
async function downloadImage(imageSrc) {
    console.log("downloading skin")
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'skin (png-skin.vercel.app).png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

class Finish extends React.Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);
        this.restart = this.restart.bind(this);
    }

    download() {
        console.log("generating the skin")
        const finishedImage = new Image(),
            canvas = document.getElementById('finish-canvas'),
            ctx = canvas.getContext('2d');

        ctx.canvas.width = 64
        ctx.canvas.height = 64

        //transparent 64x64 base64 img
        finishedImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAnSURBVHhe7cEBDQAAAMKg909tDjcgAAAAAAAAAAAAAAAAAAAA4FwNQEAAAQtzTh0AAAAASUVORK5CYII="

        finishedImage.addEventListener('load', () => {
            //head
            ctx.drawImage(image,
                4, 0,  //sx, sy
                8, 8,  //sw, sh (same)
                8, 8,  //dx, dy
                8, 8); //dw, dh (same)

            //body
            ctx.drawImage(image,
                4, 8,  //sx, sy
                8, 12,  //sw, sh (same)
                20, 20,  //dx, dy
                8, 12); //dw, dh (same)

            //left arm
            ctx.drawImage(image,
                0, 8,  //sx, sy
                4, 12,  //sw, sh (same)
                44, 20,  //dx, dy
                4, 12); //dw, dh (same)

            //right arm
            ctx.drawImage(image,
                12, 8,  //sx, sy
                4, 12,  //sw, sh (same)
                36, 52,  //dx, dy
                4, 12); //dw, dh (same)

            //left leg
            ctx.drawImage(image,
                4, 20,  //sx, sy
                4, 12,  //sw, sh (same)
                4, 20,  //dx, dy
                4, 12); //dw, dh (same)

            //right leg
            ctx.drawImage(image,
                8, 20,  //sx, sy
                4, 12,  //sw, sh (same)
                20, 52,  //dx, dy
                4, 12); //dw, dh (same)

            //fill everything else in
            ctx.fillStyle = color;
            ctx.fillRect(8, 0, 17, 8);

            ctx.fillRect(0, 8, 8, 8);
            ctx.fillRect(16, 8, 16, 8);

            ctx.fillRect(4, 16, 8, 4);
            ctx.fillRect(20, 16, 16, 4);
            ctx.fillRect(44, 16, 8, 4);

            ctx.fillRect(0, 20, 4, 12);
            ctx.fillRect(8, 20, 12, 12);
            ctx.fillRect(28, 20, 16, 12);
            ctx.fillRect(48, 20, 8, 12);

            ctx.fillRect(20, 48, 8, 4);
            ctx.fillRect(36, 48, 8, 4);

            ctx.fillRect(16, 52, 4, 12);
            ctx.fillRect(24, 52, 12, 12);
            ctx.fillRect(40, 52, 8, 12);

            //download it
            downloadImage(canvas.toDataURL())
        })
    }

    restart() {
        //close finish and show start
        document.getElementById('finish').style.display = "none"
        document.getElementById('start').style.display = "block"
        resetColor()
    }

    render() {
        return (
            <div id="finish">
                <span className="finish-text">Here's the finished skin.</span>
                <br />
                <button onClick={this.download} className="finish-download-button"><FontAwesomeIcon icon={faDownload} /> Download Skin</button>
                <button onClick={this.restart} className="restart-button"><FontAwesomeIcon icon={faArrowsRotate} /> Restart</button>
                <br />
                <img id="finish-img" className="finish-img" src={imageBase64} alt="final skin"></img>
                <canvas id="finish-canvas"></canvas>
            </div>
        );
    }
}

export default Finish;
