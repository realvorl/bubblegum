import React, {Component} from 'react';

class ToolBar extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="customize">
                <input type="color" className="cBackground" onChange={this.props.changeBackground}/>
                <input type="color" className="cBackground" onChange={this.props.changeTextColor}/>
                <span className="cBackground" onClick={this.props.decTextSize}>-</span>
                <span className="cBackground" onClick={this.props.incTextSize}>+</span>
            </div>
        );
    }
}

export default ToolBar;
