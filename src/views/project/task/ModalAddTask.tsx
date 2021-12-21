import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { taskService } from '../../../services/task/api';
import { Label, Section } from './InterfaceTask';
// import { CalenderModal } from './TaskComponent/Help';
interface Props {
  show: boolean;
  callBack: () => void;
  isAddEvent?: boolean;
  projectId?: string;
  section?: Section;
  dataTasks?: { data: Array<Section>; setData: (data) => void };
  labels: {
    data: Array<Label>;
    setData: (labels) => void;
  };
}
const ModalAddTask: React.FC<Props> = (props: Props) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [labelId, setLabelId] = useState([]);
  // const [err, setErr] = useState('');
  const [dueDate, setDueDate] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setHours(0)),
    to: new Date(new Date().setHours(23)),
  });
  const addTask = () => {
    if (taskName === '') {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    taskService
      .addTask({
        projectId: props.projectId,
        sectionId: props.section._id,
        name: taskName,
        description: description,
        labels: labelId,
        dueDate: dueDate,
      })
      .then((res) => {
        setLabelId([]);
        setTaskName('');
        setDueDate({ from: new Date(), to: new Date() });
        // setErr('');
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
    return props.labels.data.map((label) => (
      <>
        <button
          type="button"
          onClick={() => {
            if (!labelId.includes(label._id)) {
              setLabelId([...labelId, label._id]);
            } else {
              labelId.splice(labelId.indexOf(label._id), 1);
              setLabelId(labelId);
            }
          }}
          style={{ backgroundColor: label.color }}
          className={`${
            labelId.includes(label._id) ? 'active' : ''
          } btn mr-1`}></button>
        <span className="mr-3">{label.name}</span>
      </>
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
              <label className="form-control-label">Tên task</label>
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
              <label className="form-control-label d-block mb-3">Label</label>
              <div
                data-toggle="buttons"
                role="group"
                className="btn-group-toggle btn-group-colors event-tag btn-group align-items-center">
                {renderColor()}
              </div>
            </div>
            {/* <div className="form-group">
              <label className="form-control-label">Due date</label>
              <div>
                {props.isAddEvent ? (
                  <CalenderModal
                    config={{ isDisabled: false }}
                    startDate={dueDate.from || null}
                    endDate={dueDate.to || null}
                    handleChangeDate={(from, to) => {
                      setDueDate({
                        from: from,
                        to: to,
                      });
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div> */}
            <div className="form-group">
              <label className="form-control-label">Description</label>
              <textarea
                style={{ height: '100px' }}
                placeholder="Task Desctiption"
                className="form-control-alternative edit-event--description textarea-autosize form-control mr-2"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}></textarea>
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
                Lưu
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
                Xóa
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
