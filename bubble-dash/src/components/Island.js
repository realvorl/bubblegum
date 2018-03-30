import React, {Component} from 'react';
import Street from "./Street";
// ES6
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

class Island extends Component {

    render() {
        let stages;
        let _this = this.props.layout;
        if (_this) {
            stages = _this.lookups.map(entry => {
                //console.log(entry);
                return (
                    <Street key={entry.domain + entry.additional + entry.path} stage={entry.additional}
                            domain={entry.domain} path={entry.path} linkClass="_blue"/>
                );
            });
        }
        return (
            <Draggable>
                <div className="island">
                    <p className="island-name">{_this.title}</p>
                    {stages}
                </div>
            </Draggable>
        );
    }
}

export default Island;
