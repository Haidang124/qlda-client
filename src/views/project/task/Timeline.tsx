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

export enum ColorTask {
  'Planned' = '#FCDBA2',
  'In Progress' = '#7c9bf7',
  'Complete' = '#1CC88A',
  'Planned selected' = '#FAC465',
  'In Progress selected' = '#4E73DF',
  'Complete selected' = '#109465',
}

export const Timeline: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [viewMode, setViewMode] = useState<ViewMode>(null);
  const [tasks, setTasks] = useState<Array<any>>([]);
  const [showListTask, setShowListTask] = useState(true);

  useEffect(() => {
    taskService
      .getTasks(projectId)
      .then((res) => {
        res.data.data.forEach((task, i) => {
          tasks.push({
            start: new Date(
              moment.utc(task.createdAt).local().format('YYYY//MM/DD'),
            ),
            end: new Date(
              moment.utc(task.deadline).local().format('YYYY//MM/DD'),
            ),
            name: task.taskname,
            id: task._id,
            // progress: 0,
            isDisabled: task.typeTask === 'Complete' ? true : false,
            styles: {
              backgroundColor: ColorTask[task.typeTask],
              backgroundSelectedColor: ColorTask[task.typeTask + ' selected'],
            },
          });
          if (i === res.data.data.length - 1) {
            setTasks(tasks);
            setViewMode(ViewMode.Month);
          }
        });
      })
      .catch((err) => {
        toast.error('Một lỗi không mong muốn đã xảy ra');
      });
  }, []);

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
    <div className="timeline-view p-2" style={{ backgroundColor: 'white' }}>
      <div className="d-flex bd-highlight mb-1">
        <div className="mr-auto p-2 bd-highlight">
          <div className="d-flex justify-content-start mb-3">
            <button
              type="button"
              className={`button-type ${
                viewMode === ViewMode.QuarterDay ? 'button-type-active' : ''
              }`}
              onClick={() => setViewMode(ViewMode.QuarterDay)}>
              Quarter of Day
            </button>
            <button
              type="button"
              className={`button-type ${
                viewMode === ViewMode.HalfDay ? 'button-type-active' : ''
              }`}
              onClick={() => setViewMode(ViewMode.HalfDay)}>
              Half of Day
            </button>
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
      {tasks.length > 0 && (
        <Gantt
          tasks={tasks}
          viewMode={viewMode}
          onDateChange={(task: Task, children: Task[]) => {
            task.start = new Date(
              moment.utc(task.start).local().format('YYYY/MM/DD'),
            );
            task.end = new Date(
              moment.utc(task.end).local().format('YYYY/MM/DD'),
            );
          }}
          columnWidth={getColumnWidth()}
          listCellWidth={showListTask ? '155px' : ''}
          ganttHeight={tasks.length > 6 ? 400 : -1}
        />
      )}
    </div>
  );
};

export default Timeline;
