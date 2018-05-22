import React, {Component} from 'react';
import ToolBar from "./ToolBar";

class StyleComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            styleUpdate: false,
            style: {
                backgroundColor: "#444",
                color: "#f1f1f1",
                fontSize: "20px"
            }
        }
        this.changeBackground = this.changeBackground.bind(this);
        this.changeTextColor = this.changeTextColor.bind(this);
        this.incTextSize = this.incTextSize.bind(this);
        this.decTextSize = this.decTextSize.bind(this);

    }

    render() {
      return (
          <ToolBar
              changeBackground={this.changeBackground}
              changeTextColor={this.changeTextColor}
              incTextSize={this.incTextSize}
              decTextSize={this.decTextSize}
          />
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
        console.log(this);
        this.setState({style: newStyle, styleUpdate: true});
        e.stopPropagation();
    }

    changeTextColor(e) {
        let oldStyle = this.cloneObject(this.state.style);
        const newStyle = Object.assign(oldStyle, {color: e.target.value});
        console.log(this);
        this.setState({style: newStyle, styleUpdate: true});
        e.stopPropagation();
    }

    incTextSize(e) {
        let oldStyle = this.cloneObject(this.state.style);
        console.log("fontSize",oldStyle.fontSize);
        let size;
        if (oldStyle.fontSize === undefined) {
            size = 20
        } else {
            size = parseInt(oldStyle.fontSize.split("px")[0])
        }
        const newStyle = Object.assign(oldStyle, {fontSize: (size+2)+"px"});
        console.log(this);
        this.setState({style: newStyle, styleUpdate: true});
        e.stopPropagation();
    }

    decTextSize(e) {
        let oldStyle = this.cloneObject(this.state.style);
        let size ;
        if (oldStyle.fontSize === undefined) {
            size = 20
        } else {
            size = parseInt(oldStyle.fontSize.split("px")[0]);
        }
        const newStyle = Object.assign(oldStyle, {fontSize: (size-2)+"px"});
        console.log(this);
        this.setState({style: newStyle, styleUpdate: true});
        e.stopPropagation();
    }

    styleUpdate() {
        return this.state.styleUpdate;
    }
}

export default StyleComponent;
