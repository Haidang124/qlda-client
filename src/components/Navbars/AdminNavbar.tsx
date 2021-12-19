/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Navbar } from 'reactstrap';
import { notificationServive } from '../../services/notification/api';
import { userService } from '../../services/user/api';
import socket from '../../socketioClient';
import { Assignment } from '../../views/project/task/InterfaceTask';
import UserNotification, {
  Notification,
} from '../../views/user/UserNotification';

const AdminNavbar: React.FC<any> = (props: any) => {
  const [user, setUser] = useState<Assignment>(null);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  useEffect(() => {
    userService.getUserInfo().then((res) => {
      setUser({
        _id: res.data.data.userId,
        avatar: res.data.data.avatar,
        email: res.data.data.email,
        role: res.data.data.role,
        username: res.data.data.username,
      });
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
    <Navbar
      className="navbar-top navbar-dark"
      expand="md"
      id="navbar-main"
      style={{ backgroundColor: 'rgb(70,23,143)' }}>
      <Container fluid>
        <Link
          className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          to="/">
          {props.brandText}
        </Link>
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group" style={{ border: 'none' }}>
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>
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
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
