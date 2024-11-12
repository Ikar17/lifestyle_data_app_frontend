import axios from 'axios';
import { BACKEND_URL } from '../constants/constants';

export async function getVoivodeships(){

    return axios.get(`${BACKEND_URL}/address/voivodeships`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

export async function getDistricts(voivodeshipName){

    return axios.get(`${BACKEND_URL}/address/districts/${voivodeshipName}`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

export async function getComunnes(districtName){

    return axios.get(`${BACKEND_URL}/address/communes/${districtName}`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}