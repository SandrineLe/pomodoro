import React from "react";
import {render} from "react-dom";

class HelloMessage extends React.Component {
    render() {
        return <div>{`Hello ${this.props.name}`}</div>;
    }
}

render(
    <HelloMessage name={"Taylor"} />,
    document.querySelector("#hello-example"),
);

console.log("yo");
console.log("test");
console.log("test");
