/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import '../../assets/scss/component/headproject.scss';
import { notificationServive } from '../../services/notification/api';
import { projectService } from '../../services/projects/api';
import { userService } from '../../services/user/api';
import socket from '../../socketioClient';
import UserNotification, { Notification } from '../user/UserNotification';
import ChooseList from './ChooseList';
import { Assignment } from './task/InterfaceTask';

const HeadProject: React.FC<any> = (props) => {
  //props: projectId
  const [user, setUser] = useState<Assignment>(null);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [projectInfo, setProjectInfo] = useState({
    admin: [],
    userJoin: [],
    avatar: '',
    description: '',
    _id: '',
    name: '',
    userId: '',
    createdAt: '',
    updatedAt: '',
  });
  useEffect(() => {
    userService
      .getUserInfo()
      .then((res) => {
        setUser({
          _id: res.data.data.userId,
          avatar: res.data.data.avatar,
          email: res.data.data.email,
          role: res.data.data.role,
          username: res.data.data.username,
        });
        // res.data.data.projects.map((projectId) => {
        //   socket.emit('online', {
        //     roomId: projectId,
        //     userId: res.data.data.userId,
        //   });
        //   return 0;
        // });
      })
      .catch((err) => {
        console.log(err);
      });
    projectService
      .getProjectById({ projectId: props.projectId })
      .then((response) => {
        setProjectInfo(response.data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
    getNotifications();
  }, []);
  useEffect(() => {
    if (user) {
      socket.on('notification-reload', (data) => {
        if (data.authorId !== user._id && user._id === data.userId) {
          getNotifications();
        }
      });
    }
  }, [user]);
  const getNotifications = () => {
    notificationServive
      .getNotifications()
      .then((res) => {
        setNotifications(
          (res.data.data as Array<Notification>).reverse() || [],
        );
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };
  return (
    <div className="head-project container-fluid w-100">
      <div className="head-project-wrapper u-clearfix pb-2">
        <Row className="d-flex align-items-center">
          <Col md={9}>
            <div className="d-flex">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={projectInfo.avatar}
                  alt="project"
                  className="avatar-project"
                  height="80"
                  width="80"
                />
              </div>
              <div className="info-project mx-1">
                <div className="name-project d-flex justify-content-start align-items-center pt-2">
                  <h2 className="mx-3 p-0 my-0">{projectInfo.name}</h2>
                  <span className="access-project mr-1">
                    <span>
                      <span
                        className="private-icon"
                        role="img"
                        aria-label="PrivateIcon">
                        <svg
                          width="24"
                          height="24"
                          role="presentation"
                          focusable="false"
                          viewBox="0 0 24 24">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 3C9.79536 3 8 4.79192 8 7.00237V9H7C5.89543 9 5 9.89543 5 11V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V11C19 9.89543 18.1046 9 17 9H16V7.00237C16 4.79182 14.2091 3 12 3ZM14 11H16H17V19H7V11H8H10H14ZM14 9V7.00237C14 5.89617 13.1043 5 12 5C10.8983 5 10 5.89813 10 7.00237V9H14ZM14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z"
                            fill="currentColor"></path>
                        </svg>
                      </span>
                    </span>
                    Private
                  </span>
                  <button className="btn-edit-project btn-edit" type="button">
                    <span>
                      <span className="mr-2" role="img" aria-label="EditIcon">
                        <svg
                          width="24"
                          height="24"
                          role="presentation"
                          focusable="false"
                          viewBox="0 0 24 24">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z"
                            fill="currentColor"></path>
                        </svg>
                      </span>
                    </span>
                    Edit Workspace details
                  </button>
                </div>
                <ChooseList projectId={props.projectId} />
              </div>
            </div>
          </Col>
          <Col>
            <UserNotification
              dataUser={{
                username: user?.username,
                avatar: user?.avatar,
              }}
              notification={{
                data: notifications,
                setData: (data) => {
                  setNotifications(data);
                },
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default HeadProject;
