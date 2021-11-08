import {
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Dropdown } from 'react-bootstrap';
import { Task, Tasks } from '../InterfaceTask';
import '../../../../assets/scss/component/board.scss';
import { TaskItem } from './TaskItem';
interface Props {
  tasks: Tasks;
  showTaskDetails: { status: boolean; setStatus: (value) => void };
  taskDetails: { task: Task; setTask: (task: Task) => void };
  dataTasks: { data: any; setData: (data) => void };
}
const TaskComponent: React.FC<Props> = (props: Props) => {
  const [IsDraggable, setIsDraggable] = useState(true);
  return (
    <Droppable droppableId={props.tasks.id} key={props.tasks.id}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ height: '100%' }}
            onClick={() => {
              props.showTaskDetails.setStatus(false);
            }}>
            <div className="column-tasks">
              <div className="column-task-sort">
                <div className="board-task">
                  <div className="inner-board-task">
                    <div className="d-flex bd-highlight align-items-center">
                      {/* List task name */}
                      <div className="p-2 flex-grow-1 bd-highlight">
                        {props.tasks.name}
                      </div>
                      <div className="p-2 bd-highlight">
                        <div className="icon-add">
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="icon-add-inner"
                            onClick={() => {}} // add Task
                          />
                        </div>
                      </div>
                      <div className="p-2 bd-highlight">
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
                                  <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    color="#F06A6F"
                                  />
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
                    {props.tasks.listTasks.map((task, index) => {
                      return (
                        // Body list task
                        <div className="d-flex align-items-start flex-column bd-highlight mb-1 w-100">
                          <div className="mb-auto p-2 bd-highlight w-100">
                            {/* --------------- Task Item --------------- */}
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                              isDragDisabled={!IsDraggable} // enable||disable drag
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div className="w-100">
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}>
                                      <TaskItem
                                        dataTasks={{ ...props.dataTasks }}
                                        task={task}
                                        isDraggable={{
                                          status: IsDraggable,
                                          setStatus: setIsDraggable,
                                        }}
                                        showTaskDetails={{
                                          ...props.showTaskDetails,
                                        }}
                                        taskDetails={{ ...props.taskDetails }}
                                      />
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};
export default TaskComponent;
