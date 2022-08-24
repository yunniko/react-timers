import { cloneElement, Component } from "react";
import "./timer-reduce.style.scss"

class TimerReduce extends Component {
    
    
    render() {
        const { reduces, onChange } = this.props;
        return (
          <div className={'timer-reduces'}>
              {
                  reduces.map((reduce) => {
                      const { id } = reduce;
                      return <div key={id} className={'reduce-item'}>
                          <input type={"checkbox"} data-id={ id } onChange={ onChange } id={'reduce-' + id}/>
                          <label htmlFor={'reduce-' + id}>Reduce time for { id }%</label>
                      </div>
                  })
              }
          </div>
        )
    }
}

export default TimerReduce;