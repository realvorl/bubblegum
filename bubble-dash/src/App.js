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
                <Header headerTitle={this.state.header.mainTitle} buttonLabel={this.state.header.buttonLabel}/>
                <Islands allIslands={this.state.islands}/>
            </div>
        );
    }
}

export default App;