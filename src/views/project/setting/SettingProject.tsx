import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import Sidebar from '../../../components/Sidebar/Sidebar';
import routes from '../../../routes';
import { projectService } from '../../../services/projects/api';
import { userService } from '../../../services/user/api';
import HeadProject from '../HeadProject';
import ModalDeleteOut from './ModalDeleteOut';
const SettingProject: React.FC<RouteComponentProps> = (
  props: RouteComponentProps,
) => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState();
  const [project, setProject] = useState({
    userId: '',
    name: '',
    userJoin: [],
    _id: '',
  });
  useEffect(() => {
    userService
      .getUserId()
      .then((res) => {
        setUserId(res.data.data.id);
      })
      .catch((err) => {
        toast.error('Không xác định được người dùng');
      });
    projectService
      .getProjectById({ projectId: projectId })
      .then((res) => {
        setProject(res.data.data);
      })
      .catch((err) => {
        toast.error('Không tồn tại Project');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="setting-project">
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
          <div
            className="row d-flex justify-content-center container-fluid"
            style={{ width: '100%' }}>
            <div className="col-8 d-flex justify-content-center">
              <div className="card" style={{ width: '100%' }}>
                <div className="card-header">
                  <h3 className="text-primary">SETTING</h3>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div
                      className="btn btn-outline-danger"
                      onClick={() => {
                        console.log(project);
                        setShowModal(true);
                      }}>
                      {userId === project.userId
                        ? 'Xóa project'
                        : 'Rời project'}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ModalDeleteOut
            show={showModal}
            title={userId === project.userId ? 1 : 0} //1: xóa project ; 0: rời project
            funcQuit={() => {
              setShowModal(false);
            }}
            funcYes={() => {}}
            userId={userId}
            project={{
              nameProject: project.name,
              projectId: project._id,
            }}></ModalDeleteOut>{' '}
        </Col>
      </Row>
    </div>
  );
};

export default SettingProject;
