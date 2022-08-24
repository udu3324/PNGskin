import React from "react";
import Editor from "./Editor";
import Finish from "./Finish";
import Start from "./Start";

class Content extends React.Component {
    render() {
        return (
            <div className="contents">
                <Start />
                <Editor />
                <Finish />
            </div>
        );
    }
}

export default Content;
