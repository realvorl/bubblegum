import React, {Component} from 'react';

class Header extends Component {

    componentDidMount () {
        this.setState({timestampH: new Date()});
    }

    render() {
        return (
            <div className="App-header">
                <h1 className="hit-the-floor">{this.props.headerTitle}</h1>
                <button value="{this.props.buttonLabel}" onClick={this.forceUpdate}>{this.props.buttonLabel}</button>
            </div>
        );
    }
}

export default Header;
