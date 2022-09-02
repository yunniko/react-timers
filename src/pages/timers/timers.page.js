import { Component } from "react";
import TimerList from "../../components/timer-list/timer-list.component";
import TimerReduce from "../../components/timer-reduce/timer-reduce.component";
import "./timers-page.style.scss"

class TimersPage extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = this.getSavedState();
        this.timers = this.getTimers();
        this.timersNoReduce = this.getTimersNoReduce();
    }
    
    // init
    
    timers = [];
    timersNoReduce = [];
    reduce = 0;
    
    /**
     * Hardcoded timers list
     * @returns {[{duration: number, name: string},{duration: number, name: string},{duration: number, name: string},{duration: number, name: string},{duration: number, name: string},null]}
     */
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
    /**
     * Hardcoded timers list
     * @returns {[{duration: number, name: string},{duration: number, name: string},{duration: number, name: string},{duration: number, name: string},{duration: number, name: string},null]}
     */
    getTimersNoReduce() {
        const timers = [];
        
        timers.forEach((timer, index) => {
            timer.id = timer.id ?? (index + 100) ;
            timer.duration *= 60000;
        })
        return timers;
    }

    //state operations. TODO: make storage saver
    /**
     * @param state
     */
    saveState(state) {
        window.localStorage.setItem("state", JSON.stringify(state));
    }
    
    /**
     * Returns saved to local storage or new state
     * @returns {any}
     */
    getSavedState() {
        let state = window.localStorage.getItem("state");
        const initialState = {
            starts: [],
            reduce: 0
        }
        if (state) {
            state = JSON.parse(state);
            Object.keys(initialState).forEach((key) => {
                if (state[key] === undefined) {
                    state[key] = initialState[key];
                }
            })
        } else {
            state = initialState;
        }
        return state;
    }
    
    //event handlers
    
    onStart = (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        this.changeStartTimerState(id, Date.now());
    }
    
    onReset = (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        this.changeStartTimerState(id, 0);
    }
    
    // event handlers helpers
    /**
     * Turns on or off a timer by id
     * @param id
     * @param value
     */
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
    
    /**
     * Turns on or off reduce by id
     * @param id
     * @param value
     */
    changeReduce = (value) => {
        if (!value) {
            value = '0';
        }
        this.setState({
            reduce: parseInt(value)
        }, () => {
            this.saveState(this.state);
        });
        
    }
    
    // data for render
    /**
     * @returns {*[]}
     */
    getTimersForRender = () => {
        const { starts } = this.state;
        const { timers, getReducedDuration, timeleft } = this;
        const timersForRender = [];
        timers.forEach((timer) => {
            const newTimer = {...timer};
            const startForTimer = starts.find((start) => {
                return start.id === timer.id;
            })
            newTimer.start = startForTimer?.start || 0;
            newTimer.duration = getReducedDuration(timer.duration);
            newTimer.timeleft = timeleft(newTimer.start, newTimer.duration);
            timersForRender.push(newTimer);
        })
        return timersForRender;
    }
    
    // data for render
    /**
     * @returns {*[]}
     */
    getNoReducedTimersForRender = () => {
        const { starts } = this.state;
        const { timersNoReduce, timeleft } = this;
        const timersForRender = [];
        timersNoReduce.forEach((timer) => {
            const newTimer = {...timer};
            const startForTimer = starts.find((start) => {
                return start.id === timer.id;
            })
            newTimer.start = startForTimer?.start || 0;
            newTimer.duration = timer.duration;
            newTimer.timeleft = timeleft(newTimer.start, newTimer.duration);
            timersForRender.push(newTimer);
        })
        return timersForRender;
    }
    
    //helpers
    /**
     * in milliseconds
     * @param start
     * @param duration
     * @returns {number}
     */
    timeleft = (start, duration) => {
        const { getReducedDuration } = this;
        const now = Date.now();
        duration = getReducedDuration(duration);
        return duration - (now - start);
    }
    
    /**
     * in milliseconds
     * @param duration
     * @returns {number|*}
     */
    getReducedDuration = (duration) => {
        const { reduce } = this.state;
        if (reduce > 0) {
            return duration * ((100 - reduce) / 100);
        }
        return duration;
    }
    
    //render and update
    
    componentDidMount() {
        setInterval(() => {
            const { starts } = this.state;
            if (starts.length > 0) {
                this.setState(this.state);
            }
        }, 1000);
    }
    
    render() {
        const { onStart, onReset, changeReduce, getTimersForRender, getNoReducedTimersForRender } = this;
        const { reduce } = this.state;
        const timersNoReduceForRender = getNoReducedTimersForRender();
        const timersForRender = getTimersForRender();
        return (
          <div>
              <TimerReduce reduce={reduce} changeReduce={changeReduce} />
              <TimerList timers={timersForRender} onStart={onStart} onReset={onReset} />
              <hr/>
              <TimerList timers={timersNoReduceForRender} onStart={onStart} onReset={onReset} />
          </div>
        )
    }
}

export default TimersPage;
