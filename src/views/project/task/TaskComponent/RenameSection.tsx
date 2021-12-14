import {
  faExclamationCircle,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
}
const RenameSection: React.FC<Props> = (props: Props) => {
  const [nameSection, setNameSection] = useState('');
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
    <Modal
      show={props.showModal.status}
      size="xl"
      onHide={() => {
        setErr(null);
        setNameSection('');
        props.showModal.setStatus(false);
      }}
      scrollable
      centered>
      <Modal.Header closeButton>
        <div className="d-flex bd-highlight justify-content-center align-items-center">
          <div>
            <FontAwesomeIcon icon={faPlusCircle} />
          </div>
          <div className="ml-3">
            <span style={{ fontSize: '20px', color: 'black' }}>
              Thay đổi tên section
            </span>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body style={{ color: 'black' }}>
        <div className="pl-6 pr-6 modal-add-task">
          <div className="d-flex bd-highlight align-items-center">
            <div>Tên mới của section</div>
          </div>
          <div className="d-flex bd-highlight align-items-center mt-2">
            <div className="w-100">
              <input
                type="text"
                className="p-2"
                placeholder={props.section.name}
                onChange={(event) => {
                  if (event.target.value) {
                    setErr(null);
                  }
                  setNameSection(event.target.value);
                }}
              />
            </div>
          </div>

          {err ? (
            <div className="d-flex bd-highlight align-items-center">
              <div>
                <FontAwesomeIcon icon={faExclamationCircle} color="#ff584d" />
              </div>
              <div className="pl-2" style={{ color: '#ff584d' }}>
                {err}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="pl-6 pr-6">
          <div className="w-100 d-flex justify-content-end">
            <div className="btn btn-primary" onClick={renameSection}>
              Lưu
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default RenameSection;
