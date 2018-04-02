import React, {Component} from 'react';
import Street from "./Street";
// ES6
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

class Island extends Component {

    constructor(props) {
        super(props);
        this.state = {time: 0};
    }

    update() {
        this.setState({time: Date.now()});
        this.render();
    }

    componentDidMount() {
        let seconds = this.props.refresh >= 15 ? this.props.refresh : 15;
        setInterval(() => this.update(), seconds * 1000);
    }

    render() {
        let stages;
        let _this = this.props.layout;
        if (_this) {
            stages = _this.lookups.map(entry => {
                //console.log(entry);
                return (
                    <Street key={this.state.time++} stage={entry.additional}
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
