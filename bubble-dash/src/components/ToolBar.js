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
                <input type="color" className="cTextColor" onChange={this.props.changeTextColor}/>
            </div>
        );
    }
}

export default ToolBar;
