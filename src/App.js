import { Component } from "react";
import TimersPage from "./pages/timers.page";
import Menu from "./components/menu/menu.component";

class App extends Component {
    
    render() {
        return  <div>
            <Menu />
            <div className={"container"}>
                <TimersPage />
            </div>
        </div>
        
    }
}

export default App;
