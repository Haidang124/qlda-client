import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
interface Props {
  size?: 'sm' | 'lg' | 'xl';
  showModal: boolean;
  setShowModal: (boolean) => void;
  handleNext: (amount) => void;
}
const ModalPayment: React.FC<Props> = (props: Props) => {
  const [moneyInput, setMoneyInput] = useState('0');
  const [descriptionVideo, setDescriptionVideo] = useState('');
  return (
    <div className="modal-create-blog">
      <Modal
        show={props.showModal}
        size={props.size}
        className="modal-confirm"
        onHide={() => {
          props.setShowModal(false);
        }}>
        <Modal.Header className="pb-0">
          <h1>Nạp thêm tiền bằng MoMo</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form">
            <div className="form-group">
              <input
                placeholder="Nhập số tiền "
                type="text"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  setMoneyInput(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-control-label">Description</label>
              <textarea
                style={{ height: '100px' }}
                placeholder="Desctiption"
                className="form-control-alternative edit-event--description textarea-autosize form-control mr-2"
                onChange={(e) => {
                  setDescriptionVideo(e.target.value);
                }}></textarea>
              <i className="form-group--bar"></i>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              props.setShowModal(false);
            }}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              props.handleNext(moneyInput);
            }}>
            Tiếp Theo
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalPayment;
