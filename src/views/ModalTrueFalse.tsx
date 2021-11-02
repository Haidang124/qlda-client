import React from 'react';
import { Modal } from 'react-bootstrap';
import '../assets/scss/component/modaltruefaslse.scss';
const ModalTrueFalse: React.FC<any> = (props: any) => {
  return (
    <>
      <Modal
        className="modal-confirm"
        size={props.size ? 'sm' : props.size}
        show={props.show} // false: Không hiển thị, true: hiển thị
        onHide={() => {
          props.setClose();
          props.funcOnHide();
        }}
        scrollable
        centered>
        <Modal.Header closeButton className="d-flex flex-column">
          <div className="icon-box">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h4 className="modal-title w-100">Are you sure?</h4>
        </Modal.Header>
        <Modal.Body>
          <p>
            {`Do you really want to ${props.data.title}? This process cannot be
            undone.`}
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => {
              props.funcButton_1();
              props.setClose();
            }}>
            {props.data.button_1.title}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              props.funcButton_2();
              props.setClose();
            }}>
            {props.data.button_2.title}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalTrueFalse;
