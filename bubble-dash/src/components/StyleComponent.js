import React, {Component} from 'react';
import ToolBar from "./ToolBar";

class StyleComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            styleUpdate: false,
            style: {
                backgroundColor: "#444",
                color: "#f1f1f1"
            }
        }
        this.changeBackground = this.changeBackground.bind(this);
        this.changeTextColor = this.changeTextColor.bind(this);

    }

    render() {
      return (
          <ToolBar changeBackground={this.changeBackground} changeTextColor={this.changeTextColor}/>
      )
    }

    cloneObject(obj) {
        var clone = {};
        for (var i in obj) {
            if (typeof(obj[i]) === "object" && obj[i] != null)
                clone[i] = this.cloneObject(obj[i]);
            else
                clone[i] = obj[i];
        }
        return clone;
    }

    changeBackground(e) {
        let oldStyle = this.cloneObject(this.state.style);
        const newStyle = Object.assign(oldStyle, {backgroundColor: e.target.value});
        //console.log(newStyle);
        this.setState({style: newStyle, styleUpdate: true});
        e.stopPropagation();
    }

    changeTextColor(e) {
        let oldStyle = this.cloneObject(this.state.style);
        const newStyle = Object.assign(oldStyle, {color: e.target.value});
        //console.log(newStyle);
        this.setState({style: newStyle, styleUpdate: true});
        e.stopPropagation();
    }
}

export default StyleComponent;
