import { Component } from "react";

class Timer extends Component {
    getNiceTime(ts) {
        ts = Math.round(ts / 1000);
        let s, m, h;
        h = Math.floor(ts / 3600);
        ts = ts - (h * 3600);
        m = Math.floor(ts / 60);
        s = ts - (m * 60);
        return [h, m, s].map((val) => {
            return val.toString().padStart(2, '0')
        }).join(':');
    }
    
    render() {
        const { timer, onStart, onReset } = this.props;
        const { id, name, duration, start, timeleft } = timer;
        const { getNiceTime } = this;
        let content;
        if (start === 0) {
            content = <div>
                <p>Duration {getNiceTime(duration)}</p>
                <button data-id={id} onClick={onStart}>Start</button>
            </div>
        } else {
            let timerText;
            if (timeleft > 0) {
                timerText = <p>{getNiceTime(timeleft)} left</p>
            } else {
                timerText = <p>Expired {getNiceTime(Math.abs(timeleft))} ago</p>
            }
            content = <div>
                {timerText}
                <button data-id={id} onClick={onReset}>Reset</button>
            </div>
        }
        
        return <div>
            <h1>{name}</h1>
            
            {content}
        </div>
    }
}

export default Timer;