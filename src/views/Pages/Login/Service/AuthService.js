import axios from 'axios';
import Constant from '../../../../config/Constants';

class AuthService {
  login(data){
        const URL = Constant.URL_MASTER_PATH + Constant.URL_LOGIN;
        const payload = data;

        return new Promise((resolve, reject)=>{
            axios.post(URL, payload).then(response => {
                resolve(response);
            }).catch(error=>{
                reject('ERROR');
            });
        })
    };
}

export default AuthService;
