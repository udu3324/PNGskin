import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { imageBase64 } from ".";

class Finish extends React.Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);
    }

    download() {
        //todo
    }

    render() {
        return (
            <div id="finish">
                <span className="finish-text">Here's the finished skin.</span>
                <br />
                <button onClick={this.finish} className="finish-download-button"><FontAwesomeIcon icon={faDownload} /> Download Skin</button>
                <br />
                <img id="finish-img" className="finish-img" src={imageBase64} alt="final skin"></img>
            </div>
        );
    }
}

export default Finish;
