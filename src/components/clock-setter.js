import React from "react";

class ClockSetter extends React.Component {
    render() {
        return (
            <div className={"container"}>
                <h3>{this.props.timeSetterLabel}</h3>
                <div className={"clockSetter_btn"}>
                    <button onClick={this.props.handleClickMinus}>{`-`}</button>

                    <h4>{this.props.durationSetting}</h4>
                    <button onClick={this.props.handleClickPlus}>{`+`}</button>
                </div>
            </div>
        );
    }
}

export default ClockSetter;
