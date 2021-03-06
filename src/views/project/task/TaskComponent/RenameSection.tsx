/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../../../../assets/scss/component/board.scss';
import { sectionService } from '../../../../services/section/api';
import { Section } from '../InterfaceTask';
interface Props {
  showModal: { status: boolean; setStatus: (value) => void };
  dataTasks: { data: Array<Section>; setData: (data) => void };
  projectId: string;
  section: Section;
  size;
}
const RenameSection: React.FC<Props> = (props: Props) => {
  const [nameSection, setNameSection] = useState('');
  const [descriptionSection, setDescriptionSection] = useState('');
  const [err, setErr] = useState(null);
  const renameSection = () => {
    if (nameSection === '') {
      toast.error('Vui lòng nhập tên section');
      setErr('Vui lòng nhập tên section');
      return;
    }
    sectionService
      .updateSection({
        projectId: props.projectId,
        sectionId: props.section._id,
        name: nameSection,
      })
      .then((res) => {
        toast.success('Thành công');
        props.dataTasks.setData(res.data.data);
        props.showModal.setStatus(false);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };
  return (
    <div className="rename-section">
      <Modal
        show={props.showModal.status}
        size={props.size}
        className="modal-confirm"
        onHide={() => {
          props.showModal.setStatus(false);
        }}>
        <Modal.Header className="pb-0">
          <h1>Đổi tên section</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form">
            <div className="form-group">
              <input
                type="text"
                defaultValue={props.section.name}
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
                defaultValue={descriptionSection}
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
              props.showModal.setStatus(false);
            }}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={renameSection}>
            Lưu
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default RenameSection;
