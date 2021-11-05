import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
const Color = () => {
  return <></>;
};
const ModalTaskCalendar: React.FC<any> = (props: any) => {
  const [active, setActive] = useState('info');
  const renderColor = () => {
    let listColor = [
      'info',
      'warning',
      'danger',
      'success',
      'default',
      'primary',
    ];
    return listColor.map((color) => (
      <button
        type="button"
        onClick={() => setActive(color)}
        className={`bg-${color} ${
          color === active ? 'active' : ''
        } btn mr-2`}></button>
    ));
  };
  return (
    <div className="calendar-task">
      <Modal
        size="sm"
        show={props.show} // false: Không hiển thị, true: hiển thị
        scrollable
        centered>
        <Modal.Header>
          <span>Event title</span>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form">
            <div className="form-group">
              <label className="form-control-label">Event title</label>
              <input
                placeholder="Event Title"
                type="text"
                className="form-control-alternative new-event--title form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label d-block mb-3">
                Status color
              </label>
              <div
                data-toggle="buttons"
                role="group"
                className="btn-group-toggle btn-group-colors event-tag btn-group">
                {renderColor()}
              </div>
            </div>
            <div className="form-group">
              <label className="form-control-label">Description</label>
              <textarea
                style={{ height: '100px' }}
                placeholder="Event Desctiption"
                className="form-control-alternative edit-event--description textarea-autosize form-control"></textarea>
              <i className="form-group--bar"></i>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {props.isAddEvent ? (
            <div>
              <Button
                style={{
                  backgroundColor: '#7b68ee',
                }}
                onClick={(e) => {}}>
                Add Event
              </Button>
            </div>
          ) : (
            <div>
              <Button
                style={{
                  backgroundColor: '#5e72e4',
                }}
                onClick={(e) => {}}>
                Update
              </Button>
              <Button
                style={{
                  backgroundColor: '#f5365c',
                }}
                onClick={(e) => {}}>
                Delete
              </Button>
            </div>
          )}
          <button
            type="button"
            className="ml-auto btn btn-link"
            onClick={() => props.callBack()}
            style={{
              color: '#5e72e4',
            }}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalTaskCalendar;
