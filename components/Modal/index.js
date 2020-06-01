import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {actionCloseModal} from 'actions/modalAction';
import {modalSelector } from 'reducers/selectors';
import FormLogin from 'containers/Auth'
import { Modal } from 'antd';
function ModalGlobal() {
  const dispatch = useDispatch();
    const {visible} = useSelector(modalSelector)
    const onHandleClose = ()=>dispatch(actionCloseModal())
    return (
        <Modal
          title={<div className="text-center">Đăng kí và Đăng nhập</div>}
          visible={visible}
          onOk={onHandleClose}
          onCancel={onHandleClose}
          footer={null}
        >
          <FormLogin/>
        </Modal>
    )
}

export default ModalGlobal
