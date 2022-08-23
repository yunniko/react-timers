import { cloneElement, Component } from "react";
import Timer from "../timer/timer.component";
import "./timer-list.style.scss"

class TimerList extends Component {
    
    
    render() {
        const { timers, onStart, onReset } = this.props;
        return (
          <div className={'timer-list'}>
              {
                  timers.map((timer) => {
                      const { id } = timer;
                      return <Timer className={"timer-item"} timer={timer} key={id} onStart={onStart} onReset={onReset}></Timer>
                  })
              }
          </div>
        )
    }
}

export default TimerList;