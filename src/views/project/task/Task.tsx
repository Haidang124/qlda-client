/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { Container } from 'reactstrap';
import '../../../../src/assets/scss/component/timeline.scss';
import { userService } from '../../../services/user/api';
import Calendar from '../calendar/Calendar';
import WrapperProject from '../WrapperProject';
import Board2 from './Board2';
import Timeline from './Timeline';

export enum TypeView {
  board = 'board',
  timeline = 'timeline',
  calendar = 'calendar',
}

export const Task: React.FC = () => {
  const [userId, setUserId] = useState<string>(null);
  const { params } = useRouteMatch();
  const search = window.location.search;
  const paramsSearch = new URLSearchParams(search);
  const { projectId } = params as any;
  const viewParams = paramsSearch.get('view');
  const history = useHistory();
  const [view, setView] = useState<string>(TypeView.board);
  const listSelectView = [
    {
      typeView: TypeView.timeline,
      icon: 'fas fa-stream',
      name: 'Timeline',
    },
    {
      typeView: TypeView.calendar,
      icon: 'far fa-calendar',
      name: 'Calendar',
    },
    {
      typeView: TypeView.board,
      icon: 'fas fa-border-all',
      name: 'Board',
    },
  ];
  const renderSelect = (typeview: TypeView, icon, name) => {
    return (
      <div
        className={
          'item-head-task ' + (view === typeview ? 'item-head-task-active' : '')
        }
        onClick={() => {
          history.push(`/task-project/${projectId}?view=${typeview}`);
          setView(typeview);
        }}>
        {name}
        <i className={`ml-2 ${icon}`}></i>
      </div>
    );
  };
  const renderView = () => {
    switch (view) {
      case TypeView.board:
        return <Board2 />;
      case TypeView.timeline:
        return <Timeline />;
      case TypeView.calendar:
        return <Calendar />;
    }
  };
  useEffect(() => {
    userService
      .getUser()
      .then((res) => {
        setUserId(res.data.data.id);
      })
      .catch((err) => {
        toast.error('Bạn cần đăng nhập');
      });
  }, []);
  useEffect(() => {
    if (userId) {
      if (
        Object.values(TypeView).some((index) => TypeView[index] === viewParams)
      ) {
        history.push(`/task-project/${projectId}?view=${viewParams}`);
        setView(viewParams);
      } else {
        history.push(`/task-project/${projectId}?view=${TypeView.board}`);
        setView(TypeView.board);
      }
    }
  }, [userId]);

  return (
    <div className="task-project container-fluid w-100">
      <WrapperProject>
        <Container fluid>
          <div className="d-flex justify-content-start w-100 head-task flex-row-reverse">
            {listSelectView.map((element) => {
              return renderSelect(element.typeView, element.icon, element.name);
            })}
          </div>
          <div className="w-100">{renderView()}</div>
        </Container>
      </WrapperProject>
    </div>
  );
};
export default Task;
