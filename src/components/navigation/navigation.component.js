import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./navigation.style.scss"
import { Outlet } from "react-router";
import logo2 from "../../assets/logo2.png" ;

class Navigation extends Component {
    active = '';
    items = [];
    constructor(props) {
        super(props);
        const {items} = props;
        this.items = items;
        
        console.log(props);
    }

    
    resetStorage = () => {
        localStorage.clear();
    }
    
    render() {
        const { active, items, resetStorage } = this;
        return (
          <Fragment>
              <div className={'menu-container'}>
                  <Link className={"menu-item menu-logo"} to={"/"} ><img src={logo2} alt={'Bee logo'} /></Link>
                  {
                      items.map((item) => {
                          const { id, name, url } = item;
                          const { active } = this;
                          
                          if (active === id) {
                              return <div className={"menu-item menu-link active"} key={id}>
                                  { name }
                              </div>
                          } else {
                              return <Link className={"menu-item menu-link"} to={url} key={id} data-id={id}>
                                  { name }
                              </Link>
                          }
                
                      })
                  }
              </div>
              <div className={"container"}>
                  <Outlet />
              </div>
          </Fragment>
          
        )
    }
}

export default Navigation;