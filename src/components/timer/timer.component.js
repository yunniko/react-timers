import { Component } from "react";
import "./timer.style.scss";

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
        const { timer, onStart, onReset, className } = this.props;
        const { id, name, duration, start, timeleft } = timer;
        const { getNiceTime } = this;
        const isExpiring = start > 0 && timeleft > 0 && timeleft < 60000;
        const isExpired = start > 0 && timeleft <= 0;
        const timerTimeClassName = 'timer-time';
        let content;
        if (start === 0) {
            content = <div>
                <p className={timerTimeClassName}>{getNiceTime(duration)}</p>
                <button className={'timer-control timer-start'} data-id={id} onClick={onStart}>Start</button>
            </div>
        } else {
            let timerText;
            if (timeleft > 0) {
                content = <div>
                    <p className={timerTimeClassName}>{getNiceTime(timeleft)}</p>
                    <button className={'timer-control timer-reset'} data-id={id} onClick={onReset}>Reset</button>
                </div>
            } else {
                content = <div>
                    <p className={timerTimeClassName}>Expired {getNiceTime(Math.abs(timeleft))} ago</p>
                    <button className={'timer-control timer-reset'} data-id={id} onClick={onReset}>Reset</button>
                    <button className={'timer-control timer-start'} data-id={id} onClick={onStart}>Restart</button>
                </div>
            }
            
        }
        
        return <div className={className + (isExpiring ? ' expiring' : '') + (isExpired ? ' expired' : '') + (!isExpired && !isExpiring && start > 0 ? ' active' : '')}>
            <h1>{name}</h1>
            {content}
        </div>
    }
}

export default Timer;