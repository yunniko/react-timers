import { Component } from "react";
import TimerList from "../components/timer-list/timer-list.component";

class TimersPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            timers: this.getTimers()
        }
    }
    
    getTimers() {
        let timers = window.localStorage.getItem("globalTimers");
        timers = JSON.parse(timers);
        console.log(timers);
        if (!timers || !timers.length || timers.length < 1) {
            timers = [
                {
                    name: 'Test 1',
                    duration: 0.5
                },
                {
                    name: 'Test 2',
                    duration: 1
                },
                {
                    name: 'Test 3',
                    duration: 3
                },
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
        }
        
        timers.forEach((timer, index) => {
            timer.id = timer.id ?? index;
            timer.duration *= 60000;
            timer.start = timer.start ?? 0;
            timer.timeleft = timer.timeleft ?? this.timeleft(timer.start, timer.duration);
        })
        return timers;
    }
    saveState() {
        const { timers } = this.state;
        let objectsForSave = [];
        for (let timer of timers) {
            const {id,name,start,duration } = timer;
            objectsForSave.push({
                id,
                name,
                duration: duration / 60000,
                start
            });
        }
        window.localStorage.setItem("globalTimers", JSON.stringify(objectsForSave));
    }
    
    timeleft(start, duration) {
        const now = Date.now();
        return duration - (now - start);
    }
    
    changeStartTimerState = (id, value) => {
        const { timeleft } = this;
        const { timers } = this.state;
        const newTimers = [...timers];
        newTimers.forEach((timer) => {
            if (timer.id.toString() === id.toString()) {
                timer.start = value
                timer.timeleft = timeleft(value, timer.duration);
            }
        });
        this.setState({
            timers: newTimers
        });
        this.saveState();
    }
    
    onStart = (e) => {
        const id = e.target.getAttribute('data-id');
        this.changeStartTimerState(id, Date.now());
    }
    
    onReset = (e) => {
        const id = e.target.getAttribute('data-id');
        this.changeStartTimerState(id, 0);
    }
    
    componentDidMount() {
        setInterval(() => {
            const { timers } = this.state;
            const { timeleft } = this;
            timers.forEach((timer) => {
                if (timer.start > 0) {
                    timer.timeleft = timeleft(timer.start, timer.duration);
                }
            });
            this.setState(timers);
        }, 1000);
    }
    
    render() {
        const { timers } = this.state;
        const { onStart, onReset } = this;
        return (
           <TimerList timers={timers} onStart={onStart} onReset={onReset}/>
        )
    }
}

export default TimersPage;
