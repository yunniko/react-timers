import { cloneElement, Component } from "react";
import "./timer-reduce.style.scss"

class TimerReduce extends Component {
    
    render() {
        const { reduce, changeReduce } = this.props;
        let minusButton, plusButton;
        if (reduce === 0) {
            minusButton = <span className={'reduce-control btn disabled'}>-</span>
        } else {
            const onMinusClick = (e) => {
                changeReduce(Math.max(0, reduce - 1));
            }
            minusButton = <span className={'reduce-control btn'} onClick={onMinusClick}>-</span>;
        }
        
        if (reduce === 99) {
            plusButton = <span className={'reduce-control btn disabled'}>+</span>
        } else {
            const onPlusCLick = (e) => {
                changeReduce(Math.min(99, reduce + 1));
            }
            plusButton = <span className={'reduce-control btn'} onClick={onPlusCLick}>+</span>
        }
        return (
          <div className={'timer-reduces'}>
              <div className={'reduce-item'}>
                  Reduce duration for
                  { minusButton }
                  <span id={'reduce'} className={'reduce-display-value'}> {reduce}% </span>
                  { plusButton }
              </div>
          </div>
        )
    }
}

export default TimerReduce;