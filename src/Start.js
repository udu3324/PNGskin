import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { setImage } from ".";

function openFileDialog() {
    const inputElement = document.createElement("input");

    inputElement.type = "file";
    inputElement.accept = "image/png, image/jpeg";

    inputElement.addEventListener("change", function () {
        const fileList = this.files;

        for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
            const file = fileList[i];
            var reader = new FileReader()
            reader.onload = function (base64) {
                //base64.target.result
                setImage(base64.target.result)
            }
            reader.readAsDataURL(file);
        }
    })

    inputElement.dispatchEvent(new MouseEvent("click"));
}

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.openFileExplorer = this.openFileExplorer.bind(this);
    }

    openFileExplorer() {
        openFileDialog()
    }

    render() {
        return (
            <div id="start">
                <span className="start-text">PNGskin is a Minecraft Skin <br/>Generator that turns images <br/>into skins.</span>
                <br />
                <button onClick={this.openFileExplorer} className="upload-image-button"><FontAwesomeIcon icon={faUpload} /> Upload Image</button>
                <br />
                <div className="start-stack-divs">
                    <div className="start-stacking-divs start-imgdiv-1">
                        <span>Start</span>
                        <br />
                        <img className="start-image-1" alt="before" src="todo"></img>
                    </div>
                    <div className="start-stacking-divs">
                        <span>Finish</span>
                        <br />
                        <img className="start-image-2" alt="after" src="todo"></img>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}

export default Start;
