import { cloneElement, Component } from "react";
import "./menu.style.scss"

class Menu extends Component {
    
    constructor() {
        super();
        
        this.state = {
            active: 'timers'
        }
    }
    items = [
            {
                id: 'timers',
                name: 'Timers',
                url: '/'
            },
            {
                id: 'menu1',
                name: 'Menu 1',
                url: '/'
            },
            {
                id: 'menu2',
                name: 'Menu 2',
                url: '/'
            }
        ];
    
    resetStorage = () => {
        localStorage.clear();
    }
    render() {
        const { active } = this.state;
        const { items, resetStorage } = this;
        return (
          <div className={'menu-container'}>
              <a className={"menu-item menu-logo"} href={"/"} >REACT</a>
              {
                  items.map((item) => {
                      const { id, name, url } = item;
                      if (active === id) {
                          return <div className={"menu-item menu-link active"} key={id}>
                              { name }
                          </div>
                      } else {
                          return <a className={"menu-item menu-link"} href={url} key={id} data-id={id}>
                              { name }
                          </a>
                      }
                      
                  })
              }
          </div>
        )
    }
}

export default Menu;