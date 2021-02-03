import React from "react";
import ReactDOM from "react-dom";
import ClockDisplayer from "./components/clock-displayer";
import ClockSetter from "./components/clock-setter";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            working: true,
            running: false,
            pause: false,
            totalSeconds: 25 * 60,
            clockMinutes: 25,
            clockSeconds: 0,
            workDuration: 25,
            breakDuration: 5,
            clock: null,
        };
    }

    componentWillUpdate() {
        if (this.state.totalSeconds === 0 && this.state.working) {
            this.prepareHandler({
                working: !this.state.working,
                totalSeconds: this.state.breakDuration * 60,
                clockMinutes: this.state.breakDuration,
                clockSeconds: 0,
            });
        } else if (this.state.totalSeconds === 0 && !this.state.working) {
            this.prepareHandler({
                working: !this.state.working,
                totalSeconds: this.state.workDuration * 60,
                clockMinutes: this.state.workDuration,
                clockSeconds: 0,
            });
        }
    }

    clickStart() {
        console.log("startt");
        if (this.state.pause) {
            // null
        } else {
            this.prepareHandler({pause: false});
        }
        if (this.state.running) {
            // null
        } else {
            this.prepareHandler({
                clock: setInterval(() => {
                    this.prepareHandler(
                        {totalSeconds: this.state.totalSeconds - 1},
                        () => {
                            this.prepareHandler(
                                {
                                    clockMinutes: Math.floor(
                                        this.state.totalSeconds / 60,
                                    ),
                                },
                                () => {
                                    this.prepareHandler({
                                        clockSeconds:
                                            this.state.totalSeconds -
                                            this.state.clockMinutes * 60,
                                    });
                                },
                            );
                        },
                    );
                }, 1000),
                running: true,
            });
        }
    }

    clickPause() {
        console.log("pause");
        clearInterval(this.state.clock);
        this.prepareHandler({
            pause: true,
            running: false,
        });
    }

    clickReset() {
        console.log("stop");
        clearInterval(this.state.clock);
        if (this.state.working) {
            this.prepareHandler({
                running: false,
                totalSeconds: this.state.workDuration * 60,
                clockMinutes: this.state.workDuration,
                clockSeconds: 0,
            });
        } else {
            this.prepareHandler({
                running: false,
                totalSeconds: this.state.breakDuration * 60,
                clockMinutes: this.state.breakDuration,
                clockSeconds: 0,
            });
        }
    }

    setWorkTime(e) {
        switch (e) {
            case "+":
                this.prepareHandler(
                    {
                        workDuration: this.state.workDuration + 1,
                    },
                    () => {
                        if (
                            !this.state.running &&
                            this.state.working &&
                            !this.state.pause
                        ) {
                            this.prepareHandler({
                                clockMinutes: this.state.clockMinutes + 1,
                                totalSeconds: this.state.workDuration * 60,
                            });
                        }
                    },
                );
                break;

            case "-":
                if (this.state.workDuration < 2) {
                    //null
                } else {
                    this.prepareHandler(
                        {
                            workDuration: this.state.workDuration - 1,
                        },
                        () => {
                            if (
                                !this.state.running &&
                                this.state.working &&
                                !this.state.pause
                            ) {
                                this.prepareHandler({
                                    clockMinutes: this.state.clockMinutes - 1,
                                    totalSeconds: this.state.workDuration * 60,
                                });
                            }
                        },
                    );
                }
                break;
            default:
                console.log(`Error with the time machine.`);
        }
    }

    setBreakTime(e) {
        switch (e) {
            case "+":
                this.prepareHandler(
                    {
                        breakDuration: this.state.breakDuration + 1,
                    },
                    () => {
                        if (
                            !this.state.running &&
                            !this.state.working &&
                            !this.state.pause
                        ) {
                            this.prepareHandler({
                                clockMinutes: this.state.clockMinutes + 1,
                                totalSeconds:
                                    (this.state.breakDuration + 1) * 60,
                            });
                        }
                    },
                );
                break;

            case "-":
                if (this.state.breakDuration < 2) {
                    // null
                } else {
                    this.prepareHandler(
                        {
                            breakDuration: this.state.breakDuration - 1,
                        },
                        () => {
                            if (
                                !this.state.running &&
                                !this.state.working &&
                                !this.state.pause
                            ) {
                                this.prepareHandler({
                                    clockMinutes: this.state.clockMinutes - 1,
                                    totalSeconds: this.state.breakDuration * 60,
                                });
                            }
                        },
                    );
                }
                break;
            default:
                console.log(`Error with the time machine.`);
        }
    }

    render() {
        return (
            <div>
                <div className={"App"}>
                    <ClockDisplayer
                        clockMinutes={this.state.clockMinutes}
                        clockSeconds={this.state.clockSeconds}
                    />
                    <div className={"startPauseReset"}>
                        <button onClick={e => this.clickStart(e)}>
                            {`Start`}
                        </button>
                        <button onClick={e => this.clickPause(e)}>
                            {`Pause`}
                        </button>
                        <button onClick={e => this.clickReset(e)}>
                            {`Reset`}
                        </button>
                    </div>
                    <div className={"plusandminus"}>
                        <ClockSetter
                            timeSetterLabel={"Working time"}
                            handleClickMinus={() => this.setWorkTime("-")}
                            handleClickPlus={() => this.setWorkTime("+")}
                            durationSetting={this.state.workDuration}
                        />
                        <ClockSetter
                            timeSetterLabel={"Break"}
                            handleClickPlus={() => this.setBreakTime("+")}
                            handleClickMinus={() => this.setBreakTime("-")}
                            durationSetting={this.state.breakDuration}
                        />
                    </div>
                </div>
            </div>
        );
    } //render
}

ReactDOM.render(<App />, document.querySelector("#timer"));
