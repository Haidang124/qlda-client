import React from 'react';
import {
  getPriority,
  getStatus,
  Priority,
  Status,
  Task,
} from '../InterfaceTask';
import '../../../../assets/scss/component/board.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCodeBranch,
  faEye,
  faPencilAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import { CalenderModal, DropdownAssignee } from './Help';

interface Props {
  dataTasks: { data: any; setData: (data) => void };
  task: Task;
  isDraggable: { status: boolean; setStatus: (value) => void };
  showTaskDetails: { status: boolean; setStatus: (value) => void };
  taskDetails: { task: Task; setTask: (task: Task) => void };
}

export const TaskItem: React.FC<Props> = (props: Props) => {
  const showTaskDetails = (event?) => {
    event?.stopPropagation();
    props.taskDetails.setTask(props.task);
    props.showTaskDetails.setStatus(true);
  };
  return (
    <div
      className={`p-2 task-item ` + (props.task.isDone ? 'task-item-done' : '')}
      onClick={showTaskDetails}>
      <div className="d-flex bd-highlight align-items-center pb-1 task-name">
        {/* ------- name task --------- */}
        <div className="bd-highlight icon-done">
          <FontAwesomeIcon
            icon={faCheckCircle}
            opacity={props.task.isDone ? 1 : 0.3}
            color={props.task.isDone ? '#52a357' : 'none'}
          />
        </div>
        <div className="mr-auto bd-highlight ml-2">{props.task.taskName}</div>

        {/* ------- menu task --------- */}
        <div className="bd-highlight">
          <Dropdown
            onToggle={(isOpen, event, metadata) => {
              props.isDraggable.setStatus(!isOpen); //open menu => disabled drag
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}>
            <Dropdown.Toggle>...</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(event) => {}}>
                <div className="d-flex bd-highlight">
                  <div className="p-2 bd-highlight">
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </div>
                  <div className="mr-auto p-2 bd-highlight">Edit task name</div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div className="d-flex bd-highlight">
                  <div className="p-2 bd-highlight">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      opacity={props.task.isDone ? 0.3 : 1}
                    />
                  </div>
                  <div className="mr-auto p-2 bd-highlight">
                    {props.task.isDone ? 'Mark incomplete' : 'Mark complete'}
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={showTaskDetails}>
                <div className="d-flex bd-highlight">
                  <div className="p-2 bd-highlight">
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                  <div className="mr-auto p-2 bd-highlight">View details</div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div className="d-flex bd-highlight">
                  <div className="p-2 bd-highlight">
                    <FontAwesomeIcon icon={faTrashAlt} color="#F06A6F" />
                  </div>
                  <div
                    className="mr-auto p-2 bd-highlight"
                    style={{ color: '#F06A6F' }}>
                    Delete section
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="d-flex bd-highlight align-items-center pb-1">
        <div className="bd-highlight mr-2">
          {props.task.priority !== Priority.null ? (
            <div
              className="pl-2 pr-2 task-priority"
              style={{ ...getPriority(props.task.priority).style }}>
              {getPriority(props.task.priority).name}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="bd-highlight mr-2">
          {props.task.status !== Status.null ? (
            <div
              className="pl-2 pr-2 task-priority"
              style={{ ...getStatus(props.task.status).style }}>
              {getStatus(props.task.status).name}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="d-flex bd-highlight align-items-center pb-1 pt-1">
        {/* Assignee */}
        <div className="bd-highlight mr-2 user-avatar-block">
          <DropdownAssignee task={props.task} config={{}} />
        </div>
        <div className="mr-auto bd-highlight mr-2">
          <CalenderModal
            config={{ isDisabled: true }}
            startDate={props.task.dueDate?.from || null}
            endDate={props.task.dueDate?.to || null}
            handleChangeDate={(from, to) => {
              props.task.dueDate.from = from;
              props.task.dueDate.to = to;
              props.dataTasks.setData(props.dataTasks.data);
              // send data to server
              // ....
            }}
          />
        </div>
        <div className="bd-highlight p-2">
          {props.task.subTask.length} <FontAwesomeIcon icon={faCodeBranch} />
        </div>
      </div>
    </div>
  );
};
