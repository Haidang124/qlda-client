import React, { useEffect, useState } from 'react';
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
  faCodeBranch,
  faLink,
  faPauseCircle,
  faPencilAlt,
  faPlus,
  faPlusCircle,
  faTimesCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import { CalenderModal, DropdownAssignee } from './Help';

interface Props {
  dataTasks: { data: any; setData: (data) => void };
  task: {
    task: Task;
    setTask: (task: Task) => void;
  };
  show;
  setShow: (value) => void;
}
export const TaskDetails: React.FC<Props> = (props: Props) => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (props.show) {
      setRender(true);
    }
  }, [props.show]);
  const onAnimationEnd = () => {
    if (!props.show) {
      setRender(false);
    }
  };
  return (
    render && (
      <div
        className="task-details"
        style={{
          animation: `${
            props.show ? 'task-details-show 1s' : 'task-details-hide 1s'
          }`,
        }}
        onAnimationEnd={onAnimationEnd}>
        <div className="d-flex bd-highlight align-items-center task-header">
          <div className="flex-grow-1 bd-highlight p-2">
            <input
              type="text"
              className="p-1 pl-2 w-100 task-name"
              value={props.task.task.taskName}
              onChange={(e) => {
                // edit task name
              }}
            />
          </div>
          <div
            className="bd-highlight p-2 task-header-link"
            onClick={() => {
              // copy link task
            }}>
            <span
              className="d-inline-block"
              tabIndex={0}
              data-toggle={'tooltip'}
              title="Copy link">
              <FontAwesomeIcon icon={faLink} />
            </span>
          </div>
          <div className="bd-highlight p-2 task-header-menu">
            <Dropdown>
              <Dropdown.Toggle>...</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <div className="d-flex bd-highlight">
                    <div className="p-2 bd-highlight">
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                    <div className="mr-auto p-2 bd-highlight">
                      Rename section
                    </div>
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
          <div
            className="bd-highlight p-2 task-header-close"
            onClick={() => {
              props.setShow(false);
            }}>
            <span
              className="d-inline-block"
              tabIndex={0}
              data-toggle={'tooltip'}
              title="Close details">
              <FontAwesomeIcon icon={faTimesCircle} />
            </span>
          </div>
        </div>
        <div className="task-body">
          <div className="d-flex bd-highlight align-items-center pb-2 task-assignee">
            <div className="bd-highlight task-body-header">Assignee</div>
            <div className="bd-highlight task-body-second">
              <DropdownAssignee
                task={props.task.task}
                config={{
                  isShowName: true,
                }}
              />
            </div>
          </div>
          <div className="d-flex bd-highlight align-items-center pb-2 task-calendar">
            <div className="bd-highlight task-body-header">Due date</div>
            <div className="bd-highlight task-body-second">
              <CalenderModal
                config={{ isDisabled: false }}
                startDate={props.task.task.dueDate?.from || null}
                endDate={props.task.task.dueDate?.to || null}
                handleChangeDate={(from, to) => {
                  //  change date task
                }}
              />
            </div>
          </div>
          {props.task.task.idTypeTask ? (
            <div className="d-flex bd-highlight align-items-center pb-2 task-project">
              <div className="bd-highlight task-body-header">Projects</div>
              <div className="bd-highlight task-body-second">
                <Dropdown>
                  <Dropdown.Toggle>
                    {props.dataTasks.data[props.task.task.idTypeTask].name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {props.dataTasks.data.typeTask.map((idTypeTask, i) => {
                      return (
                        <Dropdown.Item
                          onClick={(e) => {
                            // change date
                          }}>
                          {props.dataTasks.data[idTypeTask].name}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="d-flex bd-highlight pb-2 task-dependencies">
            <div className="bd-highlight task-body-header">Dependencies</div>
            <div className="bd-highlight task-body-second">
              {props.task.task.dependencies.map((idTask, i) => (
                <div className="d-flex bd-highlight pb-2 align-items-center">
                  <div className="bd-highlight p-2">
                    <FontAwesomeIcon icon={faPauseCircle} />
                  </div>
                  <div className="bd-highlight">{idTask}</div>
                </div>
              ))}
              <Dropdown>
                <Dropdown.Toggle style={{ padding: '0px' }}>
                  <div className="d-flex bd-highlight align-items-center btn-add">
                    <div className="bd-highlight p-2">
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </div>
                    <div className="bd-highlight p-2">
                      Add another dependency
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {props.task.task.dependencies.map((idTask, i) => {
                    return (
                      <Dropdown.Item
                        onClick={(e) => {
                          // add another dependency
                        }}>
                        {idTask}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="d-flex bd-highlight align-items-center pb-2 task-priority">
            <div className="bd-highlight task-body-header">Priority</div>
            <div className="bd-highlight task-body-second">
              <Dropdown>
                <Dropdown.Toggle style={{ padding: '0px' }}>
                  <div
                    className="p-2 btn-task-priority"
                    style={{
                      color: getPriority(props.task.task.priority).style
                        .backgroundColor,
                    }}>
                    {getPriority(props.task.task.priority).name || '_'}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>_</Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getPriority(Priority.low).style.backgroundColor,
                    }}
                    onClick={() => {
                      // change Priority
                    }}>
                    {getPriority(Priority.low).name}
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getPriority(Priority.medium).style.backgroundColor,
                    }}
                    onClick={() => {
                      // change Priority
                    }}>
                    {getPriority(Priority.medium).name}
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getPriority(Priority.high).style.backgroundColor,
                    }}
                    onClick={() => {
                      // change Priority
                    }}>
                    {getPriority(Priority.high).name}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          {/* ----------------Status---------------- */}
          <div className="d-flex bd-highlight align-items-center pb-2 task-status">
            <div className="bd-highlight task-body-header">Status</div>
            <div className="bd-highlight task-body-second">
              <Dropdown>
                <Dropdown.Toggle style={{ padding: '0px' }}>
                  <div
                    className="p-2 btn-task-status"
                    style={{
                      color: getStatus(props.task.task.status).style
                        .backgroundColor,
                    }}>
                    {getStatus(props.task.task.status).name || '_'}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>_</Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getStatus(Status.atRisk).style.backgroundColor,
                    }}
                    onClick={() => {
                      // change Status
                    }}>
                    {getStatus(Status.atRisk).name}
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getStatus(Status.offTrack).style.backgroundColor,
                    }}
                    onClick={() => {
                      // change Status
                    }}>
                    {getStatus(Status.offTrack).name}
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getStatus(Status.onTrack).style.backgroundColor,
                    }}
                    onClick={() => {
                      // change Status
                    }}>
                    {getStatus(Status.onTrack).name}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          {/* -------------------------------Depcription------------------------- */}
          <div className="d-flex bd-highlight pb-2 task-description">
            <div className="bd-highlight task-body-header">Description</div>
            <div className="flex-grow-1 bd-highlight">
              <textarea
                className="task-description-textarea"
                placeholder="Add more details to this task..."
                onChange={() => {
                  // change description
                }}></textarea>
            </div>
          </div>

          {/* --------------------------Subtask--------------------------- */}
          <div className="d-flex bd-highlight pb-2 task-subtask">
            <div className="bd-highlight task-body-header">Subtasks</div>
          </div>
          {props.task.task.subTask.map((subTask, i) => (
            <div
              className="d-flex bd-highlight align-items-center task-subtask-item"
              onClick={() => {
                // preview subTask
                props.task.setTask(subTask);
              }}>
              <div className="flex-grow-1 bd-highlight p-2 pl-3">
                {subTask.taskName}
              </div>
              <div className="bd-highlight p-2">
                {subTask.subTask.length} <FontAwesomeIcon icon={faCodeBranch} />
              </div>
              <div className="bd-highlight p-2">
                <CalenderModal
                  config={{ isDisabled: true }}
                  startDate={subTask.dueDate?.from || null}
                  endDate={subTask.dueDate?.to || null}
                  handleChangeDate={(from, to) => {
                    //  change date task
                  }}
                />
              </div>
              <div className="bd-highlight p-2">
                <DropdownAssignee
                  task={subTask}
                  config={{
                    isShowName: false,
                  }}
                />
              </div>
            </div>
          ))}
          <div className="d-flex bd-highlight align-items-center mt-2">
            <div className="bd-highlight p-2 btn-add-subtask">
              <div className="d-flex bd-highlight align-items-center">
                <div className="bd-highlight">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <div className="bd-highlight pl-2">Add subtask</div>
              </div>
            </div>
          </div>
          {/* ----------------------Create by------------------- */}
          <div className="d-flex bd-highlight align-items-center mt-4 task-creator">
            <div className="bd-highlight task-body-header">Created by</div>
            <div className="flex-grow-1 bd-highlight">
              <b>
                <i>{props.task.task.creator.userName}</i>
              </b>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
