import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faUpload } from '@fortawesome/free-solid-svg-icons'
import { setImage } from ".";

import img1 from './img/DALLE_2022-08-20_21.02.12_-_A_portrait_of_a_cat_wearing_an_har_with_a_background_full_of_pineapples_4k_artstation(dalle-2).webp';
import img2 from './img/skin-output(dalle-2).webp';

class Start extends React.Component {
    componentDidMount() {
        var dropZone = document.getElementById('root');

        //tysm <3 https://stackoverflow.com/a/26580724/16216937
        // Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
        dropZone.addEventListener('dragover', (e) => {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });

        // Get file data on drop
        dropZone.addEventListener('drop', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const fileList = e.dataTransfer.files; // Array of all files
            
            for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
                const file = fileList[i];
                const reader = new FileReader()
                reader.onload = (base64) => {
                    //base64.target.result
                    setImage(base64.target.result)
                }
                reader.readAsDataURL(file);
            }
        });
    }
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
                const reader = new FileReader()
                reader.onload = (base64) => {
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
                <span className="start-text">PNGskin is a Minecraft Skin Generator that turns images into skins.</span>
                <br />
                <button onClick={this.simulateClick} className="upload-image-button"><FontAwesomeIcon icon={faUpload} /> Upload Image</button>
                <input onClick={this.getFile} type="file" id="upload-file" className="hide" name="filename" accept=".png,.jpg,.jpeg,.jfif,.pjpeg,.pjp,.webp" />
                <br />
                <div className="start-stack-divs">
                    <div className="start-stacking-divs start-imgdiv-1">
                        <span>Start</span>
                        <br />
                        <img className="start-image-1" alt="before" title="this image was made by ai btw" src={img1}/>
                    </div>
                    <div className="start-stack-divs arrowStart">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                    <div className="start-stacking-divs">
                        <span>Finish</span>
                        <br />
                        <img className="start-image-2" alt="after" src={img2}/>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}

export default Start;
