import axios from 'axios';
import Constant from '../../../config/Constants';
import { resolve } from 'path';
import { rejects } from 'assert';

class SalesService {

    getAllSales() {
        const URL = Constant.URL_MASTER_PATH + Constant.URL_SALES;
        const params = {
            access_token: localStorage.getItem('access-token')
        }
        return new Promise((resolve, rejects) => {
            axios.get(URL, { params: params }).then(response => {
                resolve(response);
            }).catch(error => {
                rejects('error')
            })
        })

    }

    getAllItem() {
        const URL = Constant.URL_MASTER_PATH + Constant.URL_ITEMS;
        const param = {
            access_token: localStorage.getItem('access-token')
        }
        return new Promise((resolve, rejects) => {
            axios.get(URL, { params: param }).then(response => {
                resolve(response);
            }).catch(error => {
                rejects('error')
            })
        })
    }

    postData(data) {
        const URL = Constant.URL_MASTER_PATH + Constant.URL_SALES;
        const payload = data;
        const param = {
            access_token: localStorage.getItem('access-token')
        }
        return new Promise((resolve, rejects) => {
            axios.post(URL, payload, { params: param }).then(response => {
                resolve(response);
            }).catch(error => {
                rejects('ERROR');
            })
        })
    }
}

export default SalesService;