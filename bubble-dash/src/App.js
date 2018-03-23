import React, {Component} from 'react';
import Islands from './components/Islands'
import Header from './components/Header'
import './App.css';
class App extends Component {

    constructor() {
        super();
        this.state = {
            header: {
                mainTitle: "BUBBLE-GUM",
                buttonLabel: "* * *"
            },
            islands: [{
                title: "Island: google",
                lookups: [{
                    title: "Google",
                    additional: "DE",
                    domain: "google.de",
                    path: ""
                }, {
                    title: "Google",
                    additional: "AT",
                    domain: "google.at",
                    path: ""
                }, {
                    title: "Google",
                    additional: "RO",
                    domain: "google.ro",
                    path: ""
                }]
            }, {
                title: "Island: Amazon",
                lookups: [{
                    title: "Amazon",
                    additional: "DE",
                    domain: "amazon.de",
                    path: ""
                }, {
                    title: "Amazon",
                    additional: "AT",
                    domain: "amazon.at",
                    path: ""
                }, {
                    title: "Amazon",
                    additional: "RO",
                    domain: "amazon.ro",
                    path: ""
                }]
            }, {
                title: "Island: 9GAG",
                lookups: [{
                    title: "9GAG",
                    additional: "DE",
                    domain: "9gag.com",
                    path: ""
                }, {
                    title: "9GAG",
                    additional: "Trending",
                    domain: "9gag.com",
                    path: "/trending"
                }]
            }]
        }
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
