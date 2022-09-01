import { Component } from "react";
import TimersPage from "./pages/timers/timers.page";
import HomePage from "./pages/home/home/home.page";

import Navigation from "./components/navigation/navigation.component";
import { Route, Routes} from "react-router";

class App extends Component {
    pages = [
        {
            id: 'timers',
            name: 'Timers',
            component: <TimersPage/>,
            url: 'timers'
        },
    ];
    
    render() {
        const { pages } = this;
        return  <Routes>
                    <Route element={<Navigation items={pages}/>} path={"/"}>
                        <Route element={<HomePage items={pages}/>} index />
                        {
                            pages.map((item) => {
                                const {component, url, id} = item;
                                return <Route key={id} element={ component } path={ url } />
                            })
                        }
                        
                    </Route>
                </Routes>
        
    }
}

export default App;
