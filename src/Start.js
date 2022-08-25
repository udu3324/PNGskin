import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { setImage } from ".";

class Start extends React.Component {
    constructor(props) {
        super(props);

        this.simulateClick = this.simulateClick.bind(this);
        this.getFile = this.getFile.bind(this);
    }

    simulateClick() {
        document.getElementById('upload-file').click();
    }

    getFile() {
        const inputElement = document.getElementById('upload-file');

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
    }

    render() {
        return (
            <div id="start">
                <div className="start-text-div"><span className="start-text">PNGskin is a Minecraft Skin Generator that turns images into skins.</span></div>
                <button onClick={this.simulateClick} className="upload-image-button"><FontAwesomeIcon icon={faUpload} /> Upload Image</button>
                <input onClick={this.getFile} type="file" id="upload-file" className="hide" name="filename" accept=".png,.jpg,.jpeg,.jfif,.pjpeg,.pjp" />
                <br />
                <div className="start-stack-divs">
                    <div className="start-stacking-divs start-imgdiv-1">
                        <span>Start</span>
                        <br />
                        <img className="start-image-1" alt="before" src="https://media.discordapp.net/attachments/919010462476152832/1012127567496622100/DALLE_2022-08-20_21.02.12_-_A_portrait_of_a_cat_wearing_an_har_with_a_background_full_of_pineapples_4k_artstation.png"></img>
                    </div>
                    <div className="start-stacking-divs">
                        <span>Finish</span>
                        <br />
                        <img className="start-image-2" alt="after" src="https://media.discordapp.net/attachments/919010462476152832/1012127567798607882/nice.png"></img>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}

export default Start;
