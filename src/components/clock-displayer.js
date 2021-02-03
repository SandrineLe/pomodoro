import React from "react";

class ClockDisplayer extends React.Component {
    render() {
        return (
            <div className={"container"}>
                <div className={"pomodoroTime"}>
                    {this.props.clockMinutes}
                    <span> {`m`}</span>
                    {this.props.clockSeconds === 0 ? (
                        ""
                    ) : this.props.clockSeconds < 10 ? (
                        <div>
                            {" "}
                            {`0`}
                            {this.props.clockSeconds}
                            <span> {`s`}</span>
                        </div>
                    ) : (
                        <div>
                            {" "}
                            {this.props.clockSeconds}
                            <span> {`s`}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ClockDisplayer;
