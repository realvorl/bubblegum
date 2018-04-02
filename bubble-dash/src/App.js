import React, {Component} from 'react';
import Islands from './components/Islands'
import Header from './components/Header'
import './App.css'
import jsonConfig from './stateAndHost.json'

class App extends Component {


    constructor() {
        super();
        this.state = jsonConfig;
    }

    render() {
        return (
            <div className="App">
                <Header headerTitle={this.state.header.mainTitle} refresh={this.state.header.refresh} buttonLabel={this.state.header.buttonLabel}/>
                <Islands allIslands={this.state.islands} refresh={this.state.header.refresh} />
            </div>
        );
    }
}

export default App;
