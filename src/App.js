import React, {Component} from "react";
import Map from "./app/components/map/Map";
import MapForm from './app/components/form/MapForm';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEFAULT_RADIUS, DEFAULT_TOKEN, userString} from "./constants";
import {fetchScore} from "./app/api/fetchScore";
import './App.module.css';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: DEFAULT_LATITUDE,
            longitude: DEFAULT_LONGITUDE,
            radius: DEFAULT_RADIUS,
            token: DEFAULT_TOKEN,
            score: '0.0',
        };
    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});

    }

    async handleSubmit(e) {
        let vm = this;
        e.preventDefault();
        const data = await fetchScore({
            lat: vm.state.latitude,
            long: vm.state.long,
            radius: vm.state.radius,
        }, vm.state.token);
        vm.setState({score: data});
    }

    async componentDidMount() {
                await fetch('http://35.200.193.2:3000/login', {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "username": userString
                    })
                }).then((data) => data.json())
                    .then(data => {
                        this.setState({token: data});
                    });
    }

  render () {
    return (
        <div className="container">
          <div className="formContainer">
              <MapForm
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  longitude={this.state.longitude}
                  latitude={this.state.latitude}
                  radius={this.state.radius}
              />
          </div>
            <div  className="mapContainer">
                <Map
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    radius={this.state.radius}
                    token={this.state.token}
                    score={this.state.score}
                />
            </div>
        </div>
    )
  }
}