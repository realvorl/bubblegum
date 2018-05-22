import React, {Component} from 'react';
import Street from "./Street";
import ToolBar from "./ToolBar"
// ES6
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

function cloneObject(obj) {
    var clone = {};
    for (var i in obj) {
        if (typeof(obj[i]) == "object" && obj[i] != null)
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}


var oldFetch = new Map();

class Island extends Component {

    constructor(props) {
        super(props);
        console.log("islandProps",props);
        this.state = {
            time: 0,
            styleUpdate: false,
            style: {
                backgroundColor: "#444",
                color: "#f1f1f1"
            },
        };
        this.changeBackground = this.changeBackground.bind(this);
        this.changeTextColor = this.changeTextColor.bind(this);
    }

    update() {
        this.setState({time: Date.now(), styleUpdate:false});
        this.render();
    }

    componentDidMount() {
        let seconds = this.props.refresh >= 15 ? this.props.refresh : 15;
        setInterval(() => this.update(), seconds * 1000);
    }



    render() {
        let stages;
        let _this = this.props.layout;
        let _thisKey = this.props.key;

        if (this.state.styleUpdate === false) {
            stages = _this.lookups.map(entry => {
                //console.log(entry);
                return (
                    <Street key={this.state.time++} stage={entry.additional}
                            styleUpdate={this.state.styleUpdate}
                            domain={entry.domain} path={entry.path} />
                );
            });
            console.log(this.state.styleUpdate,this.props.ileNo);
            oldFetch.set(this.props.ileNo, stages);

        } else {
            console.log(this.state.styleUpdate,this.props.ileNo);
            stages = oldFetch.get(this.props.ileNo);
        }
        return (
            <Draggable>
                <div className="island" style={this.state.style}>
                    <ToolBar changeBackground={this.changeBackground} changeTextColor={this.changeTextColor}/>
                    <p className="island-name">{_this.title}</p>
                    {stages}
                </div>
            </Draggable>
        );
    }

    changeBackground(e) {
        let oldStyle = cloneObject(this.state.style);
        const newStyle = Object.assign(oldStyle, {backgroundColor: e.target.value});
        //console.log(newStyle);
        this.setState({style: newStyle, styleUpdate: true});
        e.stopPropagation();
    }

    changeTextColor(e) {
        let oldStyle = cloneObject(this.state.style);
        const newStyle = Object.assign(oldStyle, {color: e.target.value});
        //console.log(newStyle);
        this.setState({style: newStyle, styleUpdate: true});
        e.stopPropagation();
    }
}

export default Island;
