import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { image, imageBase64 } from ".";

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

            //download it
            downloadImage(canvas.toDataURL())
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
                <canvas id="finish-canvas"></canvas>
            </div>
        );
    }
}

export default Finish;
