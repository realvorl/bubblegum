import React, {Component} from 'react';
import Island from './Island'

class Islands extends Component {


    render() {

        let islands;

        if (this.props.allIslands) {
            let count = 0;
            islands = this.props.allIslands.map(island => {
                //console.log(island);
                return (
                    <Island key={island.title} layout={island} refresh={this.props.refresh} ileNo={count++}/>
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
