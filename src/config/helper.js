import axios from 'axios';

export const getWeather = (city) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://api.apixu.com/v1/current.json?key=17a79ca8260f4d46805111508180110&q=${city}`)
            .then(res =>  resolve(res.data))
            .catch(err => reject("*Something went wrong"))
    })
}