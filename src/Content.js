import React from "react";
import Editor from "./Editor";
import Finish from "./Finish";
import Start from "./Start";

class Content extends React.Component {
    render() {
        return (
            <div className="contents">
                <div className="innerContents">
                    <Start />
                    <Editor />
                    <Finish />
                </div>
            </div>
        );
    }
}

export default Content;
