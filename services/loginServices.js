import axiosService from 'services/apiServices';

const loginUrl = '/v1/login';
export const callLogin =(data) =>{
    const {username,password} = data
    const newData = {user_name:username,password}
    return axiosService.post(loginUrl, newData)
}