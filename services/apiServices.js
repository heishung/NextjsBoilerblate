/* eslint-disable dot-notation */
import axios from "axios";
import { apiBaseUrl } from 'configs/baseUrls';
import {isEmpty } from 'lodash';
class AxiosService {
  constructor() {
    
    const instance = axios.create({
      baseURL: apiBaseUrl,
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    });
    instance.defaults.timeout = 300000;
    if (typeof window !== 'undefined') {
        if (!isEmpty(localStorage.getItem("userData"))) {
        const dataUser = JSON.parse(localStorage.getItem("userData"));
        if (dataUser) {

            instance.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${dataUser.data.token}`;
            // axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

        } else {
            instance.defaults.headers.common["Authorization"] = ``;
        }
        } else {
        instance.defaults.headers.common["Authorization"] = ``;
        }
    }
   

    instance.interceptors.response.use(this.handleSuccess, this.handleError);

    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  get(url) {
    return this.instance.get(url);
  }

  post(url, body, config) {
    return this.instance.post(url, body, config);
  }

  put(url, body, config) {
    return this.instance.put(url, body, config);
  }

  delete(url) {
    return this.instance.delete(url);
  }
}

export default new AxiosService();
