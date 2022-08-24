import { Component } from "react";
import TimersPage from "./pages/timers.page";

class App extends Component {
    
    render() {
        return <div className={"container"}>
            <TimersPage />
        </div>
    }
}

export default App;
