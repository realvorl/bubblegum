import React, {Component} from 'react';

class Island extends Component {
    render() {
        let stages;
        let _this = this.props.layout;
        if (_this) {
            stages = _this.lookups.map(entry => {
                console.log(entry);
                return (
                <span>{entry.additional}:: {entry.domain}/{entry.path}</span>
               );
            });
        }
        return (
            <div className="island">
                <p className="island-name">{_this.title}</p>
                {stages}
            </div>
        );
    }
}

export default Island;
