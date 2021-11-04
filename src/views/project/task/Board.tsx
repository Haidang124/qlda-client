/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import uuid from 'uuid/v4';
import '../../../assets/scss/component/task.scss';
import { projectService } from '../../../services/projects/api';
import { taskService } from '../../../services/task/api';
import { userService } from '../../../services/user/api';
import socket from '../../../socketioClient';
import ModalTrueFalse from '../../ModalTrueFalse';
import ModalCreateTask from './ModalCreateTask';
import ModalEditTask from './ModalEditTask';

const Board: React.FC<{}> = (
) => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dataTaskDelete, setDataTaskDelete] = useState(null);
  const [dataEditTask, setDataEditTask] = useState({
    id: '',
    name: '',
    desc: '',
    typeTask: '',
    assignment: [],
    columnId: '',
    deadline: '',
  });
  const [listUser, setListUser] = useState([]);
  const [userId, setUserId] = useState('');
  const columns = {
    [uuid()]: {
      name: 'Planned',
      items: [],
    },
    [uuid()]: {
      name: 'In Progress',
      items: [],
    },
    [uuid()]: {
      name: 'Complete',
      items: [],
    },
  };
  const [tasks, setTasks] = useState(columns);
  useEffect(() => {
    socket.emit('joinRoom', { roomId: projectId });
  }, []);
  useEffect(() => {
    loadData();
    socket.on('reloadTask', (data) => {
      loadDataToTask(data.data.listTask);
    });
  }, []);

  const createTaskPlanned = (data) => {
    taskService
      .addTask(data)
      .then((res) => {
        // loadData();
        loadDataToTask(res.data.data);
        socket.emit('addTask', { listTask: res.data.data, roomId: projectId });
        toast.success('Thêm task thành công!');
      })
      .catch((err) => {
        toast.error('Không thể thêm Task');
      });
  };
  const loadDataToTask = (data) => {
    let planned = [],
      inProgress = [],
      complete = [];
    data.forEach((element) => {
      let tmp = {
        id: element._id,
        name: element.taskname,
        desc: element.desc,
        assignment: element.assignment,
        authorId: element.authorId,
        deadline: element.deadline,
      };
      switch (element.typeTask) {
        case 'Planned':
          planned.push(tmp);
          break;
        case 'In Progress':
          inProgress.push(tmp);
          break;
        case 'Complete':
          complete.push(tmp);
          break;
      }
    });
    Object.entries(tasks).forEach(([columnId, column], index) => {
      column.items =
        column.name === 'Planned'
          ? planned
          : column.name === 'In Progress'
          ? inProgress
          : complete;
    });
    setTasks({ ...tasks });
  };
  const loadData = async () => {
    taskService
      .getTask({ projectId: projectId })
      .then((res) => {
        loadDataToTask(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.error === 'ErrorSecurity') {
          window.location.href = '/error404';
        }
      });

    projectService
      .getUserJoin({ projectId: projectId })
      .then((res) => {
        setListUser(res.data.data.listUser);
      })
      .catch((err) => {
        if (err.response.data.error === 'ErrorSecurity') {
          window.location.href = '/error404';
        }
      });
    userService
      .getUserId()
      .then((res) => {
        setUserId(res.data.data.id);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const EditTask = (data, columns, setColumn) => {
    let column = columns[data.columnId];
    let items = [...column.items];
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === data.id) {
        items[i] = {
          id: data.id,
          name: data.taskname,
          desc: data.desc,
          assignment: [...data.assignment],
          authorId: userId,
          deadline: data.deadline,
        };
        break;
      }
    }
    setColumn({
      ...columns,
      [data.columnId]: {
        ...column,
        items: [...items],
      },
    });
    taskService
      .updateTask(data)
      .then((res) => {
        socket.emit('addTask', { listTask: res.data.data, roomId: projectId });
        toast.warning('Edit task thành công!');
      })
      .catch((err) => {
        toast.error('Edit task thất bại!');
      });
  };
  const deleteTask = (columnId, itemId, columns, setColumn) => {
    let column = columns[columnId];
    let items = [...column.items];
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === itemId) {
        items.splice(i, 1);
        break;
      }
    }
    setColumn({
      ...columns,
      [columnId]: {
        ...column,
        items: [...items],
      },
    });
    taskService.deleteTask({ id: itemId, projectId: projectId }).then((res) => {
      socket.emit('addTask', { listTask: res.data.data, roomId: projectId });
    });
  };
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      let data = {
        id: columns[source.droppableId].items[source.index].id,
        projectId: projectId,
        assignment: columns[source.droppableId].items[source.index].assignment,
        typeTask: columns[destination.droppableId].name,
        taskname: columns[source.droppableId].items[source.index].name,
        desc: columns[source.droppableId].items[source.index].desc,
        deadline: columns[source.droppableId].items[source.index].deadline,
      };
      taskService
        .updateTask(data)
        .then((res) => {
          socket.emit('addTask', {
            listTask: res.data.data,
            roomId: projectId,
          });
        })
        .catch((err) => {
          toast.error('Update thất bại!');
        });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  const formatDate = (textDate) => {
    let date = new Date(textDate);
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString();
    return (
      (day.length < 2 ? '0' + day : day) +
      ' - ' +
      (month.length < 2 ? '0' + month : month) +
      ' - ' +
      year
    );
  };
  function equalDate(date1, date2) {
    // date1 > date2: 1; date1 === date2: 0; date1 < date2: -1
    let d1 = date1.getDate(),
      m1 = date1.getMonth(),
      y1 = date1.getFullYear();
    let d2 = date2.getDate(),
      m2 = date2.getMonth(),
      y2 = date2.getFullYear();
    if (y1 < y2) {
      return -1;
    } else if (y1 > y2) {
      return 1;
    } else {
      //y1 === y2
      if (m1 < m2) {
        return -1;
      } else if (m1 > m2) {
        return 1;
      } else {
        if (d1 < d2) {
          return -1;
        } else if (d1 === d2) {
          return 0;
        } else {
          return 1;
        }
      }
    }
  }
  const formatColor = (item, column) => {
    if (column.name === 'Complete') {
      return 'card border-left-success shadow h-100 py-2';
    }
    if (equalDate(new Date(item.deadline), new Date(Date.now())) === -1) {
      return 'card border-left-danger shadow h-100 py-2';
    }
    switch (column.name) {
      case 'Planned':
        return 'card border-left-warning shadow h-100 py-2';
      case 'In Progress':
        return 'card border-left-primary shadow h-100 py-2';
    }
  };
  const formatDeadline = (item, column) => {
    if (column.name === 'Complete') {
      return 'text-primary';
    }
    if (equalDate(new Date(item.deadline), new Date(Date.now())) === -1) {
      return 'text-danger';
    }
    return 'text-primary';
  };
  return (
    <>
      <ModalTrueFalse
        show={showDelete}
        data={{
          title: 'Bạn có muốn xóa task?',
          button_1: {
            title: 'No',
            backgroundColor: 'rgb(242,242,242)',
            color: 'black',
          },
          button_2: {
            title: 'Yes',
            backgroundColor: 'rgb(226,27,60)',
            color: 'white',
          },
        }}
        setClose={() => {
          setShowDelete(false);
        }}
        funcButton_1={() => {}}
        funcButton_2={() => {
          deleteTask(
            dataTaskDelete.columnId,
            dataTaskDelete.itemId,
            tasks,
            setTasks,
          );
        }}
        funcOnHide={() => {}}></ModalTrueFalse>
      <ModalCreateTask
        show={showCreateTask}
        funcQuit={() => {
          setShowCreateTask(false);
        }}
        defaultName=""
        listUser={listUser}
        projectId={projectId}
        funcCreate={async (data) => {
          await createTaskPlanned(data);
        }}></ModalCreateTask>

      <ModalEditTask
        show={showEditTask}
        data={dataEditTask}
        listUser={listUser}
        projectId={projectId}
        funcQuit={(resFunc) => {
          setShowEditTask(false);
          resFunc();
        }}
        funcEdit={(data) => {
          // setDataEditTask(data);
          EditTask(data, tasks, setTasks);
        }}></ModalEditTask>
      <div className="board-view">
        <Row>
          <Col md={12}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%',
              }}>
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, tasks, setTasks)}>
                {Object.entries(tasks).map(([columnId, column], index) => {
                  return (
                    <div
                      className="card shadow mb-4 "
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // alignItems: "center",
                        height: '100%',
                        width: '100%',
                        marginRight: '10px',
                        marginLeft: '10px',
                      }}
                      key={columnId}>
                      <div className="card-header py-3">
                        <div className="d-flex bd-highlight">
                          <div className="p-2 bd-highlight">
                            <h2 className="m-0 font-weight-bold text-primary">
                              {' '}
                              {column.name}
                            </h2>
                          </div>
                          <div className="ml-auto bd-highlight">
                            {column.name === 'Planned' ? (
                              <button
                                type="button"
                                // style={{backgroundColor: "#0069d9", borderRadius: "10px", fontSize: "20px", border: "1px solid gray"}}
                                className="btn btn-primary"
                                style={{ margin: '0px' }}
                                onClick={() => {
                                  // AddTask(columnId, tasks, setTasks);
                                  setShowCreateTask(true);
                                }}>
                                +
                              </button>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="card-body my-detail-task p-1">
                        <Droppable droppableId={columnId} key={columnId}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  // background: snapshot.isDraggingOver
                                  //   ? "lightblue"
                                  //   : "white",
                                  background: 'white',
                                  width: '100%',
                                  minHeight: 392,
                                }}>
                                {column.items.map((item, index) => {
                                  return (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                      isDragDisabled={
                                        userId === item.authorId ? false : true
                                      }>
                                      {(provided, snapshot) => {
                                        return (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              userSelect: 'none',
                                              minHeight: '50px',
                                              backgroundColor: 'white',
                                              color: 'white',
                                              ...provided.draggableProps.style,
                                            }}>
                                            <div className="card shadow mb-3 mx-2">
                                              <div
                                                className={formatColor(
                                                  item,
                                                  column,
                                                )}
                                                style={
                                                  userId === item.authorId
                                                    ? {
                                                        backgroundColor:
                                                          'white',
                                                        padding:
                                                          '0px 0px 10px 20px',
                                                      }
                                                    : {
                                                        backgroundColor:
                                                          '#e8e8e8',
                                                        padding:
                                                          '0px 0px 10px 20px',
                                                      }
                                                }>
                                                <div className="card-body-task">
                                                  <div className="row no-gutters align-items-center content-name-tasks  ">
                                                    <div className="col mr-2">
                                                      <div className="h5 font-weight-bold text-success text-uppercase mb-1">
                                                        {item.name}
                                                      </div>
                                                      <div className="mb-1 text-gray-mytask">
                                                        <i>
                                                          <b>Description:</b>{' '}
                                                          {item.desc}
                                                        </i>
                                                      </div>
                                                      <div className="mb-1 text-gray-mytask">
                                                        <i>
                                                          <b>Assignment:</b>{' '}
                                                          {listUser.map(
                                                            (value, index) => {
                                                              if (
                                                                item.assignment.indexOf(
                                                                  value.userId,
                                                                ) !== -1
                                                              ) {
                                                                return (
                                                                  <span
                                                                    className="mr-2 text-primary"
                                                                    style={{
                                                                      fontWeight:
                                                                        'bold',
                                                                    }}>
                                                                    {
                                                                      value.username
                                                                    }{' '}
                                                                    <span
                                                                      style={{
                                                                        color:
                                                                          'black',
                                                                      }}>
                                                                      ;
                                                                    </span>
                                                                  </span>
                                                                );
                                                              }
                                                            },
                                                          )}
                                                        </i>
                                                      </div>
                                                      <div className="mb-1 text-gray-mytask">
                                                        <i>
                                                          <b>Created by:</b>{' '}
                                                          {listUser.map(
                                                            (value, index) => {
                                                              if (
                                                                item.authorId ===
                                                                value.userId
                                                              ) {
                                                                return (
                                                                  <span
                                                                    className="mr-2 text-primary"
                                                                    style={{
                                                                      fontWeight:
                                                                        'bold',
                                                                    }}>
                                                                    {
                                                                      value.username
                                                                    }{' '}
                                                                    <span
                                                                      style={{
                                                                        color:
                                                                          'black',
                                                                      }}></span>
                                                                  </span>
                                                                );
                                                              }
                                                            },
                                                          )}
                                                        </i>
                                                      </div>
                                                      <div className="mb-1 text-gray-mytask">
                                                        <i>
                                                          <b>Deadline:</b>
                                                          <span
                                                            className={formatDeadline(
                                                              item,
                                                              column,
                                                            )}>
                                                            <b>
                                                              {' '}
                                                              {formatDate(
                                                                item.deadline,
                                                              )}
                                                            </b>
                                                          </span>
                                                        </i>
                                                      </div>
                                                    </div>
                                                    {/* <div className="col-auto">
                                                  <i
                                                    className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                                                    aria-hidden="true"></i>
                                                </div> */}
                                                    <UncontrolledDropdown
                                                      disabled={
                                                        item.authorId === userId
                                                          ? false
                                                          : true
                                                      }>
                                                      <DropdownToggle
                                                        className="btn-icon-only text-light"
                                                        href="#pablo"
                                                        role="button"
                                                        size="sm"
                                                        color=""
                                                        onClick={(e) =>
                                                          e.preventDefault()
                                                        }
                                                        disabled={
                                                          item.authorId ===
                                                          userId
                                                            ? false
                                                            : true
                                                        }>
                                                        <i
                                                          className={
                                                            item.authorId ===
                                                            userId
                                                              ? 'fas fa-ellipsis-v text-info'
                                                              : 'fas fa-ellipsis-v '
                                                          }
                                                        />
                                                      </DropdownToggle>
                                                      <DropdownMenu
                                                        className="dropdown-menu-arrow"
                                                        right>
                                                        <DropdownItem
                                                          href="#pablo"
                                                          onClick={(e) => {
                                                            // setDataEditTask({...item});
                                                            let list = [];
                                                            listUser.map(
                                                              (value, i) => {
                                                                if (
                                                                  item.assignment.indexOf(
                                                                    value.userId,
                                                                  ) !== -1
                                                                ) {
                                                                  list.push({
                                                                    ...value,
                                                                  });
                                                                }
                                                              },
                                                            );
                                                            setDataEditTask({
                                                              id: item.id,
                                                              name: item.name,
                                                              desc: item.desc,
                                                              columnId: columnId,
                                                              typeTask:
                                                                column.name,
                                                              assignment: list,
                                                              deadline:
                                                                item.deadline,
                                                            });
                                                            setShowEditTask(
                                                              true,
                                                            );
                                                          }}>
                                                          <span
                                                            style={{
                                                              fontWeight:
                                                                'bold',
                                                              color: 'gray',
                                                            }}>
                                                            Edit
                                                          </span>
                                                        </DropdownItem>
                                                        <DropdownItem
                                                          href="#pablo"
                                                          onClick={(e) => {
                                                            // deleteTask(columnId, item.id, tasks, setTasks);
                                                            setDataTaskDelete({
                                                              columnId: columnId,
                                                              itemId: item.id,
                                                            });
                                                            setShowDelete(true);
                                                          }}>
                                                          <span
                                                            style={{
                                                              fontWeight:
                                                                'bold',
                                                              color: 'red',
                                                            }}>
                                                            Delete
                                                          </span>
                                                        </DropdownItem>
                                                      </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    </div>
                  );
                })}
              </DragDropContext>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Board;
