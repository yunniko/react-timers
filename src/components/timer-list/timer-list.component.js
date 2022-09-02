import { cloneElement, Component, Fragment } from "react";
import Timer from "../timer/timer.component";
import "./timer-list.style.scss"

class TimerList extends Component {
    
    
    render() {
        const { timers, onStart, onReset } = this.props;
        let list;
        if (timers && timers.length > 0) {
            list = <Fragment>
                {
                    timers.map((timer) => {
                        const { id } = timer;
                        return <Timer className={"timer-item"} timer={timer} key={id} onStart={onStart} onReset={onReset}></Timer>
                    })
                }
            </Fragment>
        } else {
            list = <div class={'no-result'}>No result</div>
        }
        return (
          <div className={'timer-list'}>
              { list }
          </div>
        )
    }
}

export default TimerList;