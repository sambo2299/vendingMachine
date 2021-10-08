import axios from 'axios';
import qs from 'qs';

console.log(process.env.REACT_APP_CONTAINER_URL)

const instance = axios.create({
    baseURL: process.env.REACT_APP_CONTAINER_URL || 'http://localhost:8080',
    timeout: 1000
});

const APIS = {
    GET_ITEMS: '/api/items',
    BUY_ITEM: '/api/items/buy/[ITEMCODE]',
    REFUND_ITEM: '/api/items/refund/[ITEMCODE]'
}

const request = (method, url, options) => {
        switch(method) {
            case 'POST':
                const data = qs.stringify(options);
                return(instance.post(`${url}`, data));               
            case 'GET':
                const query = options ? `?${options}`: '';
                return(instance.get(`${url}${query}`));
            default:
                return false;
        }
}

export {
    APIS,
    request
}