import React from "react"
import { toggleInfo } from "./Info"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCubes, faImage } from '@fortawesome/free-solid-svg-icons'

class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.openInfo = this.openInfo.bind(this)
    }

    openInfo() {
        toggleInfo()
    }

    render() {
        return (
            <div className="nav">
                <div className="innerNav">
                    <a href="/"><span id="title"><FontAwesomeIcon icon={faImage} /> PNGskin <FontAwesomeIcon icon={faCubes} /></span></a>
                            
                    <button type="button" onClick={this.openInfo} id="info">i</button>
                </div>
            </div>
        )
    }
}

export default Nav
