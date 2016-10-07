import {jsonp} from 'utils/index';
import {MILLISECONDS, MINUTES, WEATHER_SERVICE} from 'constants/index';

const _shouldUpdate = (timestamp) => {
    return Math.ceil((Date.now() - timestamp) / (MILLISECONDS * MINUTES)) > MINUTES;
};

const _parse = (weather) => {
    const result = _shouldUpdate(weather.timestamp) ? fetch(weather) : Promise.resolve(weather);
    return result.then(newWeather => ({timestamp: Date.now(), ...newWeather, name: weather.name}) );
};

const _handlerError = (error) => {
    console.log('request fail ', error);
};

export const fetch = ({latitude, longitude}) => {
    return jsonp(`${WEATHER_SERVICE}/${ latitude },${ longitude }?units=si`)
};

export const fetchAll = (weathers) => {
    return Promise.all(weathers.map(_parse));
};

export const getWeather = ({name, latitude, longitude}, callback) => {
    return fetch({latitude, longitude})
        .then(data => callback({timestamp: Date.now(), ...data, name}))
        .catch(_handlerError);
};

export const getWeathers = (weathers, callback) => {
    return fetchAll(weathers)
        .then((data) => callback(data)).catch(_handlerError);
};

export default getWeather;
