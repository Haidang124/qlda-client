import React, { useEffect, useState } from 'react';
import {
  getPriority,
  getStatus,
  Priority,
  Section,
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
import { taskService } from '../../../../services/task/api';
import { toast } from 'react-toastify';
import ModalTrueFalse from '../../../ModalTrueFalse';

interface Props {
  dataTasks: { data: Array<Section>; setData: (data) => void };
  task: {
    task: Task;
    setTask: (task: Task) => void;
  };
  show;
  setShow: (value) => void;
}
export const TaskDetails: React.FC<Props> = (props: Props) => {
  const [render, setRender] = useState(false);
  const [showModalTrueFalse, setShowModalTrueFalse] = useState(false);
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
  const updateTask = (data: {
    projectId: string;
    taskId: string;
    dependencies?: string;
    assignment?: Array<string>;
    name?: string;
    file?: Array<string>;
    dueDate?: {
      from: Date;
      to: Date;
    };
    isDone?: boolean;
    status?: Status;
    priority?: Priority;
  }) => {
    taskService
      .updateTask(data)
      .then((res) => {
        props.dataTasks.setData(res.data.data.allTasks);
        props.task.setTask(res.data.data.taskUpdate);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
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
        onAnimationEnd={onAnimationEnd}
        onClick={(event) => {
          event.stopPropagation();
        }}>
        <div className="d-flex bd-highlight align-items-center task-header">
          <div className="flex-grow-1 bd-highlight p-2">
            <input
              type="text"
              className="p-1 pl-2 w-100 task-name"
              value={props.task.task.name}
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
            <Dropdown
              onClick={(event) => {
                event.stopPropagation();
              }}>
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
                <Dropdown.Item
                  onClick={() => {
                    setShowModalTrueFalse(true);
                  }}>
                  <div className="d-flex bd-highlight">
                    <div className="p-2 bd-highlight">
                      <FontAwesomeIcon icon={faTrashAlt} color="#F06A6F" />
                    </div>
                    <div
                      className="mr-auto p-2 bd-highlight"
                      style={{ color: '#F06A6F' }}>
                      Delete task
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
                startDate={new Date(props.task.task.dueDate?.from) || null}
                endDate={new Date(props.task.task.dueDate?.to) || null}
                handleChangeDate={(from, to) => {
                  updateTask({
                    projectId: props.dataTasks.data[0].projectId,
                    taskId: props.task.task._id,
                    dueDate: {
                      from: from,
                      to: to,
                    },
                  });
                }}
              />
            </div>
          </div>
          {props.dataTasks.data ? (
            <div className="d-flex bd-highlight align-items-center pb-2 task-project">
              <div className="bd-highlight task-body-header">Projects</div>
              <div className="bd-highlight task-body-second">
                <Dropdown
                  onClick={(event) => {
                    event.stopPropagation();
                  }}>
                  <Dropdown.Toggle>
                    {
                      props.dataTasks.data.filter(
                        (section) => section._id === props.task.task.sectionId,
                      )[0].name
                    }
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {props.dataTasks.data.map((section, i) => {
                      return (
                        <Dropdown.Item
                          onClick={(e) => {
                            // change section
                            taskService
                              .changeSection({
                                projectId: section.projectId,
                                taskId: props.task.task._id,
                                sectionId1: props.task.task.sectionId,
                                sectionId2: section._id,
                              })
                              .then((res) => {
                                props.dataTasks.setData(res.data.data.allTasks);
                                props.task.setTask(res.data.data.taskUpdate);
                              })
                              .catch((err) => {
                                toast.error(
                                  err.response.data.error ||
                                    'Một lỗi không mong muốn đã xảy ra',
                                );
                              });
                          }}>
                          {section.name}
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
          <div className="d-flex bd-highlight pb-2 align-items-center task-dependencies">
            <div className="bd-highlight task-body-header">Dependencies</div>
            <div className="bd-highlight task-body-second">
              <Dropdown
                onClick={(event) => {
                  event.stopPropagation();
                }}>
                <Dropdown.Toggle style={{ padding: '0px' }}>
                  <div className="p-2 btn-task-priority">
                    {props.task.task.dependenciesTask?.name || '_'}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(event) => {
                      event.stopPropagation();
                      updateTask({
                        projectId: props.dataTasks.data[0]?.projectId,
                        taskId: props.task.task._id,
                        dependencies: null,
                      });
                    }}>
                    _
                  </Dropdown.Item>
                  {props.dataTasks.data.map((section) =>
                    section.tasks.map((task) => (
                      <Dropdown.Item
                        onClick={(event) => {
                          event.stopPropagation();
                          updateTask({
                            projectId: props.dataTasks.data[0]?.projectId,
                            taskId: props.task.task._id,
                            dependencies: task._id,
                          });
                        }}>
                        {task.name}
                      </Dropdown.Item>
                    )),
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="d-flex bd-highlight align-items-center pb-2 task-priority">
            <div className="bd-highlight task-body-header">Priority</div>
            <div className="bd-highlight task-body-second">
              <Dropdown
                onClick={(event) => {
                  event.stopPropagation();
                }}>
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
                  <Dropdown.Item
                    onClick={(event) => {
                      event.stopPropagation();
                      updateTask({
                        projectId: props.dataTasks.data[0]?.projectId,
                        taskId: props.task.task._id,
                        priority: Priority.null,
                      });
                    }}>
                    _
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getPriority(Priority.low).style.backgroundColor,
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      updateTask({
                        projectId: props.dataTasks.data[0]?.projectId,
                        taskId: props.task.task._id,
                        priority: Priority.low,
                      });
                    }}>
                    {getPriority(Priority.low).name}
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getPriority(Priority.medium).style.backgroundColor,
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      updateTask({
                        projectId: props.dataTasks.data[0]?.projectId,
                        taskId: props.task.task._id,
                        priority: Priority.medium,
                      });
                    }}>
                    {getPriority(Priority.medium).name}
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getPriority(Priority.high).style.backgroundColor,
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      updateTask({
                        projectId: props.dataTasks.data[0]?.projectId,
                        taskId: props.task.task._id,
                        priority: Priority.high,
                      });
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
              <Dropdown
                onClick={(event) => {
                  event.stopPropagation();
                }}>
                <Dropdown.Toggle style={{ padding: '0px' }}>
                  <div
                    className="p-2 btn-task-status"
                    style={{
                      color:
                        getStatus(props.task.task.status)?.style
                          .backgroundColor || 'black',
                    }}>
                    {getStatus(props.task.task.status)?.name || '_'}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(event) => {
                      event.stopPropagation();
                      updateTask({
                        projectId: props.dataTasks.data[0]?.projectId,
                        taskId: props.task.task._id,
                        status: Status.null,
                      });
                    }}>
                    _
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getStatus(Status.atRisk).style.backgroundColor,
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      updateTask({
                        projectId: props.dataTasks.data[0]?.projectId,
                        taskId: props.task.task._id,
                        status: Status.atRisk,
                      });
                    }}>
                    {getStatus(Status.atRisk).name}
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getStatus(Status.offTrack).style.backgroundColor,
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      updateTask({
                        projectId: props.dataTasks.data[0]?.projectId,
                        taskId: props.task.task._id,
                        status: Status.offTrack,
                      });
                    }}>
                    {getStatus(Status.offTrack).name}
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      backgroundColor: 'white',
                      color: getStatus(Status.onTrack).style.backgroundColor,
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      updateTask({
                        projectId: props.dataTasks.data[0]?.projectId,
                        taskId: props.task.task._id,
                        status: Status.onTrack,
                      });
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
          {/* <div className="d-flex bd-highlight pb-2 task-subtask">
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
          </div> */}
          {/* ----------------------Create by------------------- */}
          <div className="d-flex bd-highlight align-items-center mt-4 task-creator">
            <div className="bd-highlight task-body-header">Created by</div>
            <div className="flex-grow-1 bd-highlight">
              <b>
                <i>{props.task.task.authorId.username}</i>
              </b>
            </div>
          </div>
        </div>
        <ModalTrueFalse
          show={showModalTrueFalse}
          size="sm"
          data={{
            title: `delete "${props.task.task.name}"`,
            button_1: { title: 'No' },
            button_2: { title: 'Yes' },
          }}
          setClose={() => setShowModalTrueFalse(false)}
          funcButton_1={() => {
            setShowModalTrueFalse(false);
          }}
          funcButton_2={() => {
            taskService
              .deleteTask({
                projectId: props.dataTasks.data[0].projectId,
                taskId: props.task.task._id,
              })
              .then((res) => {
                toast.success('Xóa task thành công');
                props.dataTasks.setData(res.data.data);
                props.setShow(false);
              })
              .catch((err) => {
                toast.error(
                  err.response.data?.error ||
                    'Một lỗi không mong muốn đã xảy ra',
                );
              });
          }}
        />
      </div>
    )
  );
};
