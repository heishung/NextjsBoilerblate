import { put, takeLatest, all, call } from 'redux-saga/effects';

import {callLogin} from 'services/loginServices';
import {login } from 'actions/authActions';
import {REQUEST, LOGIN } from 'actions/actionTypes';


export function* watchLogin(action) {
    try{
        const {status,data} = yield call(callLogin,action);
        if(data.status_code === 200 ){
            yield put(login.success(data.data))
           return localStorage.setItem("userData", JSON.stringify(data));
         
        }
        else{
            localStorage.setItem("userData", '');
        }
    }catch(err){
        yield put(login.failure(err));
        return localStorage.setItem("userData", '');
      
    }
}


export default function* rootSaga() {
  yield all([yield takeLatest(LOGIN[REQUEST], watchLogin)]);
}
