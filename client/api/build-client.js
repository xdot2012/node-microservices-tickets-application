import axios from 'axios';
import { INGRESS_SRV } from '../variables.js';

export default ({ req }) => {
    if (typeof window === 'undefined') {
        return axios.create({
            baseURL: INGRESS_SRV,
            headers: req.headers
        });
    } else {
        return axios.create({
            baseURL: '/'
        })
    }
}