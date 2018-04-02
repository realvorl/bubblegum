import React, {Component} from 'react';

class Header extends Component {

    render() {
        return (
            <div className="App-header">
                <h1 className="hit-the-floor">{this.props.headerTitle}</h1>
                <span className="stage">Refresh every</span>
                <input type="text" className="small" maxLength="3" value={this.props.refresh} readOnly={true}/>
                <span className="stage">seconds</span>
            </div>
        );
    }
}

export default Header;
