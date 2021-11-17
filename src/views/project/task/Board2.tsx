import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Task } from './InterfaceTask';
import '../../../assets/scss/component/board.scss';
import '../../../assets/scss/component/task.scss';
import TaskComponent from './TaskComponent/TaskComponent';
import { data } from './TaskComponent/dataFake';
import { TaskDetails } from './TaskComponent/TaskDetails';
import { taskService } from '../../../services/task/api';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
const Board2: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [taskDetails, setTaskDetails] = useState<Task>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [dataTasks, setDataTasks] = useState<any>(data);

  useEffect(() => {
    taskService
      .getTasks(projectId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast.error('Một lỗi không mong muốn đã xảy ra');
      });
  }, []);

  const onDragEnd = (result) => {
    console.log(result);
  };
  return (
    <div className="tasks">
      <DragDropContext onDragEnd={onDragEnd}>
        {dataTasks['section'].map((idListTask, index) => {
          return (
            <TaskComponent
              dataTasks={{
                data: dataTasks,
                setData: setDataTasks,
              }}
              section={data[idListTask]}
              showTaskDetails={{
                status: showTaskDetails,
                setStatus: setShowTaskDetails,
              }}
              taskDetails={{
                task: taskDetails,
                setTask: setTaskDetails,
              }}
            />
          );
        })}
      </DragDropContext>
      <TaskDetails
        dataTasks={{
          data: dataTasks,
          setData: setDataTasks,
        }}
        task={{ task: taskDetails, setTask: setTaskDetails }}
        show={showTaskDetails}
        setShow={setShowTaskDetails}
      />
    </div>
  );
};
export default Board2;
