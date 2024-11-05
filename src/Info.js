import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faHeart, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

let configUIOpen = false

export function toggleInfo() {
    const infoDiv = document.getElementById('info-div')
    if (configUIOpen) { //opened
        console.log("closing info div")
        //set display to none
        infoDiv.style.display = "none"

        configUIOpen = false
    } else { //not opened
        console.log("opening info div")
        //set display to block
        infoDiv.style.display = "block"

        configUIOpen = true
    }
}

class Info extends React.Component {
    constructor(props) {
        super(props)
        // This binding is necessary to make `this` work in the callback

        this.close = this.close.bind(this)
    }

    close() {
        toggleInfo()
    }

    render() {
        return <div className="info-div" id="info-div">
            <div className="info-box" id="info-box">
                <p id="title">Info</p>
                <p>PNGskin is made by udu3324.</p>

                <p><FontAwesomeIcon icon={faScrewdriverWrench} /> It is a tool that maps a image to a minecraft skin easily, so that you dont have to.</p>

                <p><FontAwesomeIcon icon={faHeart} /> Fully Open Source</p>

                <a href="https://github.com/udu3324/pngskin" target="_blank" rel="noopener noreferrer">
                    <img id="github-repo" alt="shield" src="https://img.shields.io/badge/Repository-ffffff?style=for-the-badge&logo=github&logoColor=black"/>
                </a>
                <br/>
                <button type="button" onClick={this.close} className="info-close-button"><FontAwesomeIcon icon={faCircleXmark} /> Close</button>
            </div>
        </div>
    }
}

export default Info
