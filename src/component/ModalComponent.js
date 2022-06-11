
import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalComponent = (props) => {
    return (
        <Modal {...props.data}>
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    );
}
 
export default ModalComponent;
