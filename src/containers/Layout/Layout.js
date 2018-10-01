import React, {Component} from 'react';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import {getWeather} from '../../config/helper';
import './Layout.css';

class Layout extends Component{
    
    state = {
        input : '',
        weather : null,
        loading : false,
        error : ''
    }

    inputChangedHandler = (event) => {
        this.setState({input : event.target.value})
    }

    searchHandler = () => {
        if(this.state.input.trim() !== ''){
            this.setState({loading : true , error : '', weather: null})
            getWeather(this.state.input)
                .then(res => {
                    const {name, country, region} = res.location;
                    const {text} = res.current.condition;
                    const {feelslike_c, temp_c, humidity, wind_kph} = res.current;
                    this.setState({
                        weather : {...{name, country, region}, ...{text}, ...{feelslike_c, temp_c, humidity, wind_kph}},
                        input : '',
                        loading : false, 
                        error : ''
                    })
                })
                .catch(err => {
                    this.setState({loading : false, error : err})
                })    
        }
    }

    render(){
        let weatherDetails = null;
        if(this.state.weather){
            weatherDetails = (
                <div className = "output">
                    <p>City: <strong>{this.state.weather.name}</strong></p>
                    <p>Region: <strong>{this.state.weather.region}</strong></p>
                    <p>Country: <strong>{this.state.weather.country}</strong></p>
                    <p>Overall: <strong>{this.state.weather.text}</strong></p>
                    <p>Current Temperature: <strong>{this.state.weather.temp_c + " °C"}</strong></p>
                    <p>Feels Like: <strong>{this.state.weather.feelslike_c+ " °C"}</strong></p>
                    <p>Wind Speed: <strong>{this.state.weather.wind_kph.toFixed(2) + " Km/h"}</strong></p>
                    <p>Humidity: <strong>{this.state.weather.humidity + "%"}</strong></p>
                </div>
            )
        }
        const spinner = this.state.loading ? <Spinner/> : null;
        const error = this.state.error ? <p className = "error">{this.state.error}</p> : null
        return(
            <div>
                <h1 className="display-5 heading">Weather Report</h1>
                <Input 
                    className="form-control input-field" 
                    onChange = {(event) => this.inputChangedHandler(event)} 
                    placeholder = "Enter City..." 
                    value = {this.state.input}/>

                <Button 
                    clicked = {this.searchHandler} 
                    className = 'btn btn-primary  button'>Search</Button>
                {weatherDetails}
                {spinner}
                {error}
            </div>
        )
    }
}

export default Layout;
