import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BlockPicker } from 'react-color';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { labelsService } from '../../../../services/labels/api';
import { Label } from '../InterfaceTask';

interface Props {
  projectId: string;
  show: boolean;
  close: () => void;
  labels: {
    data: Array<Label>;
    setData: (labels) => void;
  };
}
const ModalAddLabel: React.FC<Props> = (props: Props) => {
  const [showChoose, setShowChoose] = useState(false);
  const [colorShow, setColorShow] = useState('#f17013');
  const [nameLabel, setNameLabel] = useState('');
  const [description, setDescription] = useState('');

  const styles = {
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `${colorShow}`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      cover: {},
    },
  };
  const addLabel = () => {
    labelsService
      .addLable({
        projectId: props.projectId,
        name: nameLabel,
        description: description,
        color: colorShow,
      })
      .then((res) => {
        toast.success('Thành công');
        props.close();
        props.labels.setData(res.data.data);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };
  return (
    <div className="calendar-task">
      <Modal
        size="sm"
        show={props.show} // false: Không hiển thị, true: hiển thị
        scrollable
        centered>
        <Modal.Header>
          <label className="form-control-label m-0">{/* name */}</label>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form">
            <div className="form-group">
              <label className="form-control-label">Tên label </label>
              <input
                placeholder="Event Title"
                type="text"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  // set name label
                  setNameLabel(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-control-label d-block mb-3">Màu </label>
              <div
                data-toggle="buttons"
                role="group"
                className="btn-group-toggle btn-group-colors event-tag btn-group align-items-center">
                {/* render choose color */}
                <div
                  style={styles.default.swatch}
                  onClick={() => {
                    setShowChoose(!showChoose);
                  }}>
                  <div style={styles.default.color} />
                </div>
              </div>
            </div>
            {showChoose ? (
              <div style={{ position: 'absolute', zIndex: 2 }}>
                <div
                  style={{
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                  }}
                  onClick={() => {}}
                />
                <BlockPicker
                  color={colorShow}
                  onChange={(color) => {
                    setColorShow(color.hex);
                    setShowChoose(false);
                  }}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="form-group mt-2">
              <label className="form-control-label">Mô tả</label>
              <textarea
                style={{ height: '150px', resize: 'none' }}
                placeholder="Task Desctiption"
                className="form-control-alternative edit-event--description textarea-autosize form-control"
                onChange={(e) => {
                  // set description
                  setDescription(e.target.value);
                }}></textarea>
              <i className="form-group--bar"></i>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button
              style={{
                backgroundColor: '#7b68ee',
              }}
              onClick={() => {
                // add label
                addLabel();
              }}>
              Lưu
            </Button>
          </div>
          <button
            type="button"
            className="ml-auto btn btn-link"
            onClick={() => props.close()}
            style={{
              color: '#5e72e4',
            }}>
            Hủy
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddLabel;
