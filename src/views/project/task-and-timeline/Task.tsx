/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';
import Sidebar from '../../../components/Sidebar/Sidebar';
import routes from '../../../routes';
import { userService } from '../../../services/user/api';
import HeadProject from '../HeadProject';
import Board from '../task/Board';
import Timeline from '../timeline/Timeline';
import '../../../../src/assets/scss/component/timeline.scss';

export enum TypeView {
  board = 'board',
  timeline = 'timeline',
}

export const Task: React.FC<RouteComponentProps> = (
  props: RouteComponentProps,
) => {
  const [userId, setUserId] = useState<string>(null);
  const { params } = useRouteMatch();
  const search = window.location.search;
  const paramsSearch = new URLSearchParams(search);
  const { projectId } = params as any;
  const viewParams = paramsSearch.get('view');
  const history = useHistory();
  const [view, setView] = useState(TypeView.board);
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
      if (viewParams !== TypeView.board && viewParams !== TypeView.timeline) {
        history.push(`/task-project/${projectId}?view=${TypeView.board}`);
      } else {
        setView(viewParams);
      }
    }
  }, [userId]);
  
  return (
    <div className="container-fluid w-100">
      <Row>
        <Col>
          <Sidebar
            {...props}
            routes={[...routes]}
            logo={{
              innerLink: '/admin/index',
              imgSrc: require('../../../assets/img/brand/kahoot-logo.png'),
              imgAlt: '...',
            }}
          />
        </Col>
        <Col md={10}>
          <HeadProject projectId={projectId} />
          <Container fluid>
            <div className="d-flex justify-content-start w-100 head-task">
              <div
                className={
                  'item-head-task ' +
                  (view === TypeView.board ? 'item-head-task-active' : '')
                }
                onClick={() => {
                  history.push(
                    `/task-project/${projectId}?view=${TypeView.board}`,
                  );
                  setView(TypeView.board);
                }}>
                Board
              </div>
              <div
                className={
                  'item-head-task ' +
                  (view === TypeView.timeline ? 'item-head-task-active' : '')
                }
                onClick={() => {
                  history.push(
                    `/task-project/${projectId}?view=${TypeView.timeline}`,
                  );
                  setView(TypeView.timeline);
                }}>
                TimeLine
              </div>
            </div>
            <div className="w-100">
              {view === TypeView.board ? <Board /> : <Timeline />}
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};
export default Task;
