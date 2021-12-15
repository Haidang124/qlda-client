/* eslint-disable react-hooks/exhaustive-deps */
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import '../../../../src/assets/scss/component/timeline.scss';
import { taskService } from '../../../services/task/api';
import WrapperUpgrade, { Role } from '../wrapperUpgrade/WrapperUpgrade';
import { Section } from './InterfaceTask';

export const Timeline: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Month);
  const [dataTasks, setDataTasks] = useState<Array<Section>>([]);
  const [allTask, setAllTask] = useState<Array<Task>>([]);
  const [showListTask, setShowListTask] = useState(true);

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
    allTask.splice(0);
    dataTasks.forEach((section: Section, i) => {
      section.tasks.forEach((task, j) => {
        let start = new Date(
          moment.utc(task.dueDate.from).local().format('YYYY/MM/DD'),
        );
        let end = new Date(
          moment.utc(task.dueDate.to).local().format('YYYY/MM/DD'),
        );
        start.setHours(0);
        start.setMinutes(0);
        end.setHours(24);
        end.setMinutes(0);
        allTask.push({
          start: start,
          end: end,
          id: task._id,
          isDisabled: task.isDone ? true : false,
          name: task.name,
          progress: 0,
          dependencies: task.dependenciesTask
            ? [task.dependenciesTask._id]
            : [],
          type: 'task',
          styles: {
            backgroundColor: task.isDone ? '#339149' : '#5b5dab',
            backgroundSelectedColor: task.isDone ? '#146326' : '#2f3175',
          },
        });
      });
    });
    setAllTask([...allTask]);
  }, [dataTasks]);
  const getColumnWidth = () => {
    switch (viewMode) {
      case ViewMode.Month:
        return 300;
      case ViewMode.Week:
        return 250;
      default:
        return 60;
    }
  };

  return (
    <WrapperUpgrade roleRequire={Role.MemberPlus}>
      <div className="timeline-view p-2" style={{ backgroundColor: 'white' }}>
        <div className="d-flex bd-highlight mb-1">
          <div className="mr-auto p-2 bd-highlight">
            <div className="d-flex justify-content-start mb-3">
              <button
                type="button"
                className={`button-type ${
                  viewMode === ViewMode.Day ? 'button-type-active' : ''
                }`}
                onClick={() => setViewMode(ViewMode.Day)}>
                Day
              </button>
              <button
                type="button"
                className={`button-type ${
                  viewMode === ViewMode.Week ? 'button-type-active' : ''
                }`}
                onClick={() => setViewMode(ViewMode.Week)}>
                Week
              </button>
              <button
                type="button"
                className={`button-type ${
                  viewMode === ViewMode.Month ? 'button-type-active' : ''
                }`}
                onClick={() => setViewMode(ViewMode.Month)}>
                Month
              </button>
            </div>
          </div>
          <div className="p-2 bd-highlight">
            {showListTask ? (
              <>
                <FontAwesomeIcon
                  icon={faToggleOn}
                  size={'lg'}
                  color={'#2196F3'}
                  onClick={() => {
                    setShowListTask(false);
                  }}
                />
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faToggleOff}
                  size={'lg'}
                  onClick={() => {
                    setShowListTask(true);
                  }}
                />
              </>
            )}{' '}
            Show list task
          </div>
        </div>
        {allTask.length > 0 && (
          <Gantt
            tasks={allTask}
            viewMode={viewMode}
            onDateChange={(task: Task, children: Task[]) => {
              let from = task.start;
              let to = task.end;
              from.setHours(0);
              from.setMinutes(0);
              to.setDate(to.getDate() - 1);
              to.setHours(0);
              to.setMinutes(0);
              taskService
                .updateTask({
                  taskId: task.id,
                  projectId: projectId,
                  dueDate: {
                    from: from,
                    to: to,
                  },
                })
                .then((res) => {
                  setDataTasks(res.data.data.allTasks);
                })
                .catch((err) => {
                  toast.error(
                    err.response?.data?.error ||
                      'Một lỗi không mong muốn đã xảy ra',
                  );
                });
            }}
            columnWidth={getColumnWidth()}
            listCellWidth={showListTask ? '155px' : ''}
            ganttHeight={allTask.length > 6 ? 400 : -1}
          />
        )}
      </div>
    </WrapperUpgrade>
  );
};

export default Timeline;
