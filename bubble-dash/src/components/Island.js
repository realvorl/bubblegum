import React, {Component} from 'react';
import Street from "./Street";

class Island extends Component {
    render() {
        let stages;
        let _this = this.props.layout;
        if (_this) {
            stages = _this.lookups.map(entry => {
                console.log(entry);
                return (
                    <Street stage={entry.additional} domain={entry.domain} path={entry.path}/>
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
