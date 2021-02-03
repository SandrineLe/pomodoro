import React from "react";
import ReactDOM from "react-dom";
import ClockDisplayer from "./components/clock-displayer";
import ClockSetter from "./components/clock-setter";
/* eslint-disable */


  class App extends React.Component {
     
    constructor(props) {
      super(props);
      this.state = {
        working:true,
        running:false,
        pause:false,
        totalSeconds:25*60,
        clockMinutes:25,
        clockSeconds:0,
        workDuration:25,
        breakDuration:5,
        clock: null
      }
    }
    
    componentWillUpdate() {
      if (this.state.totalSeconds === 0 && this.state.working) {
        this.props.prepareHandler ({
          working: !this.state.working,
          totalSeconds: this.state.breakDuration * 60,
          clockMinutes: this.state.breakDuration,
          clockSeconds: 0
        })
      } 
      else if (this.state.totalSeconds === 0 && !this.state.working) {
        this.props.prepareHandler ({
          working: !this.state.working,
          totalSeconds: this.state.workDuration * 60,
          clockMinutes: this.state.workDuration,
          clockSeconds: 0
        })
      }  
    }
    
    clickStart() {
      console.log('startt');
      this.state.pause ? null : this.props.prepareHandler ({pause:false})
      this.state.running ? null :
        this.props.prepareHandler ({
          clock: setInterval(()=>{
            this.props.prepareHandler({totalSeconds:this.state.totalSeconds - 1},
              ()=>{this.props.prepareHandler({
                clockMinutes: Math.floor(this.state.totalSeconds / 60)},
                  ()=>{this.props.prepareHandler({
                    clockSeconds: this.state.totalSeconds-(this.state.clockMinutes * 60)          
                  })     
                }
              )
            })
          },1000),
          running:true
        })
    }
    
    clickPause() {
      console.log('pause');
      clearInterval(this.state.clock);
      this.props.prepareHandler ({
        pause:true,
        running:false
      })
    } 
    
    clickReset() {
      console.log('stop');
      clearInterval(this.state.clock);
      this.state.working ? 
        this.props.prepareHandler ({
        running:false,
        totalSeconds:this.state.workDuration*60,
        clockMinutes:this.state.workDuration,
        clockSeconds:0
        }) : 
        this.props.prepareHandler ({
        running:false,
        totalSeconds:this.state.breakDuration*60,      
        clockMinutes:this.state.breakDuration,
        clockSeconds:0
        })
    }
    
    setWorkTime(e) {
      switch(e) {
        case "+":
          this.props.prepareHandler ({
            workDuration:this.state.workDuration+1
          },()=>{ 
            if (!this.state.running && this.state.working && !this.state.pause) {
              this.props.prepareHandler ({
                clockMinutes:this.state.clockMinutes+1,
                totalSeconds:this.state.workDuration*60
              })  
            }
            }
          );
          break;
        
        case "-":
          this.state.workDuration<2 ? null :
          this.props.prepareHandler ({
            workDuration:this.state.workDuration-1
          },()=>{
            if (!this.state.running && this.state.working && !this.state.pause) {
              this.props.prepareHandler ({
                clockMinutes:this.state.clockMinutes-1,
                totalSeconds:this.state.workDuration*60
              })
            }
            }
          );
          break;
      }
    }
    
    setBreakTime(e) {
      switch(e) {
        
        case "+":
          this.props.prepareHandler ({
            breakDuration:this.state.breakDuration+1
          },()=>{
            if (!this.state.running && !this.state.working && !this.state.pause) {
              this.props.prepareHandler ({
                clockMinutes:this.state.clockMinutes+1,
                totalSeconds:(this.state.breakDuration+1)*60
              })}
            }
          );
          break;
        
        case "-":
          this.state.breakDuration<2 ? null :
          this.props.prepareHandler ({
            breakDuration:this.state.breakDuration-1
          },()=>{
            if (!this.state.running && !this.state.working && !this.state.pause) {
              this.props.prepareHandler ({
                clockMinutes:this.state.clockMinutes-1,
                totalSeconds:this.state.breakDuration*60
              })}
            }
          );
          break;
      }
    }
    
    render() {
      return (
        <div>
        <div class={"App"}>
          <ClockDisplayer clockMinutes={this.state.clockMinutes} clockSeconds={this.state.clockSeconds}/>
          <div class={"startPauseReset"}>
            <button onClick={(e)=>this.clickStart(e)}>{`Start`}</button>
            <button onClick={(e)=>this.clickPause(e)}>{`Pause`}</button>
            <button onClick={(e)=>this.clickReset(e)}>{`Reset`}</button>
          </div>
          <div class={"plusandminus"}>
            <ClockSetter 
              timeSetterLabel="Working time"
              handleClickMinus={()=>this.setWorkTime("-")}
              handleClickPlus={()=>this.setWorkTime("+")}
              durationSetting={this.state.workDuration} />
            <ClockSetter 
              timeSetterLabel="Break"
              handleClickPlus={()=>this.setBreakTime("+")}
              handleClickMinus={()=>this.setBreakTime("-")}
              durationSetting={this.state.breakDuration} />
          </div>
        </div>
        </div>)  
    }//render
  }
  



ReactDOM.render(<App />, document.querySelector("#timer"));
