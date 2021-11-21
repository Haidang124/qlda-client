import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { DropdownAssignee } from './Help';

interface Props {
  show: boolean;
  funcQuit: () => void;
}

export const AddTaskModal: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Modal
        size="lg"
        show={props.show} // false: Không hiển thị, true: hiển thị
        onHide={() => {
          props.funcQuit();
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
                Add new task
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body style={{ color: 'black' }}>
          <div className="pl-2 pr-2 modal-add-task">
            <div className="w-100 d-flex bd-highlight align-items-center">
              <div className="w-50 d-flex justify-content-start flex-column bd-highlight">
                {/* --------- name Task -----------------*/}
                <div className="bd-highlight">
                  <div className="d-flex justify-content-start align-items-center">
                    <div className="header-title">Name </div>
                    <div>
                      <input
                        type="text"
                        className="p-2 ml-3"
                        placeholder="New section"
                        onChange={(event) => {}}
                      />
                    </div>
                  </div>
                </div>
                {/* --------- one line -----------------*/}
                <div className="bd-highlight mt-2">
                  <div className="d-flex justify-content-start align-items-center">
                    <div className="header-title">Assigne </div>
                    <div>
                      {/* <DropdownAssignee /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-50 d-flex justify-content-start flex-column bd-highlight"></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="pl-2 pr-2">
            <div className="w-100 d-flex justify-content-end">
              <div className="btn btn-primary" onClick={() => {}}>
                Tạo
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
