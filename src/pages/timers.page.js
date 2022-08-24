import { Component } from "react";
import TimerList from "../components/timer-list/timer-list.component";
import TimerReduce from "../components/timer-reduce/timer-reduce.component";

class TimersPage extends Component {
    constructor(props) {
        super(props);
        
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
            timer.start = timer.start ?? 0;
            timer.timeleft = timer.timeleft ?? this.timeleft(timer.start, timer.duration);
        })
        return timers;
    }
    saveState(state) {
        console.log(state);
        window.localStorage.setItem("state", JSON.stringify(state));
    }
    getSavedState() {
        let state = window.localStorage.getItem("state");
        if (state) {
            state = JSON.parse(state);
        } else {
            state = {
                timers: this.getTimers(),
                reduces: this.getReduces()
            }
        }

        state.timers.forEach((timer, index) => {
            timer.timeleft = this.timeleft(timer.start, timer.duration, state.reduces);
        })
        return state;
    }
    
    timeleft = (start, duration, reduces) => {
        const { getReducedDuration } = this;
        const now = Date.now();
        duration = getReducedDuration(duration, reduces);
        return duration - (now - start);
    }
    
    changeStartTimerState = (id, value) => {
        const { timeleft } = this;
        const { timers, reduces } = this.state;
        const newTimers = [...timers];
        newTimers.forEach((timer) => {
            if (timer.id.toString() === id.toString()) {
                timer.start = value
                timer.timeleft = timeleft(value, timer.duration, reduces);
            }
        });
        this.setState({
            timers: newTimers
        });
        this.saveState(this.state);
    }
    
    changeReduce(id, value) {
        const { timers, reduces } = this.state;
        const { timeleft } = this;
        const newReduces = [...reduces];
        const newTimers = [...timers];
        newReduces.forEach((reduce) => {
            if (reduce.id.toString() === id.toString()) {
                reduce.on = !!value;
            }
        });
        newTimers.forEach((timer) => {
            if (timer.start > 0) {
                timer.timeleft = timeleft(timer.start, timer.duration, newReduces);
            }
        });
        this.setState({
            reduces: newReduces,
            timers: newTimers
        });
        this.saveState(this.state);
    }
    
    onStart = (e) => {
        const id = e.target.getAttribute('data-id');
        this.changeStartTimerState(id, Date.now());
    }
    
    onReset = (e) => {
        const id = e.target.getAttribute('data-id');
        this.changeStartTimerState(id, 0);
    }
    onReduceChange = (e) => {
        const id = e.target.getAttribute('data-id');
        this.changeReduce(id, e.target.checked);
    }
    getReducedDuration(duration, reduces) {
        let reducePercent = 0;
        reduces.forEach((item) => {
            if (item.on) {
                reducePercent += item.id;
            }
        })
        return duration * ((100 - reducePercent) / 100);
    }
    
    componentDidMount() {
        setInterval(() => {
            const { timers, reduces } = this.state;
            const { timeleft } = this;
            const newTimers = [...timers];
            newTimers.forEach((timer) => {
                if (timer.start > 0) {
                    timer.timeleft = timeleft(timer.start, timer.duration, reduces);
                }
            });
            this.setState({
                timers: newTimers
            });
        }, 1000);
    }
    
    render() {
        const { timers, reduces } = this.state;
        const { onStart, onReset, onReduceChange, getReducedDuration } = this;
        const timersWithReduce = [];
        timers.forEach((item) => {
            const newItem = {...item};
            newItem.duration = getReducedDuration(item.duration, reduces);
            timersWithReduce.push(newItem);
        })
        return (
          <div>
              <TimerReduce reduces={reduces} onChange={onReduceChange} />
              <TimerList timers={timersWithReduce} onStart={onStart} onReset={onReset} />
          </div>
          
        )
    }
}

export default TimersPage;
