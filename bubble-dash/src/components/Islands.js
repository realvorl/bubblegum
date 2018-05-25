import React, {Component} from 'react';
import Island from './Island'

class Islands extends Component {

    constructor(props) {
        console.log("Islands", props);
        super(props);
    }


    render() {

        let islands;

        if (this.props.allIslands) {
            let count = 0;
            islands = this.props.allIslands.map(island => {
                //console.log(island);
                return (
                    <Island key={island.title}
                            layout={island}
                            refresh={this.props.refresh}
                            fw={this.props.fw}
                            ileNo={count++}
                            style={this.props.style}/>
                );
            });
        }

        return (
            <div className="body-wrapper">
                {islands}
            </div>
        );
    }
}

export default Islands;
