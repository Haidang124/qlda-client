/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import '../../../../assets/scss/component/board.scss';
import { sectionService } from '../../../../services/section/api';
import { Section } from '../InterfaceTask';
interface Props {
  showModal: { status: boolean; setStatus: (value) => void };
  dataTasks: { data: Array<Section>; setData: (data) => void };
  projectId: string;
  size: any;
}
const AddSection: React.FC<Props> = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [nameSection, setNameSection] = useState('');
  const [descriptionSection, setDescriptionSection] = useState('');
  const [err, setErr] = useState(null);
  const addSection = () => {
    if (nameSection === '') {
      toast.error('Vui lòng nhập tên section');
      setErr('Vui lòng nhập tên section');
      return;
    }
    sectionService
      .addSection({
        projectId: props.projectId,
        name: nameSection,
      })
      .then((res) => {
        toast.success('Thành công');
        props.dataTasks.setData(res.data.data);
        setShowModal(false);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };
  return (
    <div className="add-section">
      <div
        style={{ height: '100%' }}
        onClick={() => {
          props.showModal.setStatus(false);
        }}>
        <div className="column-tasks">
          <div className="column-task-sort">
            <div className="board-task">
              <Button
                color="primary"
                onClick={() => {
                  setShowModal(true);
                }}>
                <i className="fa fa-list-alt" aria-hidden="true"></i>
                <span> Add Section</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        size={props.size}
        className="modal-confirm"
        onHide={() => {
          props.showModal.setStatus(false);
        }}>
        <Modal.Header className="pb-0">
          <h1>Tạo mới section</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Nhập tên mới section"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  setNameSection(e.target.value);
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
                  setDescriptionSection(e.target.value);
                }}></textarea>
              <i className="form-group--bar"></i>
            </div>
            <div className="d-flex justify-content-start align-items-center"></div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setShowModal(false);
            }}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={addSection}>
            Lưu
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddSection;
