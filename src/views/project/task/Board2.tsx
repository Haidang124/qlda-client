/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Section, Task } from './InterfaceTask';
import '../../../assets/scss/component/board.scss';
import '../../../assets/scss/component/task.scss';
import SectionComponent from './TaskComponent/SectionComponent';
import AddSection from './TaskComponent/AddSection';
import { TaskDetails } from './TaskComponent/TaskDetails';
import { taskService } from '../../../services/task/api';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { userService } from '../../../services/user/api';
const Board2: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [userId, setUserId] = useState('');
  const [taskDetails, setTaskDetails] = useState<Task>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [dataTasks, setDataTasks] = useState<Array<Section>>([]);

  useEffect(() => {
    taskService
      .getTasks(projectId)
      .then((res) => {
        setDataTasks(res.data.data);
      })
      .catch((err) => {
        toast.error('Một lỗi không mong muốn đã xảy ra');
      });
  }, []);
  useEffect(() => {
    userService
      .getUserId()
      .then((res) => {
        setUserId(res.data.data.id);
        console.log(res.data.data.id);
      })
      .catch((err) => {
        toast.error('Phiên đăng nhập kết thúc');
      });
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let taskId = result.draggableId;
    let sectionFromId = result.source.droppableId;
    let indexFrom = result.source.index;
    let sectionToId = result.destination.droppableId;
    let indexTo = result.destination.index;
    if (sectionToId === sectionFromId) {
      let section = dataTasks.filter(
        (section) => section._id === sectionFromId,
      )[0];
      let task = section.tasks[indexFrom];
      section.tasks.splice(indexFrom, 1);
      let listTask1 = [...section.tasks];
      let listTask2 = [...section.tasks];
      section.tasks = [
        ...listTask1.splice(0, indexTo),
        task,
        ...listTask2.splice(indexTo),
      ];
      setDataTasks(dataTasks);
    } else {
      let sectionFrom = dataTasks.filter(
        (section) => section._id === sectionFromId,
      )[0];
      let sectionTo = dataTasks.filter(
        (section) => section._id === sectionToId,
      )[0];
      let taskFrom = sectionFrom.tasks[indexFrom];
      sectionFrom.tasks.splice(indexFrom, 1);
      let listTask1 = [...sectionTo.tasks];
      let listTask2 = [...sectionTo.tasks];
      sectionTo.tasks = [
        ...listTask1.splice(0, indexTo),
        taskFrom,
        ...listTask2.splice(indexTo),
      ];
    }
    taskService
      .changeSection({
        projectId: projectId,
        taskId: taskId,
        sectionId1: sectionFromId,
        sectionId2: sectionToId,
        index: indexTo,
      })
      .then((res) => {
        setDataTasks(res.data.data.allTasks);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };
  return (
    <div
      className="tasks"
      onClick={() => {
        setShowTaskDetails(false);
      }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {dataTasks.map((section, index) => {
          return (
            <SectionComponent
              userId={userId}
              dataTasks={{
                data: dataTasks,
                setData: setDataTasks,
              }}
              section={section}
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
      <AddSection
        dataTasks={{
          data: dataTasks,
          setData: setDataTasks,
        }}
        showTaskDetails={{
          status: showTaskDetails,
          setStatus: setShowTaskDetails,
        }}
        projectId={projectId}
      />
      {taskDetails ? (
        <>
          <TaskDetails
            dataTasks={{
              data: dataTasks,
              setData: setDataTasks,
            }}
            task={{ task: taskDetails, setTask: setTaskDetails }}
            show={showTaskDetails}
            setShow={setShowTaskDetails}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Board2;
