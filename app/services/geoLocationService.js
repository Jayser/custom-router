import axios from 'axios';
import {GEO_LOCATION_SERVICE} from 'constants/index'

const _handlerError = (error) => {
    console.log('request failed ', error);
};

export const fetch = (address) => {
    return axios(`${GEO_LOCATION_SERVICE}${address}`);
};

export const fetchAll = (addresses) => {
    return axios.all(addresses.map(address => fetch(address)));
};

export const getLocation = (address, callback) => {
    return fetch(address).then(callback).catch(_handlerError);
};

export const getLocations = (addresses, callback) => {
    return fetchAll(addresses).then(callback).catch(_handlerError);
};

export default getLocation;
