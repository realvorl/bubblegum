import React, {Component} from 'react';

class Street extends Component {
    render() {
        // <Street stage={entry.additional} domain={entry.domain} path={entry.path}/>
        let _this = this.props;
        return (
            <div className="street">
                <span className="stage">{_this.stage}</span>
                <span className="domain">{_this.domain}</span>
                <span className="path">{_this.path}</span>
                <a href={"https://"+_this.domain+"/"+_this.path} target="_blank" className="status"/>
            </div>
        );
    }
}

export default Street;
