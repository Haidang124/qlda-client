import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { taskService } from '../../../services/task/api';
import { Section } from './InterfaceTask';
const Color = () => {
  return <></>;
};
interface Props {
  show: boolean;
  callBack: () => void;
  isAddEvent?: boolean
  projectId?: string;
  section?: Section;
  dataTasks?: { data: Array<Section>; setData: (data) => void };
}
const ModalAddTask: React.FC<Props> = (props: Props) => {
  const [active, setActive] = useState('info');
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [err, setErr] = useState('');
  const addTask = () => {
    if (taskName === '') {
      setErr('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    taskService
      .addTask({
        projectId: props.projectId,
        sectionId: props.section._id,
        name: taskName,
        description: description,
      })
      .then((res) => {
        setTaskName('');
        setErr('');
        props.dataTasks.setData(res.data.data);
        toast.success('Thành công');
        props.callBack();
      })
      .catch((err) => {
        toast.error(
          err.response.data?.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };
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
        className={`bg-${color} ${color === active ? 'active' : ''
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
          <label className="form-control-label m-0">
            Section: <b>{props.section?.name}</b>
          </label>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form">
            <div className="form-group">
              <label className="form-control-label">Task title</label>
              <input
                placeholder="Event Title"
                type="text"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  setTaskName(e.target.value);
                }}
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
                placeholder="Task Desctiption"
                className="form-control-alternative edit-event--description textarea-autosize form-control"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
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
                onClick={() => {
                  addTask();
                }}>
                Add Task
              </Button>
            </div>
          ) : (
            <div>
              <Button
                style={{
                  backgroundColor: '#5e72e4',
                }}
                onClick={(e) => { }}>
                Update
              </Button>
              <Button
                style={{
                  backgroundColor: '#f5365c',
                }}
                onClick={(e) => { }}>
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

export default ModalAddTask;
