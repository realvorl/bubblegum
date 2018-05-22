import React, {Component} from 'react';
import Islands from './components/Islands'
import Header from './components/Header'
import jsonConfig from './stateAndHost.json'

import './App.css'
import StyleComponent from "./components/StyleComponent";

class App extends StyleComponent {

    constructor(props) {
        super(props);
        this.state = jsonConfig;
    }

    render() {
        return (
            <div className="App" style={this.state.style}>
                <Header style={this.state.style}
                        headerTitle={this.state.header.mainTitle}
                        refresh={this.state.header.refresh}
                        buttonLabel={this.state.header.buttonLabel}/>
                <Islands fw={this.state.styleUpdate}
                         style={this.state.style}
                         allIslands={this.state.islands}
                         refresh={this.state.header.refresh}/>
            </div>
        );
    }

}

export default App;
