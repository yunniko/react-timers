import { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
    render() {
        const { items } = this.props;
        return <div>
            {
                items.map((item) => {
                    const {id, url, name} = item;
                    return <Link className={'btn'} to={ url } key={id}>{ name }</Link>
                })
            }
        </div>
    }
}

export default HomePage