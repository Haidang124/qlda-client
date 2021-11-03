/* eslint-disable react-hooks/exhaustive-deps */
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { taskService } from '../services/task/api';
import { userService } from '../services/user/api';
import HeadProject from './project/HeadProject';

export enum ColorTask {
  'Planned' = '#F6C23E',
  'In Progress' = '#4E73DF',
  'Complete' = '#1CC88A',
  'SelectedColor' = '#03d3fc',
}

export const Timeline: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [userId, setUserId] = useState(null);
  const [viewMode, setViewMode] = useState<ViewMode>(null);
  const [tasks, setTasks] = useState<Array<any>>([]);

  useEffect(() => {
    userService
      .getUserId()
      .then((res) => {
        setUserId(res.data.data.id);
      })
      .catch((err) => {
        toast.error('Không thể xác thực người dùng!');
      });
  }, []);
  useEffect(() => {
    if (userId) {
      taskService
        .getTask({ projectId: projectId })
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
                backgroundSelectedColor: ColorTask['SelectedColor'],
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
    }
  }, [userId]);

  if (userId === null) {
    return <></>;
  } else {
    return (
      <>
        <HeadProject projectId={projectId} />

        <div className="container mt-4" style={{ margin: 'auto' }}>
          <div className="d-flex justify-content-start mb-3">
            <div className="align-self-center">Chế độ xem:</div>
            <Dropdown alignRight className="ml-3">
              <Dropdown.Toggle>{viewMode}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setViewMode(ViewMode.QuarterDay)}>
                  Quarter of Day
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setViewMode(ViewMode.HalfDay)}>
                  Half of Day
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setViewMode(ViewMode.Day)}>
                  Day
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setViewMode(ViewMode.Week)}>
                  Week
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setViewMode(ViewMode.Month)}>
                  Month
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {tasks.length > 0 ? (
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
            />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
};

export default Timeline;
