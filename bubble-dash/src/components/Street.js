import React, {Component} from 'react';

class Street extends Component {

    constructor(props) {
        super(props);
        if (!props.styleUpdate) {
            this.state = {linkClass: "_blue"};
        }

    }

    componentDidMount() {
        let _this = this.props;
        fetch("/check?domain=" + encodeURIComponent(_this.domain) + "&path=" + encodeURIComponent(_this.path) + "&port=80")
            .then(response => {/*console.log(response);*/
                this.setState({linkClass: "_" + response.status})
            })
            .catch(exeption => {
                console.warn("oops:", exeption)
            })
    }

    render() {
        // <Street stage={entry.additional} domain={entry.domain} path={entry.path}/>
        let _this = this.props;
        //console.log("Street", _this);

        return (
            <div className="street">
                <a href={"https://" + _this.domain + "/" + _this.path} target="_blank"
                    className={this.state.linkClass}/>
                <span className="path">{_this.path}</span>
                <span className="domain">{_this.domain}</span>
                <span className="stage">{_this.stage}</span>
            </div>
        );
    }
}

export default Street;
