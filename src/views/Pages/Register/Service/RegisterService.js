import axios from 'axios';
import Constant from '../../../../config/Constants';

class RegisterService {
  register(data){
        const URL = Constant.URL_MASTER_PATH + Constant.URL_REGISTER;
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

export default RegisterService;
