import {
  faExclamationCircle, faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import '../../../../assets/scss/component/board.scss';
import { sectionService } from '../../../../services/section/api';
import { Section } from '../InterfaceTask';
interface Props {
  showTaskDetails: { status: boolean; setStatus: (value) => void };
  dataTasks: { data: Array<Section>; setData: (data) => void };
  projectId: string;
}
const AddSection: React.FC<Props> = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [nameSection, setNameSection] = useState('');
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
    <>
      <div
        style={{ height: '100%' }}
        onClick={() => {
          props.showTaskDetails.setStatus(false);
          setShowModal(true);
        }}>
        <div className="column-tasks">
          <div className="column-task-sort">
            <div className="board-task">
              <Button color="primary">
                <i className="fa fa-list-alt" aria-hidden="true"></i>
                <span> Add Section</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        size="xl"
        onHide={() => {
          setErr(null);
          setNameSection('');
          setShowModal(false);
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
                Thêm mới section
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body style={{ color: 'black' }}>
          <div className="pl-6 pr-6 modal-add-task">
            <div className="d-flex bd-highlight align-items-center">
              <div>Name section</div>
            </div>
            <div className="d-flex bd-highlight align-items-center mt-2">
              <div className="w-100">
                <input
                  type="text"
                  className="p-2"
                  placeholder="New section"
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
              <div className="btn btn-primary" onClick={addSection}>
                Tạo
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddSection;
