import React, {Component} from 'react';
import Street from "./Street";
// ES6
import Draggable, {DraggableCore} from 'react-draggable';
import StyleComponent from "./StyleComponent"; // Both at the same time

var oldFetch = new Map();

class Island extends StyleComponent {

    constructor(props) {
        super(props);
        console.log("islandProps", props);
        this.state = {
            time: 0,
            styleUpdate: false,
            style: {
                backgroundColor: "#444",
                color: "#f1f1f1"
            },
        };
    }

    update() {
        this.setState({time: Date.now(), styleUpdate: false});
        this.render();
    }

    componentDidMount() {
        let seconds = this.props.refresh >= 15 ? this.props.refresh : 15;
        setInterval(() => this.update(), seconds * 1000);
    }


    render() {
        let styleCtrl = super.render();
        let stages;
        let _this = this.props.layout;

        if (this.state.styleUpdate === false ) {
            stages = _this.lookups.map(entry => {
                //console.log(entry);
                return (
                    <Street key={this.state.time++} stage={entry.additional}
                            styleUpdate={this.state.styleUpdate}
                            domain={entry.domain} path={entry.path}/>
                );
            });
            console.log(this.state.styleUpdate, this.props.ileNo);
            oldFetch.set(this.props.ileNo, stages);

        } else {
            console.log(this.state.styleUpdate, this.props.ileNo);
            stages = oldFetch.get(this.props.ileNo);
        }
        return (
            <Draggable>
                <div className="island" style={this.state.style}>
                    {styleCtrl}
                    <p className="island-name">{_this.title}</p>
                    {stages}
                </div>
            </Draggable>
        );
    }
}

export default Island;
