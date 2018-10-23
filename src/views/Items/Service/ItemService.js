import axios from 'axios';
import Constant from '../../../config/Constants';

class ItemService {
    getData(){
        const URL = Constant.URL_MASTER_PATH + Constant.URL_ITEMS;
        const params = {
          access_token : localStorage.getItem('access-token')
        }

        return new Promise((resolve, reject)=>{
            axios.get(URL, {params: params}).then(response=>{
                resolve(response);
            }).catch(error=>{
                reject('error');
            })
        })
    };


postItem(data){
    const URL = Constant.URL_MASTER_PATH + Constant.URL_ITEMS;
    const payload = data;
    const params = {
        access_token : localStorage.getItem('access-token')
      }
    return new Promise((resolve,reject)=>{
        axios.post(URL,payload,{params:params}).then(response => {
            resolve(response);
        }).catch(error =>{
            reject('ERROR');
        })
    })

};

getDetail(id){
    const URL = Constant.URL_MASTER_PATH+Constant.URL_ITEMS+"/"+id;
    const param = {
        access_token :localStorage.getItem('access-token')
    }
    return new Promise((resolve,reject)=>{
        axios.get(URL,{params:param}).then(response => {
            resolve(response);
        }).catch(error => {
            reject('ERROR');
        })
    })
}


putItem(data,id){
    const URL = Constant.URL_MASTER_PATH+Constant.URL_ITEMS+"/"+id;
    const payload = data;
    const param = {
        access_token :localStorage.getItem('access-token')
    }
    return new Promise((resolve,reject) => {
        axios.put(URL,payload,{params: param}).then(response => {
            resolve(response);           
        }).catch(error => {
            reject('ERROR');
        })
    })
}

deleteItem(id){
    const URL = Constant.URL_MASTER_PATH+Constant.URL_ITEMS+"/"+id;
    const param ={
        access_token: localStorage.getItem('access-token')
    }
    return new Promise((resolve,reject) => {
        axios.delete(URL,{params: param}).then(response => {
            resolve(response);
        }).catch(error => {
            reject('ERROR');
        })
    })
}

}

export default ItemService;
