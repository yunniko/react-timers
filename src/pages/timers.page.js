import { Component } from "react";
import TimerList from "../components/timer-list/timer-list.component";
import TimerReduce from "../components/timer-reduce/timer-reduce.component";

class TimersPage extends Component {
    timers = [];
    constructor(props) {
        super(props);
        
        this.timers = this.getTimers();
        this.state = this.getSavedState();
        console.log(this.state);
    }
    
    getReduces() {
        let reduces = [];
        [3,15].forEach((item) => {
            reduces.push({
                id: item,
                on: false
            });
        })
        return reduces;
    }
    
    getTimers() {
        const timers = [
            {
                name: 'Spider',
                duration: 30
            },
            {
                name: 'Werewolf',
                duration: 60
            },
            {
                name: 'Beetle',
                duration: 24 * 60
            },
            {
                name: 'Krab',
                duration: 36 * 60
            },
            {
                name: 'Tunnel Bear',
                duration: 48 * 60
            },
            {
                name: 'Snail',
                duration: 96 * 60
            },
        ];
        
        timers.forEach((timer, index) => {
            timer.id = timer.id ?? index;
            timer.duration *= 60000;
        })
        return timers;
    }
    saveState(state) {
        window.localStorage.setItem("state", JSON.stringify(state));
    }
    getSavedState() {
        let state = window.localStorage.getItem("state");
        if (state) {
            state = JSON.parse(state);
        } else {
            state = {
                starts: [],
                reduces: this.getReduces()
            }
        }
        return state;
    }
    
    timeleft = (start, duration, reduces) => {
        const { getReducedDuration } = this;
        const now = Date.now();
        duration = getReducedDuration(duration, reduces);
        return duration - (now - start);
    }
    
    changeStartTimerState = (id, value) => {
        const { starts } = this.state;
        let newStarts = starts.filter((start) => {
            return start.id !== id;
        }) || [];
        if (value !== 0) {
            newStarts.push({
                id: id,
                start: value
            })
        }
        this.setState({
            starts: newStarts
        }, () => {
            this.saveState(this.state);
        });
        
    }
    
    changeReduce(id, value) {
        const { reduces } = this.state;
        const newReduces = [...reduces];
        newReduces.forEach((reduce) => {
            if (reduce.id.toString() === id.toString()) {
                reduce.on = !!value;
            }
        });
        this.setState({
            reduces: newReduces
        }, () => {
            this.saveState(this.state);
        });
        
    }
    
    onStart = (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        this.changeStartTimerState(id, Date.now());
    }
    
    onReset = (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        this.changeStartTimerState(id, 0);
    }
    onReduceChange = (e) => {
        const id = e.target.getAttribute('data-id');
        this.changeReduce(id, e.target.checked);
    }
    getReducedDuration(duration, reduces) {
        let reducePercent = 0;
        if (reduces) {
            reduces.forEach((item) => {
                if (item.on) {
                    reducePercent += item.id;
                }
            })
            return duration * ((100 - reducePercent) / 100);
        }
        return duration;
    }
    
    componentDidMount() {
        setInterval(() => {
            const { starts } = this.state;
            if (starts.length > 0) {
                this.setState(this.state);
            }
        }, 1000);
    }
    
    render() {
        const { starts, reduces } = this.state;
        const { timers,onStart, onReset, onReduceChange, getReducedDuration, timeleft } = this;
        const timersForRender = [];
        timers.forEach((timer) => {
            const newTimer = {...timer};
            const startForTimer = starts.find((start) => {
                return start.id === timer.id;
            })
            newTimer.start = startForTimer?.start || 0;
            newTimer.duration = getReducedDuration(timer.duration, reduces);
            newTimer.timeleft = timeleft(newTimer.start, newTimer.duration, reduces);
            timersForRender.push(newTimer);
        })
        console.log(timersForRender);
        return (
          <div>
              <TimerReduce reduces={reduces} onChange={onReduceChange} />
              <TimerList timers={timersForRender} onStart={onStart} onReset={onReset} />
          </div>
        )
    }
}

export default TimersPage;
